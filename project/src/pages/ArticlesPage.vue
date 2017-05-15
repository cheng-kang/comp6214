<template>
  <div class="container">
    <nav-bar />
    <banner
      title="Articles"
      subtitle="Baby Name @UK"
    />
    <section class="section">
      <div class="columns" v-for="item in articles">
        <div class="column is-2 is-offset-2 is-hidden-mobile" style="align-self: flex-end;">
          {{item.date}}
        </div>
        <div class="column is-8" style="text-align: left; font-size: 1.2em;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;">
          <span class="is-hidden-tablet">{{item.id}}.</span>
          <router-link :to="`article/${item.id}`" class="card-header-title-a">{{item.title}}</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
export default {
  name: 'articles-page',
  components: {
    NavBar, Banner
  },
  data () {
    return {
      articles: [
        {
          title: 'Fun facts about baby names!',
          id: 1,
          date: '2017-05-13'
        },
        {
          title: 'Fun facts about baby names in the UK!',
          id: 2,
          date: '2017-05-03'
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
.columns {
  margin-bottom: 0;
}
</style>
