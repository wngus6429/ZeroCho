type Q = { hello: "world" } & { zero: "cho" }; // 모든 속성이 다 있어야 한다.intersection이라함
// 위에꺼도 되고 아래와 같이 또는도 된다. 의미가 다름
// type Q = { hello: "world" } | { zero: "cho" };
// 또는 이면 하나만 있으면 됨.
const qq: Q = { hello: "world", zero: "cho" };
