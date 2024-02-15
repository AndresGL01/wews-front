// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/util/colors'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify(
      {
        theme: {
          themes: {
            light: {
              dark: false,
              colors: {
                primary: colors.green.accent1,
                secondary: colors.blueGrey.darken4
              }
            }
          }
        }
      }
  )
  app.vueApp.use(vuetify)
})
