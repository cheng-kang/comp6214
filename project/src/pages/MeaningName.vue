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
    <section class="section">
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
              <small>
              English form of Iohannes, the Latin form of the Greek name Ιωαννης (Ioannes), itself derived from the Hebrew name יוֹחָנָן (Yochanan) meaning "YAHWEH is gracious". The Hebrew form occurs in the Old Testament (spelled Johanan or Jehohanan in the English version), but this name owes its popularity to two New Testament characters, both highly revered saints. The first is John the Baptist, a Jewish ascetic who is considered the forerunner of Jesus. He baptized Jesus and was later executed by Herod Antipas. The second is the apostle John, who is traditionally regarded as the author of the fourth gospel and Revelation. With the apostles Peter and James (his brother), he was part of the inner circle of Jesus.
              <br>
              This name was initially more common among Eastern Christians in the Byzantine Empire, but it flourished in Western Europe after the First Crusade. In England it became extremely popular: during the later Middle Ages it was given to approximately a fifth of all English boys.
              <br>
              The name (in various spellings) has been borne by 21 popes and eight Byzantine emperors, as well as rulers of England, France, Sweden, Denmark, Poland, Portugal, Bulgaria, Russia and Hungary. It was also borne by the poet John Milton (1608-1674), philosopher John Locke (1632-1704), American founding father and president John Adams (1735-1826), and poet John Keats (1795-1821). Famous bearers of the 20th century include author John Steinbeck (1902-1968), assassinated American president John F. Kennedy (1917-1963), and musician John Lennon (1940-1980).
              </small>
            </div>
          </div>
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
export default {
  name: 'meaning-name',
  components: {
    NavBar, Banner, ResultAndShare, VueDisqus
  },
  mounted () {
    this.url = 'http://localhost:8080' + this.$route.fullPath
    this.identifier = window.btoa(this.$route.params.name)
    console.log(this.url)
    console.log(this.identifier)
  },
  data () {
    return {
      name: '',
      url: '',
      identifier: ''
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
      window.location.href = 'http://localhost:8080/#/meaning/' + this.name.toLowerCase()
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
