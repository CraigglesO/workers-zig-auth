export interface JSONBody {
  [key: string]: unknown
  err?: string
}

export default function buildJSONResponse (json: JSONBody, status = 200): Response {
  if (json.err !== undefined) status = 412 // PRECONDITION_FAILED
  return new Response(JSON.stringify(json), { headers: { 'Content-Type': 'application/json' }, status })
}
