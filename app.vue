<template>
  <body style="background: #263238">
  <div class="bg-blue-grey-darken-4 h-screen">
    <div class="d-flex w-100 border-b">
      <div class="justify-start py-5 pl-5">
        <p class="text-white text-uppercase font-weight-regular font-italic">Wews</p>
      </div>
    </div>

    <div class="text-center py-16 font-weight-bold text-h4">
      Aplicación de basada procesos ETL para la seguridad en la
      web
    </div>
    <v-row justify="center">
      <v-col cols="3">
        <v-text-field variant="outlined" clearable v-model="urlToCheck">
          <template #label>
            <p class="text-center">Introduce una URL</p>
          </template>
        </v-text-field>
        <div class="text-center">
          <v-btn @click="check">Comprobar</v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" v-if="tableValues != null">
      <v-col cols="6">
        <div v-if="tableValues.found.length > 0" class="text-center">
          <v-alert type="error" variant="outlined">
            <template #text>
              <div class="text-red-lighten-3">
                <p>Hemos encontrado esta URL en nuestro banco de datos. Este enlace posee un riesgo de
                  {{ tableValues.found[0].threat_type }}</p>
                <p>Mostramos también URLs relacionadas con el mismo dominio</p>
              </div>
            </template>
          </v-alert>

        </div>
        <div v-else>
          <v-alert type="info" variant="outlined">
            <template #text>
              <p>No tenemos esta URL documentada como maliciosa, a continuación mostramos URLs
                provenientes del mismo DNS que podrían ser de interés. Se han encontrado
                {{ tableValues.similar.length }} enlaces maliciosos con el mismo dominio.</p>
            </template>
          </v-alert>
        </div>
      </v-col>
    </v-row>

    <v-row class="blue-grey-darken-4" justify="center" v-if="tableValues != null">
      <v-col cols="8">
        <v-table>
          <thead class="bg-blue-grey-darken-4">
          <tr>
            <th class="text-left">
              Url
            </th>
            <th class="text-left">
              Threat Type
            </th>
            <th class="text-left">
              Domain
            </th>
          </tr>
          </thead>
          <tbody class="bg-blue-grey-darken-4">
          <tr
              v-for="item in tableValues.similar"
              :key="item.name"
          >
            <td>{{ item.url }}</td>
            <td>{{ item.threat_type }}</td>
            <td>{{ item.domain }}</td>
          </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </div>
  </body>
</template>
<script setup lang="ts">

const urlToCheck = ref()
const tableValues = ref(null)

const check = async () => {
  tableValues.value = null;

  const data = {url: urlToCheck.value}
  const response = await fetch('http://localhost:8000/check', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()
  tableValues.value = result;
}

</script>

<style scoped>
body {
  @apply 'blue-grey-darken-4'
}
</style>