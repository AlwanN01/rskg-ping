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

interface A {
  discriminator: 'I-AM-A'
  member: string
}

function instanceOfA(object: any): object is A {
  return object.discriminator === 'I-AM-A'
}

var a: any = { discriminator: 'I-AM-A', member: 'foobar' }

if (instanceOfA(a)) {
  console.log(a.member)
}
