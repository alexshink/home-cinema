<template>
  <div class="page" :class="{'page_auth-loading': authLoading}">
    <div class="container">
      <img alt="Home Cinema" src="./assets/logo.jpg" class="page__logo">

      <div class="page__inner" v-if="!activeUserFilmList">
        <button type="button" class="button" @click="loadFilms('Нэйт')">Нэйт</button>
        <button type="button" class="button" @click="loadFilms('Алекс')">Алекс</button>
      </div>

      <div class="page__inner" v-if="activeUserFilmList">
        <FilmView v-if="activeUserFilmList" :author="activeUserFilmList" />
        <button type="button" class="button button_theme_secondary" @click="goBack">Назад</button>
      </div>
    </div>

    <footer class="footer" v-if="currentUser">
      <div class="container">
        <div class="user-email">{{ currentUser?.email }}</div>
      </div>
    </footer>
  </div>
</template>

<script>
  import FilmView from './components/FilmView.vue'
// import { collection, getDocs, addDoc } from "firebase/firestore"; 
// import { db } from '../firebase.js'
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
  name: 'App',

  components: {
    FilmView
  },

  data() {
    return {
      films: [],
      activeUserFilmList: null,
      currentUser: null,
      authLoading: true
    }
  },

  methods: {
    loadFilms(authorName) {
      this.activeUserFilmList = authorName;
    },

    goBack() {
      this.activeUserFilmList = null
    }
  },

  async mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if ( user ) {
        this.currentUser = user
      }

      this.authLoading = false
    })
  }

  // async mounted() {
  //   const querySnapshot = await getDocs(collection(db, "films"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.data());
  //   })

  //   try {
  //     const docRef = await addDoc(collection(db, "films"), {
  //       name: "Тест",
  //       author: "Нэйт",
  //       viewed: false,
  //       poster: null
  //     });

  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  box-sizing: border-box;
  color: inherit;
  font-family: inherit;
}

img {
  max-width: 100%;
}

body {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background: #400b35;
}

.page_auth-loading .page__inner {
  opacity: 0;
}

.page_auth-loading .page__logo {
  transform: scale(4.5) translateY(50px);
  transition: transform 2s;
}

.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 0 15px;
}

.page__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity .2s 3s;
}

.page__inner > *:not(:last-child) {
  margin-bottom: 10px;  
}

button {
  cursor: pointer;
}

.button {
  background: #d11744;
  border-radius: 4px;
  width: 170px;
  padding: 10px 10px;
  transition: .2s;
}

.button:focus,
.button:hover {
  background: #e7325e;
}

.button_theme_secondary {
  background: none;
  border: 1px solid #d11744;
}

.button[disabled] {
  filter: grayscale(100%);
  pointer-events: none;
}

.page__logo {
  width: 80px;
  margin-bottom: 10px;
  user-select: none;
  -webkit-user-drag: none;
  transition: transform 3s;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  padding-bottom: 10px;
  font-size: 10px;
}
</style>
