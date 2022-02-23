<template>
  <!-- v-container역할이 패딩주는거 -->
  <v-container v-if="!me">
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
  <v-container v-else>
    <v-card>
      <v-container>
        {{ me.nickname }}로그인되었습니다
        <v-btn @click="onLogOut">로그아웃</v-btn>
      </v-container>
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
  computed: {
    me() {
      return this.$store.state.users.me; //모듈 users.js 생각해서 붙여줘야함
    },
  },
  methods: {
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("users/logIn", {
          email: this.email,
          nickname: "제로초", //이건 알아낼수가 없으니 대충
        });
      }
    },
    onLogOut() {
      this.$store.dispatch("users/logOut"); //슬래쉬로 파일명 작성 기억해야함
    },
  },
};
</script>

<style></style>
