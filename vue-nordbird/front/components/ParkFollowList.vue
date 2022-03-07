<template>
  <v-list>
    <v-list-item v-for="followingName in propdata" :key="followingName.id">
      <span>{{ followingName }}</span>
      <v-icon @click="deletefunc(followingName)">mdi-minus-circle-outline</v-icon>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    propdata: {
      type: Array,
      default: () => [],
      required: true,
    },
    deletefunc: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style></style>
