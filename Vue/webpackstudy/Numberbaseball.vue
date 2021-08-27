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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tries: [],
      value: "",
      result: "",
    };
  },
  methods: {
    onSubmitForm(e) {
      //e.preventDefault();
      this.tries.push({
        //this.value
        try: this.value,
        result: "홈런",
      });
      console.log(this.tries);
      this.value = "";
      this.$refs.answer.focus();
    },
  },
};
////Vue.component("wordRelay" 라고 생각해라
</script>
<style></style>
