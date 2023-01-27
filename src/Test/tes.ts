interface Func {
  (v1: number, v2: number): number
  (v1: string, v2: string): string
}

const f1: Func = (v1, v2): any => {
  if (typeof v1 === 'string' && typeof v2 === 'string') return v1 + v2
  if (typeof v1 === 'number' && typeof v2 === 'number') return v1 + v2
}
const isString = f1('1', '2')
const isNumber = f1(1, 2)
