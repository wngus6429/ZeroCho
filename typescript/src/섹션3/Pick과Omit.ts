interface Profile {
    name: string,
    age : number,
    married: boolean
}

type Name = Profile['name']

const zerocho: Profile ={
    name:'zerocho',
    age: 29,
    married: false
}

// Pick 실제로 만들어보기
type P<T, S extends keyof T> = {
    [key in S]: T[key]
}

// Pick써서 Profile에 name과 age만 가져옴
const newZerocho: Pick<Profile, 'name' | 'age'> ={
    name:'zerocho',
    age: 29,
}

// Omit써서 Profile에서 married만 빼서 가져옴
const NNewZerocho: Omit<Profile, 'marrried'> ={
    name:'zerocho',
    age: 29,
}