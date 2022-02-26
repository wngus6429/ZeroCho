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
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
  watch: {
    me(value, oldValue) {
      if (value) {
        // this.$router.push("/");
        // 컴포넌트적으로는 nuxt-link
        // $router.push는 프로그래밍적으로 넘김
        this.$router.push({
          path: "/",
        });
      }
    },
  },
  methods: {
    onSubmitForm() {
      // 이런건 vuetify에서 제공
      if (this.$refs.form.validate()) {
        // action은 dispatch, 뮤테이션은 commit
        // users 모듈안에꺼라서 앞에 붙여야함
        this.$store
          .dispatch("users/signUp", {
            nickname: this.nickname,
            email: this.email,
          }) //비동기는 then과 catch 써줘야 한다.
          .then(this.$router.push("/"))
          .catch(() => {
            alert("에러가 발생");
          });
        // then catch대신에 async await으로도 된다.
        // 대신 try catch 꼭 해주기
      } else {
        alert("유효하지 않습니다.");
      }
      console.log(this.valid); //유효하면 true, 아니면 false
    },
  },
  // 회원가입 하지 않은 사람만, 미들웨어로 검사를 할수 있다.
  middleware: "anonymous",
};
</script>

<style></style>
