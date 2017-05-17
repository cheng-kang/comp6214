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
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
export default {
  name: 'is-common-page',
  components: {
    NavBar, Banner
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
