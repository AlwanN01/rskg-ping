import type { InferAttributes } from 'sequelize'
import { z } from 'zod'
type Controller<ReqBodyProps> = (req: Req<ReqBodyProps>, res: Res, next: Next) => Promise<Res | void>
type GetController = (req: Req, res: Res, next: Next) => Promise<Res | void>

interface TryCatchRes {
  <ReqBodyProps>(controller: Controller<ReqBodyProps>): Promise<Controller<ReqBodyProps>>
  // (schema:z.Schema, controller:GetController): GetController
}

/**  pada callback saat baris kode return resJson(res, 'OK', data) or return res.json(data) data dari instance sequelize
 maka data akan kehilangan type / autocomplete nya
 jika ingin mengedit hapus dulu return resJson(res, 'OK', data)*/
const tryCatch: TryCatchRes = async controller => async (req, res, next) => {
  try {
    return await controller(req, res, next)
  } catch (error) {
    next()
  }
}
export default tryCatch

// const tryCatch =
//   <ReqBodyProps>(controller: (req: Req<Infer<ReqBodyProps>>, res: Res, next: Next) => Promise<Res | void>) =>
//   async (req: Req<Infer<ReqBodyProps>>, res: Res, next: Next): Promise<Res | void> => {
//     try {
//       return await controller(req, res, next)
//     } catch (error) {
//       next(error)
//     }
//   }

function add(a: number, b: number, c: number): number
function add(a: number, b: number): any
function add(a: string, b: string): string

function add(a: any, b: any, c?: any): any {
  if (c) {
    return a + c
  }
  if (typeof a === 'string') {
    return `a is ${a}, b is ${b}`
  } else {
    return a + b
  }
}

const tambah = add('sdt', 'ye')
