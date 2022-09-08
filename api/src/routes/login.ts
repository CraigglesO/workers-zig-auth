import buildRes from '../util/buildJSONResponse'

import type { Env } from '../index'

interface LoginRequest {
  user: string,
  password: string
}

export interface User {
  user: string
  email: string
  hash: string
}

export default async function loginHandler (
  req: Request,
  { USER, AUTH }: Env,
  _ctx: ExecutionContext
): Promise<Response> {
  const { user, password } = await req.json<LoginRequest>().catch(() => ({})) as LoginRequest
  // if any variables do not exist, throw error
  if (user === undefined|| password === undefined) {
    return buildRes({ err: 'Missing username and/or password.', code: 'MissingCredentialsException' })
  }
  // grab the user
  const dbUser = await USER.get(user)  
  if (dbUser === null) {
    return buildRes({ err: 'User does not exist.', code: 'MissingUserException' })
  }
  const { email, hash } = JSON.parse(dbUser) as User
  // verify the password
  const verifyRes = await AUTH.fetch('https://authWorker.io/auth/argon-verify', {
    method: 'POST',
    body: JSON.stringify([password, hash])
  })
  const verifiedString = await verifyRes.text()
  if (verifiedString !== 'pass') return buildRes({ err: 'Password is incorrect.', code: 'BadPassException' })

  return buildRes({ user, email })
}
