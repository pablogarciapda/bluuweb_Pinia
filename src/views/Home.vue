<template>
  <div>
    <h1>Home</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Ingrese url" v-model="url" />
      <button type="submit">agregar url</button>
    </form>
    <p>{{ userStore.userData }}</p>
    <p v-if="databaseStore.loadingDoc">Loading Doc .......</p>
    <ul v-else>
      <li v-for="item in databaseStore.documents" :key="item.id">
        <p>{{ item.id }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.short }}</p>
        <button @click.prevent="handleEliminar(item.id)">eliminar</button>
        <button @click.prevent="handleEditar(item.id)">editar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { useUserStore } from '../stores/user'
  import { useDatabaseStore } from '../stores/database'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const userStore = useUserStore()
  const databaseStore = useDatabaseStore()
  const router = useRouter()
  const url = ref('')
  databaseStore.getUrls()

  const handleSubmit = async () => {
    await databaseStore.addUrl(url.value)
    url.value = ''
  }
  const handleEliminar = async (id) => {
    await databaseStore.borrarUrl(id)
  }
  const handleEditar = (id) => {
    router.push(`/editar/${id}`)
  }
</script>
