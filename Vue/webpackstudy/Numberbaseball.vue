<template>
  <div>
    <h1>{{ result }}</h1>
    <!--깨알팁 @으로 바꾸기 가능 <form @submit="onSubmitForm"> -->
    <!-- v-on:submit.prevent 로 e.preventDefault() 안해도됨 -->
    <!-- <form v-on:submit="onSubmitForm">
    <form @submit="onSubmitForm">
    <form v-on:submit.prevent="onSubmitForm"> -->
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" maxlength="4" type="text" v-model="value" />
      <button type="submit">입력</button>
    </form>
    <div>시도:{{ tries.length }}</div>
    <ul>
      <!-- t in tries 이쪽은 js영역 -->
      <li v-for="t in tries">
        <div>{{ t.try }}</div>
        <div>{{ t.result }}</div>
      </li>
    </ul>
    <div id="reset"></div>
  </div>
</template>

<script>
//다른데서도 쓸수 있고 화면하고 상관 없어서 굳이 methods에 안 넣어도됨
const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};
//이거 안쓰면 import못하는거 알지?
export default {
  data() {
    return {
      answer: getNumbers(), // ex) [1,5,3,4]
      tries: [], //시도 수
      value: "", // 입력
      result: "", //결과
    };
  },
  methods: {
    onSubmitForm(e) {
      let reset = document.querySelector("#reset");
      //e.preventDefault();
      //input의 값은 전부 문자열이기에 answer숫자 배열을 문자로 만듬
      if (this.value === this.answer.join("")) {
        //정답
        this.tries.push({
          try: this.value,
          result: "홈런",
        });
        this.result = "홈런";
        reset.innerHTML = "게임 재시작";
        this.value = "";
        this.tries = [];
        this.$refs.answer.focus();
      } else {
        if (this.tries.length > 9) {
          this.result = `10번 시도, 하지만 실패 답은${this.answer.join(",")} 였습니다`;
          reset.innerHTML = "다시 시작함";
          this.value = "";
          this.answer = getNumbers();
          this.tries = [];
          this.$refs.answer.focus();
        }
        //화면과 관련이 없어서 일반 변수
        let strike = 0;
        let ball = 0;
        //문자열을 숫자 배열로 바꾸고 반복문 돌면서 비교
        const answerArray = this.value.split("").map((v) => parseInt(v));
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.answer[i]) {
            strike++;
          } else if (this.answer.includes(answerArray[i])) {
            ball++;
          }
        }
        this.tries.push({
          try: this.value,
          result: `${strike}스트라이크, ${ball} 볼입니다.`,
        });
        if (this.tries.length > 0 && this.tries.length < 10) {
          reset.innerHTML = "게임 진행중";
        }
        console.log("tries", this.tries);
        console.log("this", this);
        this.value = "";
        this.$refs.answer.focus();
      }
    },
  },
};
////Vue.component("wordRelay" 라고 생각해라
</script>
<style></style>
