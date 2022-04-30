import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
} from 'firebase/firestore/lite'
import { defineStore } from 'pinia'
import { auth, db } from '../firebaseConfig'
import { nanoid } from 'nanoid'

export const useDatabaseStore = defineStore('dataBase', {
  state: () => ({
    documents: [],
    loadingDoc: false,
  }),
  actions: {
    async getUrls() {
      this.loadingDoc = true
      try {
        if (this.documents.length !== 0) {
          return
        }
        const q = query(
          collection(db, 'url'),
          where('user', '==', auth.currentUser.uid)
        )
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          this.documents.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async addUrl(name) {
      this.loadingDoc = true
      try {
        const objetoDoc = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser.uid,
        }
        const docRef = await addDoc(collection(db, 'url'), objetoDoc)
        this.documents.push({
          id: docRef.id,
          ...objetoDoc, // desestructuramos el objeto
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async updateUrl(id, name) {
      this.loadingDoc = true
      try {
        const docRef = doc(collection(db, 'url'), id)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists) {
          throw new Error('No existe el documento')
        }
        if (docSnap.data().user == auth.currentUser.uid) {
          await updateDoc(docRef, { name })
          this.documents = this.documents.map(
            (item) => (item.id === id ? { ...item, name } : item) // si el item es el que queremos actualizar, lo actualizamos  con el nuevo nombre y si no, lo mantenemos
          )
        } else {
          throw new Error('Este documento no te pertenece')
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loadingDoc = false
      }
    },
    async leerUrl(id) {
      try {
        const docRef = doc(collection(db, 'url'), id)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists) {
          throw new Error('No existe el documento')
        }
        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error('Este documento no te pertenece')
        }
        return docSnap.data().name
      } catch (error) {
        console.log(error.message)
      } finally {
      }
    },
    async borrarUrl(id) {
      try {
        const docRef = doc(db, 'url', id)

        const docSnap = await getDoc(docRef)
        if (!docSnap.exists) {
          throw new Error('No existe el documento')
        }
        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error('Este documento no te pertenece')
        }
        await deleteDoc(docRef)
        this.documents = this.documents.filter((item) => item.id !== id)
      } catch (error) {
        console.log(error.message)
      } finally {
      }
    },
  },
})
