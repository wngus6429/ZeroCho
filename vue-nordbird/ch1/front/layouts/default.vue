<template>
  <v-app>
    <nav>
      <v-toolbar dark color="green">
        <v-toolbar-title>
          <nuxt-link to="/">NordBird</nuxt-link>
          <img src="@/public/윾.PNG" height="55px" />
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <!-- hide-details는 밑에 보이지 않는 빈공간 제거 -->
          <v-text-field label="검색" hide-details prepend-icon="mdi-magnify" :style="{ display: 'flex', alignItems: 'center' }" />
          <v-btn text nuxt to="/profile" :style="{ display: 'flex', alignItems: 'center' }">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signup" :style="{ display: 'flex', alignItems: 'center' }">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-row no-gutters>
      <!-- 12가 분할하기 좋아서, <nuxt />가 화면 보이는곳 -->
      <!-- xs 대신에 cols라고 보면됨, cols는 12고정 -->
      <v-col cols="12" md="3"> <LoginForm /> </v-col>
      <v-col cols="12" md="6"> <nuxt /> </v-col>
      <v-col cols="12" md="3"> <img src="@/public/윾.PNG" /> </v-col>
    </v-row>
  </v-app>
</template>

<script>
// ~는 소스 디렉토리를 이야기함. 루트라고 생각하면됨
import LoginForm from "~/components/LoginForm.vue";
export default {
  components: {
    LoginForm,
  },
  computed: {
    name() {
      return this.$store.state.posts.name;
    },
  },
  methods: {
    onChangeName() {
      this.$store.commit("posts/BYE");
    },
  },
};
</script>

<style></style>
