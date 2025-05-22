// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/global.css'],

  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/image',
  ],

  googleFonts: {
    families: {
      Oregano: true,
      Inter: true
    },
    display: 'swap'
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Soul Sanctuary',
      meta: [
        { name: 'description', content: 'Soul Sanctuary - A venue for spiritual wellness and holistic healing.' },
        { name: 'keywords', content: 'spiritual wellness, meditation, mind-body connection, yoga, personal growth, wellness center, mindfulness, holistic healing, yoga practice, spiritual retreat, inner peace, wellness journey, yoga classes, spiritual guidance, lessons with teachers, self-discovery, stress relief, mental wellness, spiritual community' },
        { name: 'author', content: 'Team Members: Cotrone Mariariosaria, De Ciechi Samuele, Denti Silvia, Di Lorenzo Flavio' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://soulsanctuary-ten.vercel.app/' },
        { property: 'og:title', content: 'Soul Sanctuary' },
        { property: 'og:description', content: 'Experience spiritual wellness and holistic healing at Soul Sanctuary' },
        { property: 'og:image', content: 'https://soulsanctuary-ten.vercel.app/tab_logo.svg' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Soul Sanctuary' },
        { name: 'twitter:description', content: 'Experience spiritual wellness and holistic healing at Soul Sanctuary' },
        { name: 'twitter:image', content: 'https://soulsanctuary-ten.vercel.app/tab_logo.svg' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/tab_logo.svg' },
        { rel: 'canonical', href: 'https://soulsanctuary-ten.vercel.app/' }
      ]
    }
  },
});