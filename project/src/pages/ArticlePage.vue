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
                {{article.title}}
              </p>
            </header>
            <div class="card-content" style="text-align: justify;">
              <p class="subtitle" style="text-align: right;">
                <small style="opacity: 0.9;">{{article.date}}</small>
              </p>
              <small>
              {{article.content}}
              </small>
            </div>
          </div>
          <a v-show="id > 1" :href="`/#/article/${parseInt(id)-1}`" class="pagination">Prev</a>
          <router-link v-show="id < count" :to="`/article/${parseInt(id)+1}`" class="pagination" style="float: right;" replace>Next</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
export default {
  name: 'article-page',
  components: {
    NavBar, Banner
  },
  mounted () {
    this.id = this.$route.params.id
  },
  data () {
    return {
      id: 0,
      count: 2,
      article: {
        title: 'Fun facts about baby names!',
        id: 1,
        date: '2017-05-13',
        content: '5. Moxie CrimeFighter and Zolten\nIllusionist Penn Jillette isn\'t fooling anyone with the unusual names for his kids: Moxie CrimeFighter and Zolten. Do you think Zolten is a CrimeFighter with Moxie?\n4. Pilot Inspektor\nSome things just aren\'t intended to be names. Sometimes, if you want to choose an unusal name, it\'s better to balance it with a more traditional name. Of course, Jason Lee and Beth Riesgraf didn\'t get that memo when they named Pilot Inspektor.\n3. Kal-El\nSuperman has a fan in Nicolas Cage, who named his son Kal-El, which is the first name of the Man of Steel.\n2. Jermajesty\nJerm-Jerma... no, no, no. This name is pronounced like Her Majesty, but with a J at the start of it. That one comes from parents Jermaine Jackson and Alejandra Genevieve Oaziaza. \'Nuff said.\n1. Moon Unit, Dweezil and Diva Muffin\nYou can\'t have a list of unusual celebrity baby names without mentioning the kids of Frank Zappa: Moon Unit, Dweezil and Diva Muffin. The man (in the photo above with "Valley Girl" singer Moon Unit) is a pioneer in the naming division, for sure.\n'
      }
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
