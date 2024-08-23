function tt(): void {
  return null; // void 형식에서는 null 안됨. undefined만 가능.
}
const y = tt();

function aaaa(() => void): void {}

aaaa(() => {
    return '3';
})


interface Humans {
  talk: () => void;
}

const humans: Humans = {
  talk() {
    return "abc";
  },
};

// void는 3가지가 나올수 있는데. 리턴값의 void랑 매개변수에 void, 메서드에 void
