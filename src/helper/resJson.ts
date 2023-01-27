type Pair<K = string> = { code: number; status: K }
const pairs = (<T>(p: readonly Pair<T>[]) => p)([
  { code: 200, status: 'OK' },
  { code: 201, status: 'Created' },
  { code: 204, status: 'No Content' },
  { code: 400, status: 'Bad Request' },
  { code: 401, status: 'Unauthorized' },
  { code: 403, status: 'Forbidden' },
  { code: 404, status: 'Not Found' },
  { code: 409, status: 'Conflict' }
] as const)
type Status = typeof pairs[number]['status']

type Message = 'Updated' | 'Deleted' | 'Data Already Exist' | 'Invalid Token' | 'Internal Server Error'

const resJson = (res: Res, statusMessage: Status, dataOrErrorq: any = null) => {
  try {
    const { code, status } = pairs.find(data => data.status === statusMessage)!
    return res.status(code).json({
      code,
      status,
      [code >= 400 ? 'error' : 'data']: dataOrErrorq
    })
  } catch (error: any) {
    throw new Error(error)
  }
}
export default resJson
