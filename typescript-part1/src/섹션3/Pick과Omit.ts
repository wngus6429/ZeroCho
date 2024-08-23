interface Profile {
  name: string;
  age: number;
  married: boolean;
}

type Name = Profile["name"];

const zerocho: Profile = {
  name: "zerocho",
  age: 29,
  married: false,
};

// Pick 실제로 만들어보기
type P<T, S extends keyof T> = {
  [key in S]: T[key];
};

// Pick써서 Profile에 name과 age만 가져옴
const newZerocho: Pick<Profile, "name" | "age"> = {
  name: "zerocho",
  age: 29,
};

// type Exclude<T,U> = T extends U ? never : T;
// type Extract<T,U> = T extends U ? T : never;

type Animal = "cat" | "dog" | "human";
type Mammal = Exclude<Animal, "human">; // 'cat', | 'dog
type Human = Extract<Animal, "cat" | "dog">; // 'cat', | 'dog

type A = Exclude<keyof Profile, "married">;

// Omit써서 Profile에서 married만 빼서 가져옴
const NNewZerocho: Omit<Profile, "marrried"> = {
  name: "zerocho",
  age: 29,
};

// omit 기능을 만들어본거임.
type O<T, S extends keyof any> = Pick<T, Exclude<keyof T, S>>;
const newnewZerocho: O<Profile, "married"> = {
  name: "zerocho",
  age: 29,
};
