// pada callback saat baris kode return resJson(res, 'OK', data) or return res.json(data) *data dari instance sequelize*
// maka data akan kehilangan type / autocomplete nya
// jika ingin mengedit hapus dulu return resJson(res, 'OK', data)
const tryCatch =
  <ReqBodyProps>(controller: (req: Req<Infer<ReqBodyProps>>, res: Res, next: Next) => Promise<Res | void>) =>
  async (req: Req<Infer<ReqBodyProps>>, res: Res, next: Next): Promise<Res | void> => {
    try {
      return await controller(req, res, next)
    } catch (error) {
      next(error)
    }
  }

export default tryCatch
