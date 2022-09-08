/**
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Router } from 'itty-router'

import {
  registerHandler,
  loginHandler
} from './routes'

export interface Env {
  // VARS
  // KEY: string

  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  USER: KVNamespace

  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // DO_NAME: DurableObjectNamespace

  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // BUCKET: R2Bucket

  // D1 Database
  // D1DB: D1Database

  // Service Bindings
  AUTH: Fetcher
}

const router = Router({ base: '/api' })
// zig route using zig's FetchMap
router.post('/register', registerHandler)
router.post('/login', loginHandler)

export default {
  fetch: router.handle
}
