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
    <v-row>
      <!-- 12가 분할하기 좋아서, <nuxt />가 화면 보이는곳 -->
      <v-col cols="12" md="4"> 로그인창 </v-col>
      <v-col cols="12" md="8"> <nuxt /> </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {};
</script>

<style></style>
