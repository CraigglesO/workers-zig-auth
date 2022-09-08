/**
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Router } from 'itty-router'
import { zigWasiFetch } from 'workers-zig'

const router = Router()
// zig route using zig's FetchMap
router.post('/argon-hash', zigWasiFetch<Env>('argonHash'))
router.post('/argon-verify', zigWasiFetch<Env>('argonVerify'))

export default {
  fetch: router.handle
}
