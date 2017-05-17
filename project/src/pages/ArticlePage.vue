<template>
  <div class="container">
    <nav-bar />
    <banner
      title="Articles"
      subtitle="Baby Name @UK"
    />
    <section class="section">
      <div class="columns">
        <div class="column is-8 is-offset-2" style="text-align: left;">
          <router-link :to="'/articles'" class="">Back to Article List</router-link>
          <div class="card">
            <header class="card-header">
              <p class="card-header-title" style="justify-content: center;">
                {{articles[id].title}}
              </p>
            </header>
            <div class="card-content" style="text-align: justify;">
              <p class="subtitle" style="text-align: right;">
                <small style="opacity: 0.9;">
                  by: <a :href="articles[id].url">{{articles[id].author}}</a>
                  <br>
                  {{articles[id].date}}
                </small>
              </p>
              <small v-html="articles[id].content" class="article-content">
              </small>
            </div>
          </div>
          <a v-show="id > 0" class="pagination" @click="page(-1)">Prev</a>
          <a v-show="id < articles.length - 1" class="pagination" @click="page(1)" style="float: right;">Next</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import articles from '../assets/articles'
export default {
  name: 'article-page',
  components: {
    NavBar, Banner
  },
  mounted () {
    this.id = parseInt(this.$route.params.id) - 1 || 1
  },
  data () {
    return {
      id: 0,
      articles: articles
    }
  },
  methods: {
    page (which) {
      this.id += which
      window.location.hash = `#/article/${this.id + 1}`
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
.pagination {
  display: inline-block;
  margin: 5px 10px 0 10px;
}
</style>
