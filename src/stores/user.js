import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebaseConfig'

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
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        this.userData = { email: user.email, uid: user.uid }
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
        this.userData = { email: user.email, uid: user.uid }
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingUser = false
      }
    },
    async logoutUser() {
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
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = { email: user.email, uid: user.uid }
            } else {
              this.userData = null
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
