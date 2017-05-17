<template>
  <div class="container">
    <nav-bar />
    <banner
      title="What's the meaning of my name?"
      subtitle="Baby Name @UK"
    />
    <section class="section">
      <div class="field has-addons">
        <p class="control is-expanded">
          <input class="input" type="text" placeholder="Type in your name" v-model="name" @change="onChange()">
        </p>
        <p class="control">
          <a class="button">
            Explore
          </a>
        </p>
      </div>
    </section>
    <section class="section no-top-padding" :class="{ isMobile: isMobile }" v-show="name === ''">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <article class="message is-primary" id="msg-box">
            <div class="message-header">
              <p>Find more about my name</p>
            </div>
            <div class="message-body">
              Type in your name in the search box above!
            </div>
          </article>
        </div>
      </div>
    </section>
    <section class="section no-top-padding" :class="{ isMobile: isMobile }" v-show="name !== '' && noMeaning">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <article class="message is-warning" id="msg-box">
            <div class="message-header">
              <p>Name Not Found</p>
            </div>
            <div class="message-body" style="text-align: left;">
              Sorry {{name.toUpperCase()}}, there is no further information about the name.
              <br>
              <small>
                Try this page <a href="#">Find my name</a> and explore more about your name!
              </small>
            </div>
          </article>
        </div>
      </div>
    </section>
    <section class="section" :class="{ isMobile: isMobile}">
      <result-and-share>
        {{name.toUpperCase()}}, share your name on
        <br> 
        <br>
      </result-and-share>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import MobileDetect from 'mobile-detect'
import ResultAndShare from '../components/ResultAndShare'
import meanset from '../assets/nameMeanings'
export default {
  name: 'meaning-page',
  components: {
    NavBar, Banner, ResultAndShare
  },
  watch: {
    name () {
      const nameLowerCase = this.name.toLowerCase()
      const findMean = Object.keys(meanset).filter(function (n) {
        return n === nameLowerCase
      })
      if (findMean.length === 0 || findMean[0] === '') {
        this.noMeaning = true
      } else {
        this.noMeaning = false
      }
    }
  },
  data () {
    return {
      name: ''
    }
  },
  computed: {
    isMobile () {
      const md = new MobileDetect(window.navigator.userAgent)
      return md.mobile() !== null
    }
  },
  methods: {
    onChange () {
      if (this.noMeaning === false) {
        window.location.href = 'http://localhost:8080/#/meaning/' + this.name.toLowerCase()
        window.location.reload()
      }
      // this.$router.push({name: 'meaning-name', params: {name: this.name.toLowerCase()}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  text-align: left;
}
.isMobile {
  padding-top: 0;
}
header {
  background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(/static/img/wc.49b40f9.png);
  display: block;
  background-size: cover;
  background-position: center;
}
</style>
