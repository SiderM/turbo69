export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'turbo69',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/ymapPlugin.js', mode: 'client' },
    '~/plugins/vFacade.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/device',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyBY8qMOWmME69kRcY01XfWwG88XrKMTkBE",
          authDomain: "turbo69-tver.firebaseapp.com",
          databaseURL: "https://turbo69-tver-default-rtdb.europe-west1.firebasedatabase.app",
          projectId: "turbo69-tver",
          storageBucket: "turbo69-tver.appspot.com",
          messagingSenderId: "713809823122",
          appId: "1:713809823122:web:828c48b9903c400d86ad4b"
        },
        services: {
          firestore: true,
        }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
