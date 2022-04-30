import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useDatabaseStore } from '../stores/database'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: 'Bluuweb@test.com',
    loadingUser: false,
    loadingSesion: false,
  }),

  actions: {
    setUserData(payload) {
      this.userData = payload
    },
    async registerUser(email, password) {
      this.loadingUser = true

      try {
        await createUserWithEmailAndPassword(auth, email, password)
        // this.userData = { email: user.email, uid: user.uid }
        await sendEmailVerification(auth.currentUser)
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingUser = false
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true

      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        // if (user && user.emailVerified) {
        if (user) {
          this.userData = { email: user.email, uid: user.uid }
        } else {
          await this.logoutUser()
          alert('verifique su correo')
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingUser = false
      }
    },
    async logoutUser() {
      const useData = useDatabaseStore()
      useData.$reset()
      await signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.userData = null
        })
        .catch((error) => {
          // An error happened.
        })
    },
    currentUser() {
      const useData = useDatabaseStore()
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = { email: user.email, uid: user.uid }
            } else {
              this.userData = null
              useData.$reset()
            }
            resolve(user)
          },
          (e) => reject(e)
        )
        unsuscribe()
      })
    },
    getters: {
      minusculas(state) {
        return state.userData.toLowerCase()
      },
      mayusculas(state) {
        return state.userData.toUpperCase()
      },
    },
  },
})
