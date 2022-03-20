module.exports = {
  head: {
    title: "VueBird",
  },
  buildModules: ["@nuxtjs/vuetify"],
  axios: {
    baseURL: "http://localhost:3000", // Used as fallback if no runtime config is provided
  },
  modules: ["@nuxtjs/axios"],
};
