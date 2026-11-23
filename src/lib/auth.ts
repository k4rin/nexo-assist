import { SignJWT, jwtVerify } from "jose";

const SESSION_DURATION = "7d";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET não foi configurada.");
  }

  return new TextEncoder().encode(secret);
}

interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "EMPLOYEE" | "ANALYST";
}

/**
 * Gera um token de sessão para o usuário autenticado.
 */
export async function createSessionToken(user: SessionUser) {
  return new SignJWT({
    name: user.name,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

/**
 * Valida o token e retorna os dados da sessão.
 */
export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());

    if (
      !payload.sub ||
      typeof payload.name !== "string" ||
      typeof payload.email !== "string" ||
      (payload.role !== "EMPLOYEE" && payload.role !== "ANALYST")
    ) {
      return null;
    }

    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    } satisfies SessionUser;
  } catch {
    return null;
  }
}