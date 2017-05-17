<template>
  <div id="app">
    <router-view></router-view>
    <footer class="footer" style="padding: 3rem 1.5rem 2rem 1.5rem;">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Baby Name @UK</strong> 
            <br>
            <small>
            by <a href="#">Fahad Altuwaijri </a>, <a href="http://chengkang.pw">Kang Cheng </a>, <a href="#">Jeevan Cyriac </a>, <a href="#">Haihan Jiang </a>, <a href="#">Yahya Majrashi </a>. 
            <br>
            The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
            is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
            </small>
          </p>
          <p>
            <a class="icon" href="https://github.com/cheng-kang/comp6214">
              <i class="fa fa-github"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>
    <div class="modal" id="question">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Do you know...?
            </p>
          </header>
          <div class="card-content">
            <div class="content" style="text-align: left;">
              {{questions[id].question}}
              <div class="field">
                <p class="control">
                  <label class="checkbox" v-for="(item, index) in questions[id].options" style="display: block">
                    <input type="radio" name="answer" @click="onSelect(index)">
                    {{item}}
                  </label>
                </p>
              </div>
            </div>
            <div class="notification is-success" v-if="selectedAnswer != null && selectedAnswer == questions[id].answer">
              Excellent! Click the button below to explore more fun facts!
            </div>
            <div class="notification is-warning" v-if="selectedAnswer != null && selectedAnswer != questions[id].answer">
              Emmm...Try again!
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" @click="go">Explore more!</a>
          </footer>
        </div>
      </div>
      <button class="modal-close" @click="closeModal"></button>
    </div>
  </div>
</template>

<script>
import 'bulma/css/bulma.css'

export default {
  name: 'app',
  mounted () {
    this.changeQuestion()
  },
  data () {
    return {
      id: 0,
      selectedAnswer: null,
      questions: [{
        'question': 'Does parents in UK tend to prefer to choose more unpopular or popular names for their children?',
        'options': ['Popular names', 'Unpopular names'],
        'answer': 1
      }, {
        'question': 'From 2010 to 2015, the percentage of top 100 names in England and Wales has?',
        'options': ['Dropped', 'Increased'],
        'answer': 0
      }, {
        'question': 'From 2010 to 2015, the percentage of top 100 names in Scotland has?',
        'options': ['Increased', 'Dropped'],
        'answer': 1
      }, {
        'question': 'From 2010 to 2015, the percentage of top 100 names in Northern Ireland has?',
        'options': ['Dropped', 'Increased'],
        'answer': 0
      }, {
        'question': 'In 2010, the percentage of babies who were named from the top 100 popular names in England and Wales was?',
        'options': ['51%', '41%'],
        'answer': 0
      }, {
        'question': 'In 2010, the percentage of babies who were named from the top 100 popular names in England and Wales was?',
        'options': ['52%', '47%'],
        'answer': 1
      }, {
        'question': 'From 2010 to 2015, the average percentage of babies who were named by one of the top 100 names in England and Wales is?',
        'options': ['49%', '52%'],
        'answer': 0
      }, {
        'question': 'In England and Wales, has the percentage of baby boys increased or decreased from 2010 to 2015?',
        'options': ['Increased', 'Decreased'],
        'answer': 0
      }, {
        'question': 'In England and Wales, has the percentage of baby girls increased or decreased from 2010 to 2015?',
        'options': ['Increased', 'Decreased'],
        'answer': 1
      }, {
        'question': 'In Scotland, the average number of baby boys who were named from top 100 popular names is?',
        'options': ['60%', '51%'],
        'answer': 0
      }, {
        'question': 'In Scotland, the average percentage of baby girls who were named from the top 100 popular is?',
        'options': ['53%', '47%'],
        'answer': 0
      }, {
        'question': 'In Scotland, the average percentage of baby boys who were named from the top 100 popular is?',
        'options': ['57%', '51%'],
        'answer': 0
      }, {
        'question': 'In Scotland, the highest number of births for baby boys was in?',
        'options': ['2011', '2015'],
        'answer': 0
      }, {
        'question': 'In Scotland, the lowest number of births for baby girls was in?',
        'options': ['2011', '2015'],
        'answer': 1
      }, {
        'question': 'In Scotland, has the number of births for babies increased or decreased from 2010 to 2015?',
        'options': ['Decreased', 'Increased'],
        'answer': 0
      }, {
        'question': 'In 2010, which gender had a higher percentage of birth?',
        'options': ['Boys', 'Girls'],
        'answer': 0
      }, {
        'question': 'In 2015, which gender had a higher percentage of birth?',
        'options': ['Girls', 'Boys'],
        'answer': 1
      }, {
        'question': 'In Northern Ireland, which gender has a higher percentage of birth?',
        'options': ['Boys', 'Girls'],
        'answer': 0
      }, {
        'question': 'In Northern Ireland, the average percentage of babies who were named from the top 100 popular is?',
        'options': ['49%', '61%'],
        'answer': 1
      }, {
        'question': 'In Northern Ireland, the highest number of births was in?',
        'options': ['2013', '2011'],
        'answer': 1
      }, {
        'question': 'In Northern Ireland, the gap in the total number of births between 2011 and 2012 was?',
        'options': ['2011', '2013'],
        'answer': 0
      }]
    }
  },
  methods: {
    closeModal () {
      document.getElementById('question').className = 'modal'
      this.changeQuestion()
      const ele = document.getElementsByName('answer')
      for (let i = 0; i < ele.length; i++) {
        ele[i].checked = false
      }
    },
    go () {
      this.closeModal()
      this.$router.replace('/fun-facts')
    },
    onSelect (idx) {
      this.selectedAnswer = idx
    },
    changeQuestion () {
      this.id = Math.floor(Math.random() * this.questions.length)
      this.selectedAnswer = null
    }
  }
}
</script>

<style>
#app {
  font-family: 'Ravi Prakash', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
input {
  font-family: 'Ravi Prakash', cursive;
}
.card-footer-item {
  color: #343434;
}
.emph {
  color: #42b983;
}
.field {
  margin: 10px 10px;
}
label {
  margin-bottom: 10px;
}
.article-content > p {
  margin-bottom: 10px;
}
</style>
