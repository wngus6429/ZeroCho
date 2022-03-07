<template>
  <!-- _id 동적라우팅 하는걸 nuxt가 알아챔ㄴ -->
  <v-container v-if="post"> <PostCard :post="post" /> </v-container>
  <div v-else>해당 아이디의 게시글이 존재하지 않습니다.</div>
</template>

<script>
import PostCard from "~/components/PostCard";
export default {
  components: {
    PostCard,
  },
  computed: {
    post() {
      // 파일이름 _id가 밑에줄 params.id에 들어있지. _name이면 params.name
      // params.id가 파일명에 따라서 바뀌는거지, 135번 게시글이면 params.135가 되겟지
      // 서버가 생기면 잘 동작 안 할수도 있음. DB 파일 찾기 타이밍에 따라서
      return this.$store.state.posts.mainPosts.find((v) => v.id === parseInt(this.$route.params.id));
    },
  },
};
</script>

<style></style>
