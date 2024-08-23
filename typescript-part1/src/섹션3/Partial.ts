interface Profile {
    name: string,
    age : number,
    married: boolean
}

interface NewProfile {
    name: string,
    age : number,
}



const zerocho: Profile ={
    name:'zerocho',
    age: 29,
    married: false
}

// type Name = Profile['name']

// Partial 직접 만들어보기
type P<T> = {
    [key in keyof T]?: T[key];
}


// Partial은 위에 Profile 필수값을 ? 붙여서 옵션으로 만들어줌.
const newZerocho: Partial<Profile> ={
    name:'zerocho',
    age: 29,
}


const newssssZerocho: P<Profile> ={
    name:'zerocho',
    age: 29,
}

// 제로초는 partial 거의 안 쓴다함, pick 이나 omit 쓴다함