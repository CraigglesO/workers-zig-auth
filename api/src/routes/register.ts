import buildRes from '../util/buildJSONResponse'

import type { Env } from '../index'

interface UserRequest {
  user?: string
  email?: string
  password?: string
}

export default async function registerHandler (
  req: Request,
  { USER, AUTH }: Env,
  _ctx: ExecutionContext
): Promise<Response> {
  const { user, email, password } = await req.json<UserRequest>().catch(() => ({})) as UserRequest
  // if any variables do not exist, throw error
  if (user === undefined || email === undefined || password === undefined) {
    return buildRes({ err: 'Missing username, password, or email.', code: 'MissingCredentialsException' })
  }
  // if user exists, throw
  const userExists = await USER.get(user)
  if (userExists !== null) return buildRes({ err: 'User already exists', code: 'UserExistsException' })

  // hash the password
  const authRes = await AUTH.fetch('https://authWorker.io/auth/argon-hash', {
    method: 'POST',
    body: JSON.stringify([password])
  })
  const hashedPash = await authRes.text()

  // lastly create user and return success
  await USER.put(user, JSON.stringify({ user, email, hash: hashedPash }))

  return buildRes({ user, email })
}
