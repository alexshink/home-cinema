<template>
  <div class="film-view" :class="{'film-view_loading': loading}">
    <div class="film-box" v-if="!loading">
      <p v-if="!filmList.length">Дэээмн, в этом списке пока нет фильмов, го добавлять!</p>

      <div v-else-if="filmsAsList" class="film-list">
        <a v-for="film of filmList"
           :key="film.id"
           :href="'https://www.google.com/search?q=' + film.name + ' кинопоиск'"
           target="_blank"
           class="film-list__item"
           :class="{ 'film-list__item_viewed': film.viewed }
        ">
          {{ film.name }}
        </a>
      </div>

      <div v-else class="film-box__inner">
        <template v-if="!currentRandomFilm">
          <p>Фильмы загружены, пора сделать выбор!</p>
          <div class="film-box__info">
            <div>Фильмов в списке: <i>{{ filmList.length }}</i></div>
            <div>Всего посмотрено: <i>{{ viewedFilmsLength }}</i></div>
          </div>
          <button type="button" class="button" @click="getRandomFilm()">Случайный</button>
        </template>

        <template v-else>
          <input type="text" placeholder="Найти фильм" v-model="searchTerm" class="input-search">
          <div v-show="!changeFilm" class="film-box__item" :class="{'film-box__item_viewed': currentRandomFilm.viewed}">
            <h1 class="film-box__item-title">{{ currentRandomFilm.name }}</h1>
            <div class="film-box__item-poster">
              <img class="film-box__item-image" v-if="currentRandomFilm.poster" :src="currentRandomFilm.poster" alt="" @click="restartRadaPhoto()">
              <div class="rada-photo" v-if="author === 'Нэйт' && showRadaPhoto">
                <img v-if="randomRadaPhotoName" :src="require(`./../assets/rada/${randomRadaPhotoName}`)" alt="">
              </div>
            </div>
          </div>

          <div class="film-box__actions">
            <button v-if="!currentRandomFilm.viewed" type="button" class="button" @click="setAlreadyViewed()">Смотрим этот!</button>
            <button v-else type="button" disabled class="button">Уже просмотрен!</button>
            <button type="button" class="button" @click="getRandomFilm()">Другой ›</button>
          </div>
        </template>
      </div>

      <button type="button" class="button button_theme_secondary" @click="currentUser ? showAddModal = true : showAuthModal = true">Добавить фильм</button>

      <div class="modal" v-if="showAddModal">
        <p class="modal__error" v-if="modalErrorMessage">{{ modalErrorMessage }}</p>
        <div class="modal__form" :class="{ 'modal__form_loading': addInProgress }">
          <input type="text" v-model="filmName" placeholder="Название фильма">
          <input type="text" v-model="filmPoster" placeholder="Ссылка на постер">
          <button type="button" class="button modal__form-submit" @click="addFilm()">Отправить</button>
          <button type="button" class="button modal__form-close" @click="showAddModal = false"></button>
        </div>
      </div>
    </div>

    <div class="modal" v-if="showAuthModal">
      <div class="modal__form" :class="{ 'modal__form_loading': signInProgress }">
        <input type="text" v-model="authEmail" placeholder="Email">
        <input type="password" v-model="authPassword" placeholder="Пароль">
        <button type="button" class="button modal__form-submit" @click="signIn()">Войти</button>
        <button type="button" class="button modal__form-close" @click="showAuthModal = false"></button>
      </div>
    </div>
  </div>
  
  <button v-if="!filmsAsList" type="button" class="button button_theme_secondary" @click="filmsAsList = true">Весь список</button>

</template>

<script>
import { collection, getDocs, query, where, updateDoc, doc, addDoc } from 'firebase/firestore'
import { db } from '../../firebase.js'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { nextTick } from 'vue'

