<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>내 프로필</v-subheader>
          <v-form v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field v-model="nickname" label="닉네임" :rules="nicknameRules" required />
            <v-btn dark color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <FollowList :propdata="followingListData" :deletefunc="removeFollweing" />
          <v-btn @click="loadMoreFollowings" v-if="hasMoreFollowing" color="yellow" style="width: 100%">더보기</v-btn>
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <FollowList :propdata="followerListData" :deletefunc="removeFollower" />
          <v-btn @click="loadMoreFollowers" v-if="hasMoreFollower" color="pink" style="width: 100%">더보기</v-btn>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FollowList from "~/components/FollowList.vue";
export default {
  components: {
    FollowList,
  },
  data() {
    return {
      valid: false,
      nickname: "",
      nicknameRules: [(v) => !!v || "닉네임을 입력하세요"],
      name: "Nuxt.js",
    };
  },
  head() {
    return {
      title: "프로필",
    };
  },
  computed: {
    followingListData() {
      return this.$store.state.users.followingList;
    },
    followerListData() {
      return this.$store.state.users.followerList;
    },
    hasMoreFollowing() {
      return this.$store.state.users.hasMoreFollowing;
    },
    hasMoreFollower() {
      return this.$store.state.users.hasMoreFollower;
    },
  },
  fetch({ store }) {
    store.dispatch("users/loadFollowers");
    store.dispatch("users/loadFollowings");
  },
  methods: {
    onChangeNickname() {
      this.$store.dispatch("users/changeNickname", {
        nickname: this.nickname,
      });
    },
    removeFollweing(id) {
      this.$store.dispatch("users/removeFollowing", { id });
    },
    removeFollower(id) {
      this.$store.dispatch("users/removeFollower", { id });
    },
    loadMoreFollowings() {
      this.$store.dispatch("users/loadFollowings");
    },
    loadMoreFollowers() {
      this.$store.dispatch("users/loadFollowers");
    },
  },
  middleware: "authenticated",
};
</script>

<style></style>
