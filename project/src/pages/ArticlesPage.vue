<template>
  <div class="container">
    <nav-bar />
    <banner
      title="Articles"
      subtitle="Baby Name @UK"
    />
    <section class="section">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <article class="message is-primary" id="msg-box">
            <div class="message-header">
              <p>Do you know...</p>
            </div>
            <div class="message-body">
              Find more about the 
              <router-link to="/fun-facts" class="card-header-title-a">Fun Facts</router-link>
              of baby names @UK!
            </div>
          </article>
        </div>
      </div>
      <div class="columns" v-for="(item, index) in articles">
        <div class="column is-2 is-offset-2 is-hidden-mobile" style="align-self: flex-end;">
          {{item.date || ''}}
        </div>
        <div class="column is-8" style="text-align: left; font-size: 1.2em;white-space: nowrap;text-overflow: ellipsis; overflow: hidden;">
          <span class="is-hidden-tablet">{{index+1}}.</span>
          <router-link :to="`article/${index+1}`" class="card-header-title-a">{{item.title}}</router-link>
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
  name: 'articles-page',
  components: {
    NavBar, Banner
  },
  data () {
    return {
      articles: articles
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
