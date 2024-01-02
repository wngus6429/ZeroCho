// declare선언하면 자바스크립트로 바꿀때 사라진다.
// 매개변수 일때의 void는 매개변수의 값이 어떤지 상관안한다는 뜻임
// 다른 void는 없다는 뜻이고
// void 타입은 return값을 사용하지 안 겠다는 뜻(메서드나 매개변수에서는 리턴값 사용 가능, but 조심해야 함)
declare function forEach<T>(arr: T[], callback: (el: T) => undefined): void;
// declare function forEach<T>(arr: T[], callback: (el: T) => void): void;
let target: number[] = [];
forEach([1, 2, 3], (el) => target.push(el));
// void는 리턴값이 뭐든간에 상관하지 않겠다는것 (매서드의 void이니까.)
// void면 리턴을 안넣는게 원칙적으로 맞음.
interface AA {
  talk: () => void;
}
const hh: AA = {
  talk() {
    return 3;
  },
};
// bbb가 void가 됨 , 뒤에꺼는 내가 책임진다, as 같은거 쓰는게 낫다.
const bbb = hh.talk() as unknown as number;
// const bbb = <number>hh.talk();
