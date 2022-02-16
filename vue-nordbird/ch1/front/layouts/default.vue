<template>
  <v-app>
    <nav>
      <v-toolbar dark color="green">
        <v-toolbar-title>
          <nuxt-link to="/">NordBird</nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
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
      <v-col cols="12" md="3"> <LoginForm /> </v-col>
      <v-col cols="12" md="9"> <nuxt /> </v-col>
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
};
</script>

<style></style>
