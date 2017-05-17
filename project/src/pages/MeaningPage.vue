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
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import MobileDetect from 'mobile-detect'
import ResultAndShare from '../components/ResultAndShare'
export default {
  name: 'meaning-page',
  components: {
    NavBar, Banner, ResultAndShare
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
