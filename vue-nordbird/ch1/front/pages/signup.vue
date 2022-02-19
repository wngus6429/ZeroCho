<template>
  <div>
    <v-container style="margin-left: 0px">
      <v-card>
        <v-container>
          <v-subheader>회원가입</v-subheader>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field v-model="email" label="이메일" :rules="emailRules" type="email" required />
            <v-text-field v-model="password" label="비밀번호" :rules="passwordRules" type="password" required />
            <v-text-field v-model="passwordCheck" label="비밀번호확인" :rules="passwordCheckRules" type="password" required />
            <v-text-field v-model="nickname" label="닉네임" :rules="nicknameRules" type="text" required />
            <v-checkbox v-model="terms" label="내 말을 잘 들을것" :rules="[(v) => !!v || '약관에 동의해야 합니다']" required />
            <v-btn color="green" type="submit" :disabled="!valid">가입하기</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Nuxt.js",
      valid: false,
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      terms: false, // 약관 ㅋ
      // Rules 검증하는건 뷰티파이에서 제공
      // Rules를 안만들면 valid가 항상 true라고 생각
      emailRules: [(v) => !!v || "이메일은 필수 입니다.", (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다."],
      nicknameRules: [(v) => !!v || "닉네임은 필수입니다."],
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다."],
      passwordCheckRules: [
        (v) => !!v || "비밀번호 확인은 필수입니다.",
        (v) => v === this.password || "비밀번호가 일치하지 않습니다.",
      ],
    };
  },
  head() {
    return {
      title: "회원가입",
    };
  },
  methods: {
    onSubmitForm() {
      // 이런건 vuetify에서 제공
      if (this.$refs.form.validate()) {
        alert("회원가입시도");
      } else {
        alert("유효하지 않습니다.");
      }
      console.log(this.valid); //유효하면 true, 아니면 false
    },
  },
};
</script>

<style></style>
