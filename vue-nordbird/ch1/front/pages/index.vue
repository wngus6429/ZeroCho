<template>
  <v-container style="margin-left: 0px">
    Home Page
    <div>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
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
};
</script>

<style></style>
