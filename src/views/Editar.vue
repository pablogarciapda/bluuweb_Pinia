<template>
  <div>
    <h1>EDITAR nota {{ route.params.id }}</h1>

    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="url" />
      <button type="submit">modificar</button>
    </form>
  </div>
</template>

<script setup>
  import { onMounted, ref } from '@vue/runtime-core'
  import { useRoute, useRouter } from 'vue-router'
  import { useDatabaseStore } from '../stores/database'

  const databaseStore = useDatabaseStore()
  const route = useRoute()
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      await databaseStore.updateUrl(route.params.id, url.value)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const url = ref('')

  onMounted(async () => {
    url.value = await databaseStore.leerUrl(route.params.id)
  })
</script>
