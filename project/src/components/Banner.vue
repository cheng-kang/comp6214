<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
        {{title}}
        </h1>
        <h2 class="subtitle">
          {{subtitle}}
        </h2>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'banner',
  props: ['title', 'subtitle'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
