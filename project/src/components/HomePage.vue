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
          <input class="input" type="text" placeholder="Type in your name">
        </p>
        <p class="control">
          <a class="button">
            Explore
          </a>
        </p>
      </div>
    </section>
    <div class="content">
      <ul>
        <li><router-link to="/is-my-name-common">Is my name more English/Scottish?</router-link></li>
        <li><router-link to="/is-my-name-common">Is my name common?</router-link></li>
        <li><router-link to="/is-my-name-common">What's the meaning of my name?</router-link></li>
        <li>...</li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
import Banner from './Banner'
export default {
  name: 'home-page',
  components: {
    NavBar, Banner
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
</style>
