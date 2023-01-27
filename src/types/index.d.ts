declare namespace myLib {
  function makeGreeting(s: string): string
  let numberOfGreetings: number
}

declare function getWidget(n: number): number
declare function getWidget(n: string): string

// type Controller = (req: Req<Infer<ReqBodyProps>>, res: Res, next: Next) => Promise<Res | void>

// declare const tryCatch =
//   (controller: Controller): Controller =>
//   async (req: Req<Infer<ReqBodyProps>>, res: Res, next: Next): Promise<void | Res> => {
//     try {
//       return await controller(req, res, next)
//     } catch (error) {
//       next(error)
//     }
//   }
