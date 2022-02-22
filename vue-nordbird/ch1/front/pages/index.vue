<template>
  <v-container style="margin-left: 0px">
    <PostForm v-if="me" />
    <div>
      <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </v-container>
</template>

<script>
import PostCard from "~/components/PostCard.vue";
import PostForm from "~/components/PostForm.vue";
export default {
  components: {
    PostCard,
    PostForm,
  },
  data() {
    return {
      name: "Nuxt.js",
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    mainPosts() {
      return this.$store.state.posts.mainPosts;
    },
  },
};
</script>

<style></style>
