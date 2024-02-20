// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "TypoRace",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined",
        },
        { rel: "icon", type: "image/x-icon", href: "TypeLogoFav.png" },
      ],
    },
  },
  runtimeConfig: {
    public: {
      API: process.env.API,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
});
