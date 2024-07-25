function zip(
  x: number,
  y: string,
  z: boolean
): { x: number; y: string; z: boolean } {
  return { x, y, z };
}

type Params = Parameters<typeof zip>;
type First = Params[0];

// infer는 extends에서만 사용가능
// 추론조건 ? 추론 성공 시의 값 : 추론 실패 시의 값
type P<T extends (...args:any) => any> = T extends (...args:infer A) => any ? A : never;
type R<T extends (...args:any) => any> = T extends (...args:any A) => infer A ? A : never;
type Params = Parameters<typeof zip>;
type Ret = ReturnType<typeof zip>;
type First = Params[0]

type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args:infer P ) => any ? P : never;



//

class A {
    a: string;
    b: number;
    c: boolean;
    constructor (a:string, b: number, c:boolean){
        this.a = a;
        this.b = b;
        this.c = c;
    }
}
const c = new A('123', 456, true);
type C = ConstructorParameters<typeof A>;
type I = InstanceType<typeof A>;