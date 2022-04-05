<template>
  <div>
    <h1>App base</h1>
    <nav v-if="!userStore.loadingSesion">
      <router-link v-if="userStore.userData" to="/">Home</router-link> |
      <router-link v-if="!userStore.userData" to="/login"> Login |</router-link>
      <router-link v-if="!userStore.userData" to="/register">
        Register |</router-link
      >
      <button v-if="userStore.userData" @click.prevent="handleSalir">
        Logout
      </button>
    </nav>
    <div v-else>Cargando usuario.....</div>
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { useUserStore } from './stores/user'
  import { useRouter } from 'vue-router'

  const userStore = useUserStore()
  const router = useRouter()

  const handleSalir = async () => {
    await userStore.logoutUser()
    router.push('/login')
  }
</script>