export default {
  name: 'FilmView',

  props: {
    author: {
      required: true, 
      type: String,
      validator(value) {
        return ['Нэйт', 'Алекс'].includes(value)
      }
    }
  },

  data() {
    return {
      filmList: [],
      loading: true,
      currentRandomFilm: null,
      currentUser: getAuth().currentUser,
      showAuthModal: false,
      authEmail: '',
      authPassword: '',
      signInProgress: false,
      showAddModal: false,
      filmName: '',
      filmPoster: '',
      addInProgress: false,
      modalErrorMessage: '',
      radaPhotosNames: [],
      randomRadaPhotoName: null,
      showRadaPhoto: true,
      prevFilm: null,
      searchTerm: '',
      filmsAsList: false
    }
  },

  computed: {
    viewedFilmsLength() {
      return this.filmList.filter(film => film.viewed).length
    }
  },

  methods: {
    async getRandomFilm() {
      const prevFilmId = this.currentRandomFilm?.id
      const randomIndex = Math.floor(Math.random()*this.filmList.length)
      const newRandomFilm = this.filmList[randomIndex]
      
      if ( prevFilmId === newRandomFilm.id ) {
        this.getRandomFilm()
      } else {
        this.currentRandomFilm = null
        this.changeFilm = true
        await nextTick()
        this.changeFilm = false
        this.currentRandomFilm = newRandomFilm
        this.prevFilm = this.currentRandomFilm
        this.getRandomRadaPhoto()
      }
    },

    async setAlreadyViewed() {
      if ( this.checkAuth() ) {
        try {
          await updateDoc(doc(db, 'films', this.currentRandomFilm.id), {
            viewed: true
          })

          this.currentRandomFilm.viewed = true
        } catch ( error ) {
          alert(error)
        }
      }
    },

    async addFilm() {      
      if ( !this.filmName ) {
        this.modalErrorMessage = 'Название фильма обязательное'
        return
      }

      const existingFilm = this.filmList.find(film => film.name === this.filmName)
      if ( existingFilm ) {
        this.modalErrorMessage = 'Фильм с таким названием уже в списке'
        return
      }

      this.addInProgress = true
      try {
        await addDoc(collection(db, 'films'), {
          name: this.filmName,
          author: this.author,
          poster: this.filmPoster,
          viewed: false
        })

        await this.loadFilms()

        this.showAddModal = false
        this.filmName = ''
        this.filmPoster = ''
      } catch ( error ) {
        alert(error)
      } finally {
        this.addInProgress = false
      }
    },

    signIn() {
      if ( !this.authEmail || !this.authPassword ) {
        this.modalErrorMessage = 'Оба поля обязательны'
      }

      this.signInProgress = true
      signInWithEmailAndPassword(getAuth(), this.authEmail, this.authPassword)
        .then((userCredential) => {
          this.currentUser = userCredential.user
          this.showAuthModal = false
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.signInProgress = false
        })
    },

    checkAuth() {
      if ( !this.currentUser ) {
        this.showAuthModal = true
        return false
      }

      return true
    },

    async loadFilms() {
      this.loading = true
      try {
        const DB_QueryByAuthor = query(collection(db, 'films'), where('author', '==', this.author))
        const queryResults = await getDocs(DB_QueryByAuthor)
        this.filmList = []

        queryResults.forEach((doc) => {
          const filmData = doc.data()
          filmData.id = doc.id
          this.filmList.push(filmData)
        })
      } catch ( error ) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    getAllRadaPhotos() {
      const photos = require.context(
        '@/assets/rada',
        false,
        /^.*\.*$/
      )
      this.radaPhotosNames = photos.keys()
    },

    getRandomRadaPhoto() {
      const randomIndex = Math.floor(Math.random()*this.radaPhotosNames.length)
      this.randomRadaPhotoName = this.radaPhotosNames[randomIndex].replace('./', '')
    },

    async restartRadaPhoto() {
      this.showRadaPhoto = false
      await nextTick()
      this.showRadaPhoto = true
    }
  },

  watch: {
    showAuthModal() {
      this.modalErrorMessage = ''
    },
    showAddModal() {
      this.modalErrorMessage = ''
    },
    searchTerm(searchValue) {
      if ( !searchValue ) {
        this.currentRandomFilm = this.prevFilm
      } else {
        const lowerCaseTerm = searchValue.toLowerCase()
        const findFilm = this.filmList.find(film => film.name.toLowerCase().includes(lowerCaseTerm))
        if ( findFilm ) {
          this.currentRandomFilm = findFilm
        }
      }
    }
  },

  mounted() {
    this.getAllRadaPhotos()
    this.loadFilms()
  }
}
</script>

<style scoped>
p {
  margin-bottom: 25px;
}

.film-view {
  position: relative;
  min-height: 50px;
}

.film-view_loading::after {
  content: '';
  position: absolute;
  left: calc(50% - 25px);
  top: calc(50% - 25px);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px dashed #fff;
  animation: loading 1s infinite linear;
}

.film-box__inner {
  margin-bottom: 25px;
}

.film-box__actions .button {
  width: 145px;
}

.film-box__actions .button:not(:last-child) {
  margin-right: 10px;
}

.film-box__item {
  position: relative;
}

.film-box__item_viewed:after {
  content: '';
  position: absolute;
  inset: 0;
  background: url('./../assets/viewed.svg') no-repeat center/80%;
}

.film-box__item-title {
  position: relative;
  z-index: 2;
  font-size: 24px;
}

.film-box__item-poster {
  position: relative;
  width: 300px;
  height: 380px;
  margin: 10px auto 20px;
  overflow: hidden;
}

.film-box__item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.modal {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #400b35, #744e4e);
  z-index: 99;
}

.modal__error {
  margin-top: -40px;
  margin-bottom: 40px;
  height: 0;
  color: #d11744;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: .5px;
}

.modal__form {
  position: relative;
  padding: 25px;
  width: 300px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  background: #0000004f;
  box-shadow: 0 0 11px 0px #0a0a0a;
}

.modal__form input {
  width: 100%;
  border: 1px solid #dedede;
  height: 35px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.modal__form-submit {
  position: relative;
  width: 100%;
}

.modal__form-close {
  width: 25px;
  display: flex;
  height: 25px;
  align-items: center;
  justify-content: center;
  padding: 5px;
  position: absolute;
  right: -35px;
  top: -35px;
  background: #432530 url('../assets/close.svg') no-repeat center/20px;
}

.modal__form-close:focus,
.modal__form-close:hover {
  background: #5b2a3c url('../assets/close.svg') no-repeat center/20px;
}

.modal__form_loading .modal__form-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
}

.modal__form_loading .modal__form-submit::before {
  content: '';
  position: absolute;
  width: 17px;
  height: 17px;
  border: 2px dotted #fff;
  border-radius: 50%;
  animation: loading 1s infinite linear;
}

.film-box__info {
  font-size: 14px;
  margin-bottom: 10px;
}

.film-box__info i {
  color: #ff124b;
  font-weight: 600;
}

.rada-photo {
  width: 100%;
  height: 300px;
  position: absolute;
  bottom: -300px;
  left: 0;
  animation-duration: 2s;
  animation-delay: 1s;
  animation-iteration-count: 2;
  animation-name: radaPhoto;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
}

.rada-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.input-search {
  display: block;
  width: 100%;
  margin: -12px auto 10px;
  color: #d11744;
  box-shadow: 0 0 5px 0px #d11744;
  border-radius: 4px;
  padding: 5px 7px;
  outline: none;
}

.film-list {
  display: flex;
  flex-wrap: wrap;
}

.film-list__item {
  margin-bottom: 10px;
  margin-right: 12px;
  text-decoration: underline;
  text-align: left;
}

.film-list__item_viewed {
  color: green;
}

::placeholder {
  color: #9c1737;
}

@keyframes loading {
  100% {
    transform: rotate(90deg);
  }
}

@keyframes radaPhoto {
  0% {
    bottom: -300px;
  }
  90% {
    bottom: 0;
  }
  100% {
    bottom: 0;
  }
}
</style>
