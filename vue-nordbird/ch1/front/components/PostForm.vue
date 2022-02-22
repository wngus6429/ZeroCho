<template>
  <v-card style="margin-bottom: 20px">
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea
          v-model="content"
          outlined
          auto-grow
          clearable
          label="왓헤쁜"
          :hide-details="hideDetails"
          :success-messages="successMessages"
          :success="success"
          :rules="[(f) => !!f || '내용을 입력하세요']"
          @input="onChangeTextarea"
        />
        <!-- 띄어쓰기 없앤후에 한글자라도 있어야함 -->
        <v-btn type="submit" color="green" absolute right>작성</v-btn>
      </v-form>
      <!-- css바로 적용되는거 보소 -->
      <v-btn>이미지업로드</v-btn>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      content: "",
      hideDetails: true, //에러 공간이 될거임
      successMessages: "",
      success: false,
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    // ...mapState('users', ['me'])
  },
  methods: {
    onChangeTextarea() {
      this.hideDetails = true;
      this.success = false;
      this.successMessages = "";
    },
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("posts/add", {
            content: this.content,
            User: {
              nickname: this.me.nickname,
            },
            Comments: [],
            Images: [],
            id: Date.now(),
            createdAt: Date.now(),
          })
          .then(() => {
            this.content = "";
            this.hideDetails = false;
            this.success = true;
            this.successMessages = "게시글 등록 성공";
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style></style>
