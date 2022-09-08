import { beforeEach, it, assert } from 'vitest'
import { Miniflare } from 'miniflare'

interface LocalTestContext {
  mf: Miniflare
}

beforeEach<LocalTestContext>(async (ctx) => {
  // Create a new Miniflare environment for each test
  ctx.mf = new Miniflare({
    mounts: {
      api: {
        rootPath: "./",
        envPath: true,
        packagePath: true,
        wranglerConfigPath: true,
        buildCommand: undefined,
        modules: true,
        scriptPath: 'dist/worker.mjs',
        routes: ["http://127.0.0.1/api*", "api.mf/*"],
        kvNamespaces: ["USER"],
        serviceBindings: { AUTH: "auth" },
      },
      auth: {
        rootPath: "../auth",
        envPath: true,
        packagePath: true,
        wranglerConfigPath: true,
        buildCommand: undefined,
        modules: true,
        scriptPath: 'dist/worker.mjs',
        routes: ["http://127.0.0.1/auth*", "auth.mf/*"],
      }
    }
  })
})

it<LocalTestContext>('basic example', async ({ mf }) => {
  // Dispatch a fetch event to our worker
  const regRes = await mf.dispatchFetch('http://127.0.0.1/api/register', {
    method: 'POST',
    body: JSON.stringify({
      user: 'testUser',
      password: 'testPassword',
      email: 'testEmail@email.com'
    })
  })
  const regResBody = await regRes.json()
  // Check the body was returned
  assert.equal(regRes.status, 200)
  assert.deepEqual(regResBody, {
    user: 'testUser',
    email: 'testEmail@email.com'
  })

  // now login
  const loginRes = await mf.dispatchFetch('http://127.0.0.1/api/login', {
    method: 'POST',
    body: JSON.stringify({
      user: 'testUser',
      password: 'testPassword',
    })
  })
  const loginResBody = await loginRes.json()
  assert.equal(loginRes.status, 200)
  assert.deepEqual(loginResBody, {
    user: 'testUser',
    email: 'testEmail@email.com'
  })
})
