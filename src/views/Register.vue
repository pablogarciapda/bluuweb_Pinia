<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
      <input
        type="email"
        placeholder="registre su email"
        v-model.trim="email"
      />
      <input
        type="password"
        placeholder="registre su contraseña"
        v-model.trim="password"
      />
      <button type="submit" :disabled="!userStore.loginUser">
        Registrarse
      </button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const userStore = useUserStore()
  const email = ref('')
  const password = ref('')

  const handleSubmit = async () => {
    if (!email.value || password.value.length < 4) {
      return alert('Por favor ingrese su email y contraseña')
    }

    await userStore.registerUser(email.value, password.value)

    router.push('/login')
  }
</script>
