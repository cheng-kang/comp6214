<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <div class="trend">
        <trend
          :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
          :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
          auto-draw
          smooth>
        </trend>
      </div>
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
.trend {
  position: absolute;
  top: 6rem;
  left: 0;
  width: 100%;
}
</style>
