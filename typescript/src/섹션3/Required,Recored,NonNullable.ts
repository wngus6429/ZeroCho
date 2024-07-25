interface Profile {
  readonly name?: string;
  readonly age?: number;
  readonly married?: boolean;
}

type Name = Profile["name"];

type R<T> = {
  -readonly [key in keyof T]-?: T[key];
};

// Readonly써서 수정 못하게함
const zerocho: Readonly<Profile> = {
  name: "zerocho",
  age: 29,
  married: false,
};
zerocho.name = "nero";

type A = string | null | undefined | boolean | number;
type B = NonNullable<A>;

type N<T> = T extends null | undefined ? never : T; // string | boolean | number
