/**
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Router } from 'itty-router'
import { zigFetch, zigWasiFetch, zigSchedule, getZigWorker } from '../src/index'

const router = Router()
// js route
router.get('/', () => new Response('Hello from JS!'))
// zig route using zig's FetchMap
router.post('/basic', zigFetch<Env>('basic'))
// **FETCH**
router.get('/fetch', zigFetch<Env>('fetch'))
// **CRYPTO**
router.post('/argon-hash', zigWasiFetch<Env>('argonHash'))
router.post('/argon-verify', zigWasiFetch<Env>('argonVerify'))
// **CACHE**
router.get('/cache/text', zigFetch<Env>('cacheText'))
router.get('/cache/string', zigFetch<Env>('cacheString'))
router.get('/cache/unique', zigFetch<Env>('cacheUnique'))
router.get('/cache/delete', zigFetch<Env>('cacheDelete'))
router.get('/cache/ignore/text', zigFetch<Env>('cacheIgnoreText'))
router.get('/cache/ignore/delete', zigFetch<Env>('cacheIgnoreDelete'))
// **KV**
router.get('/kv/string', zigFetch<Env>('kvString'))
router.get('/kv/string-meta', zigFetch<Env>('kvStringMeta'))
router.get('/kv/text', zigFetch<Env>('kvText'))
router.get('/kv/text-meta', zigFetch<Env>('kvTextMeta'))
router.get('/kv/text-expirettl', zigFetch<Env>('kvTextExpireTtl'))
router.post('/kv/text-expire', zigFetch<Env>('kvTextExpire'))
router.get('/kv/text-cacheTtl', zigFetch<Env>('kvTextCacheTtl'))
router.get('/kv/object', zigFetch<Env>('kvObject'))
router.get('/kv/object-meta', zigFetch<Env>('kvObjectMeta'))
router.get('/kv/json', zigFetch<Env>('kvJSON'))
router.get('/kv/arraybuffer', zigFetch<Env>('kvArraybuffer'))
router.get('/kv/arraybuffer-meta', zigFetch<Env>('kvArraybufferMeta'))
router.get('/kv/stream', zigFetch<Env>('kvStream'))
router.get('/kv/stream-meta', zigFetch<Env>('kvStreamMeta'))
router.get('/kv/bytes', zigFetch<Env>('kvBytes'))
router.get('/kv/bytes-meta', zigFetch<Env>('kvBytesMeta'))
router.get('/kv/delete', zigFetch<Env>('kvDelete'))
router.get('/kv/list', zigFetch<Env>('kvList'))
// **R2**
router.get('/r2/stream', zigFetch<Env>('r2Stream'))
router.get('/r2/text', zigFetch<Env>('r2Text'))
router.get('/r2/string', zigFetch<Env>('r2String'))
router.get('/r2/array-buffer', zigFetch<Env>('r2ArrayBuffer'))
router.get('/r2/bytes', zigFetch<Env>('r2Bytes'))
router.get('/r2/object', zigFetch<Env>('r2Object'))
router.get('/r2/json', zigFetch<Env>('r2JSON'))
router.get('/r2/head', zigFetch<Env>('r2Head'))
router.get('/r2/delete', zigFetch<Env>('r2Delete'))
router.get('/r2/list', zigFetch<Env>('r2List'))
router.get('/r2/r2object', zigFetch<Env>('r2R2Object'))
router.get('/r2/r2object-body', zigFetch<Env>('r2R2ObjectBody'))
// **D1**
router.get('/d1/first', zigFetch<Env>('d1First'))
router.get('/d1/all', zigFetch<Env>('d1All'))
router.get('/d1/raw', zigFetch<Env>('d1Raw'))
router.get('/d1/run', zigFetch<Env>('d1Run'))
router.get('/d1/batch', zigFetch<Env>('d1Batch'))
router.get('/d1/exec', zigFetch<Env>('d1Exec'))

// ** ZIG HEAP **
// return the heap to ensure it's cleaned up
export function zigHeap (): Array<any> {
  const worker = getZigWorker()
  return [...worker.heap]
}

export default {
  fetch: router.handle,
  scheduled: zigSchedule
}
