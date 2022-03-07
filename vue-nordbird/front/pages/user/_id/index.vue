<template>
  <v-container style="margin-left: 0px">
    <div>
      <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </v-container>
</template>

<script>
import PostCard from "~/components/PostCard.vue";
export default {
  components: {
    PostCard,
  },
  data() {
    return {
      name: "Nuxt.js",
    };
  },
  // 컴포넌트가 화면을 보이기 전에 실행, 비동기적으로 데이터를 store에 넣을때 사용
  // 화면이 뜨기 전에 데이터 10개를 서버에서 로딩해옴. 그리고 반영되게 할수 있도록
  fetch({ store }) {
    store.dispatch("posts/loadPosts");
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    mainPosts() {
      return this.$store.state.posts.mainPosts;
    },
    hasMorePost() {
      return this.$store.state.posts.hasMorePost;
    },
  },
  mounted() {
    // window 기능은 created에서 못씀 mounted에서만
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      console.log("호가인");
      // 확내리면 그 숫자가 안될수도 있으니 부등호로
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (this.hasMorePost) {
          this.$store.dispatch("posts/loadPosts");
        }
      }
    },
  },
};
</script>

<style></style>
