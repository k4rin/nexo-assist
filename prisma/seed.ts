
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Iniciando cadastro dos dados...");

  // 1. Funcionários de exemplo
  const employee = await prisma.employee.upsert({
    where: { email: "funcionario@nexo.test" },
    update: {},
    create: {
      name: "João Silva",
      email: "funcionario@nexo.test",
      role: "EMPLOYEE",
    },
  });

  const employee2 = await prisma.employee.upsert({
    where: { email: "maria@nexo.test" },
    update: {},
    create: {
      name: "Maria Oliveira",
      email: "maria@nexo.test",
      role: "EMPLOYEE",
    },
  });

  await prisma.employee.upsert({
    where: { email: "analista@nexo.test" },
    update: {},
    create: {
      name: "Ana Souza",
      email: "analista@nexo.test",
      role: "ANALYST",
    },
  });

  console.log("Funcionários cadastrados!");

  // 2. Artigos da base de conhecimento
  const articles = [
    {
      title: "Como resolver o erro VPN 809",
      content:
        "Para Windows 10, reinstale a VPN pelo portal de softwares e reinicie o computador. Para Windows 11, abra um chamado para o suporte.",
      category: "NETWORK_VPN" as const,
      tags: "vpn, erro 809, rede, windows",
    },
    {
      title: "Como redefinir sua senha",
      content:
        "Acesse o portal de gerenciamento de senhas da empresa, selecione a opção de redefinição e siga as instruções.",
      category: "ACCESS" as const,
      tags: "senha, acesso, login",
    },
    {
      title: "Horário de atendimento do suporte",
      content:
        "O atendimento normal funciona de segunda a sexta-feira, das 8h às 18h. Chamados críticos possuem atendimento de plantão 24 horas.",
      category: "OTHER" as const,
      tags: "horário, suporte, atendimento",
    },
    {
      title: "Como solicitar um segundo monitor",
      content:
        "Para solicitar um segundo monitor, abra um chamado do tipo requisição, selecione Hardware e informe a justificativa.",
      category: "HARDWARE" as const,
      tags: "monitor, hardware, equipamento",
    },
    {
      title: "Como solicitar instalação de software",
      content:
        "Para solicitar um software, abra um chamado do tipo requisição, selecione Software e informe o nome e a finalidade da ferramenta.",
      category: "SOFTWARE" as const,
      tags: "software, instalação, programas",
    },
  ];

  for (const article of articles) {
    const existing = await prisma.article.findFirst({
      where: { title: article.title },
    });

    if (existing) {
      await prisma.article.update({
        where: { id: existing.id },
        data: article,
      });
    } else {
      await prisma.article.create({
        data: article,
      });
    }
  }

  console.log("Artigos cadastrados!");

  // 3. Chamados de exemplo
  await prisma.ticket.upsert({
    where: { code: "INC-20311" },
    update: {},
    create: {
      code: "INC-20311",
      title: "Notebook muito lento",
      description: "O notebook apresenta lentidão durante o expediente.",
      type: "INCIDENT",
      category: "HARDWARE",
      priority: "MEDIUM",
      status: "WAITING_ANALYST",
      affectedPerson: employee.name,
      employeeId: employee.id,
    },
  });

  await prisma.ticket.upsert({
    where: { code: "REQ-10442" },
    update: {},
    create: {
      code: "REQ-10442",
      title: "Solicitação de segundo monitor",
      description: "Solicito um segundo monitor para minha estação de trabalho.",
      type: "REQUEST",
      category: "HARDWARE",
      priority: "LOW",
      status: "APPROVED",
      affectedPerson: employee.name,
      employeeId: employee.id,
    },
  });

  await prisma.ticket.upsert({
    where: { code: "INC-20150" },
    update: {},
    create: {
      code: "INC-20150",
      title: "Senha do SAP bloqueada",
      description: "Não consigo acessar o SAP porque minha senha está bloqueada.",
      type: "INCIDENT",
      category: "ACCESS",
      priority: "MEDIUM",
      status: "RESOLVED",
      affectedPerson: employee2.name,
      employeeId: employee2.id,
      resolvedAt: new Date(),
    },
  });

  console.log("Chamados cadastrados!");
  console.log("Seed finalizado com sucesso!");
}

main()
  .catch((error) => {
    console.error("Erro ao executar o seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
