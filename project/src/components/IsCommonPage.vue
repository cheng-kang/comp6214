<template>
  <div class="container">
    <nav-bar />
    <banner
      title="Baby Name @UK"
      subtitle="Is my name a common name in ...?"
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
  </div>
</template>

<script>
import NavBar from './NavBar'
import Banner from './Banner'
export default {
  name: 'is-common-page',
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
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

a:hover {
  text-decoration: underline;
}
</style>
