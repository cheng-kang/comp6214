<template>
  <div class="container">
    <nav-bar />
    <banner
      title="Baby Name @UK"
      subtitle="Find out more about baby names in the UK."
    />
    <section class="section">
      <div class="field has-addons">
        <p class="control is-expanded">
          <input class="input" type="text" v-model="name" placeholder="Type in your name">
        </p>
        <p class="control">
          <router-link :to="'/name/'+name" class="button">
            Explore
          </router-link>
        </p>
      </div>
    </section>
    <section class="section">
      <div class="columns">
        <div class="column" v-for="(page, index) in pages" :key="index">
          <div class="card">
            <div class="card-content">
              <router-link :to="page.link">{{page.title}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
export default {
  name: 'home-page',
  components: {
    NavBar, Banner
  },
  data () {
    return {
      name: '',
      pages: [
        {
          link: '/more-popular-names',
          title: 'Most popular names!'
        },
        {
          link: '/is-more',
          title: 'Is my name more English/Scottish...?'
        },
        {
          link: '/meaning',
          title: 'What\'s the meaning of my name?'
        },
        {
          link: '/rank-my-name',
          title: 'Rank my name!'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style: none;
}

a {
  color: #42b983;
}

a:hover {
  text-decoration: underline;
}

.card {
  min-height: 300px;
}
</style>
