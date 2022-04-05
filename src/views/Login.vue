<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="ingrese su email" v-model.trim="email" />
      <input
        type="password"
        placeholder="ingrese su contraseña"
        v-model.trim="password"
      />
      <button type="submit" :disabled="userStore.loadingUser">Ingresar</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useRouter } from 'vue-router'

  const userStore = useUserStore()
  const router = useRouter()
  const email = ref('')
  const password = ref('')

  const handleSubmit = async () => {
    if (!email.value || password.value.length < 6) {
      return alert('Por favor ingrese su email y contraseña')
    }
    await userStore.loginUser(email.value, password.value)
    router.push('/')
  }
</script>
