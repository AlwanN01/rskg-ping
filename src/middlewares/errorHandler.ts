import { ValidationError } from 'sequelize'
const errorHandler = (err: Error, req: Req, res: Res, next: Next) => {
  const code = err != null && err instanceof Error ? 400 : 500
  let error
  if (err instanceof ValidationError)
    error = {
      name: err.name,
      message: ValidationError.name,
      issues: err.errors.map(error => ({ message: error.message, path: error.path, value: error.value }))
    }

  return res.status(code).send({
    code: code,
    status: code == 400 ? 'Bad Request' : 'Internal Server Error',
    // message: err != null && err instanceof Error ? err.message : 'Server Error',
    errors: error ? error : err
  })
}
export default errorHandler
