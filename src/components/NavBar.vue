<template>
  <nav class="nav">
      <div class="nav-left">
        <router-link to="/" class="nav-item">
          <img src="../assets/logo1.png" alt="Bulma logo">
        </router-link>
      </div>

      <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
      <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
      <span class="nav-toggle">
        <span></span>
      </span>

      <!-- This "nav-menu" is hidden on mobile -->
      <!-- Add the modifier "is-active" to display it on mobile -->
      <div class="nav-right nav-menu">
        <router-link to="/" class="nav-item">Home</router-link>
      </div>
  </nav>
</template>

<script>

export default {
  name: 'nav-bar',
  component: {

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
