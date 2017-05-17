<template>
  <section class="hero is-medium">
    <div class="hero-body">
<!--       <div class="trend">
        <trend
          :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
          :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
          auto-draw
          smooth>
        </trend>
      </div> -->
      <div class="container">
        <h1 class="title">
        {{title}}
        </h1>
        <h2 class="subtitle">
          {{subtitle}}
        </h2>
      </div>
      <img src="../assets/funfacts.png" alt="Fun Facts" class="funfact" @click="activateModal" v-show="$route.path != '/fun-facts'">
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
  },
  methods: {
    activateModal () {
      document.getElementById('question').className = 'modal is-active'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  font-size: 4.5rem;
}
.trend {
  position: absolute;
  top: 6rem;
  left: 0;
  width: 100%;
}
.hero-body {
  background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(../assets/wc.png);
  display: block;
  background-size: cover;
  background-position: center;
  z-index: 10;
  position: relative;
}
.container {
  z-index: 99;
}

.funfact {
  position: absolute;
  width: 150px;
  right: 0;
  bottom: 0;
  -ms-transform: rotate(-30deg); /* IE 9 */
  -webkit-transform: rotate(-30deg); /* Chrome, Safari, Opera */
  transform: rotate(-30deg);
}
.funfact:hover {
  width: 170px;
  cursor: pointer;
}
</style>
