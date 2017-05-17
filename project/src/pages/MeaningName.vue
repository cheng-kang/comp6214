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
    <section class="section" v-show="!noMeaning && !noMore()">
      <h1 class="title is-5"><strong>{{this.$route.params.name.toUpperCase()}}</strong>, let's see the result:</h1>
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Meaning & History
              </p>
            </header>
            <div class="card-content" style="text-align: justify;">
              <p class="subtitle">
                <strong>{{this.$route.params.name.toUpperCase()}}</strong>
              </p>
              <small v-html="content"></small>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section" v-show="!noMeaning && noMore()">
      <h1 class="title is-5"><strong>{{this.$route.params.name.toUpperCase()}}</strong>, let's see the result:</h1>
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                More information about the name
              </p>
            </header>
            <div class="card-content" style="text-align: justify;">
              <p class="subtitle">
                <strong>{{this.$route.params.name.toUpperCase()}}</strong>
              </p>
                <figure>
                  <img :src="moreset[name].image" style="float:right"/>
                  <figcaption style="float:right">{{moreset[name].Description}}</figcaption>
                </figure>
              <p>Gender: {{moreset[name].Gender}}<p>
              <p>Pronounced in English: {{moreset[name]['Pronounced in English']}}</p>
              <small v-html="content"></small>
            </div>
          </div>
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
    <section>
        <vue-disqus shortname="babyname-1" :identifier="identifier" :url="url"></vue-disqus>
    </section>
    <section class="section" :class="{ isMobile: isMobile}">
      <result-and-share>
        {{this.$route.params.name.toUpperCase()}}, share your name on
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
import VueDisqus from 'vue-disqus/VueDisqus.vue'
import meanset from '../assets/nameMeanings.js'
import moreset from '../assets/moreInfo.js'
export default {
  name: 'meaning-name',
  components: {
    NavBar, Banner, ResultAndShare, VueDisqus
  },
  beforeMount () {
    this.url = 'http://localhost:8080' + this.$route.fullPath
    this.identifier = window.btoa(this.$route.params.name)
    this.content = meanset[this.$route.params.name]
    this.name = this.$route.params.name
    let nameLowerCase = this.name.toLowerCase()
    var findMean = Object.keys(meanset).filter(function (n) {
      return n === nameLowerCase
    })
    if (findMean.length === 0) {
      this.noMeaning = true
    } else {
      this.noMeaning = false
    }
  },
  data () {
    return {
      name: '',
      url: '',
      identifier: '',
      content: '',
      noMeaning: true,
      moreset: moreset
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
    },
    noMore () {
      console.log(this.$route.params.name)
      console.log(Object.keys(moreset))
      console.log(Object.keys(moreset).indexOf(this.$route.params.name) > 0)
      return Object.keys(moreset).indexOf(this.$route.params.name) > 0
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
