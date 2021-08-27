<template>
  <div>
    <h1>{{ result }}</h1>
    <form v-on:submit="onSubmitForm">
      <input ref="answer" type="text" v-model="value" />
    </form>
    <div>시도:{{}}</div>
  </div>
</template>

<script>
//Vue.component("wordRelay" 라고 생각해라
export default {
  data() {
    return {
      value: "",
      result: "",
    };
  },
  methods: {
    onSubmitForm(e) {
      e.preventDefault();
    },
  },
};
</script>
