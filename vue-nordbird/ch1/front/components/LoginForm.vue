<template>
  <!-- v-container역할이 패딩주는거 -->
  <v-container>
    <v-card elevation="2">
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container style="margin: 0px">
          <v-text-field v-model="email" label="이메일" :rules="emailRules" type="email" required />
          <v-text-field v-model="password" label="비밀번호" :rules="passwordRules" type="password" required />
          <v-btn color="green" type="submit" :disabled="!valid">로그인</v-btn>
          <v-btn nuxt to="/signup">회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // valid는 버튼같은거 비활성화 시킬때 좋다.
      valid: false,
      email: "",
      password: "",
      emailRules: [(v) => !!v || "이메일은 필수 입니다.", (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다."],
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다."],
    };
  },
  methods: {
    onSubmitForm() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style></style>
