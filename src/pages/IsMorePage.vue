<template>
  <div class="container">
    <nav-bar />
    <banner
      title="Is my name more English/Scottish...?"
      subtitle="Baby Name @UK"
    />
    <section class="section">
      <div class="field has-addons">
        <p class="control">
          <span class="select">
            <select v-model="selectedYear">
              <option>2010</option>
              <option>2011</option>
              <option>2012</option>
              <option>2013</option>
              <option>2014</option>
              <option>2015</option>
            </select>
          </span>
        </p>
        <p class="control is-expanded">
          <input class="input" type="text" v-model="name" placeholder="Type in your name" @change="onChange">
        </p>
        <p class="control">
          <a class="button">
            Explore
          </a>
        </p>
      </div>
    </section>
    <section class="section">
      <h1 class="title is-5"><strong>{{name}}</strong>, let's see your result:</h1>
      <div class="columns">
        <div class="column is-5 is-offset-1">
          <div class="card">
            <div class="card-content">
              <IEcharts :option="bar" :loading="loading" :highlight="highlight" :refreshHighlight="refreshHighlight" @ready="onReady"></IEcharts>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item">
                <img :src="`/static/Flag_${info.area[highlight]}.png`" width="30">
              </div>
            </footer>
          </div>
        </div>
        <div class="column is-5">
          <div class="content">
            <div class="message is-info">
              <div class="message-body">
              How we get this result?
              <br>
              <div style="text-align: left; font-size: 0.7em">
                  Ranked by "population of people have the name of the area" / "population of the area".
                  <br>
                  <span style="font-size: 0.9em">Note: the result is calculated from <strong>only top 100</strong> baby names in the UK.</span>
              </div>
              </div>
            </div>
            <h4>Percentages</h4>
            <nav class="level">
              <div 
              class="level-item has-text-centered"
              v-for="i in [0, 1, 2, 3]"
              :key="i"
              >
                <div>
                  <p class="heading" :class="{ 'highlight': i === highlight }">{{info.people[i]}}</p>
                  <p class="title" :class="{ 'highlight': i === highlight }">{{info.p[i]}}%</p>
                </div>
              </div>
            </nav>
            <table style="font-size: 0.8em; color: #585858;">
              <tr>
                <th>Data of {{year}}</th>
                <th>PN*</th>
                <th>TP*</th>
              </tr>
              <tr
                v-for="i in [0, 1, 2, 3]"
                :key="i"
              >
                <td>{{info.area[i]}}</td>
                <td>{{formatWithComma(info.pn[i])}}</td>
                <td>{{formatWithComma(info.tp[i])}}</td>
              </tr>
            </table>
            <div class="notification" style="text-align: left; font-size: 0.6em;">
              *PN: 'Population of babies using the Name'
              <br>
              *TP: 'Total Population of babies'
            </div>
          </div>
        </div>
        <div class="column">
        </div>
      </div>
    </section>
    <section class="section" :class="{ isMobile: isMobile}">
      <img :src="`/static/like_${gender}.png`" :class="{ notLiked: notLiked }" alt="Like the page!" width="100" @click="toggleLike">
      <p>{{likes}} likes</p>
      <p v-show="!notLiked">👶 Great! Share this page with your friends now! ⤵️</p>
    </section>
    <section class="section" :class="{ isMobile: isMobile}">
      <result-and-share>
        {{name.toUpperCase()}}, your name is more <span style="text-transform: uppercase;">{{info.people[highlight]}}</span>!
        <br> 
        <br>
      </result-and-share>
    </section>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.vue'
import MobileDetect from 'mobile-detect'
import numeral from 'numeral'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import ResultAndShare from '../components/ResultAndShare'
import totals from '../assets/totals'
import dataset from '../assets/dataset'
import { db } from '../components/firebase'

export default {
  name: 'is-more-page',
  components: {
    NavBar, Banner, IEcharts, ResultAndShare
  },
  mounted () {
    const cards = document.getElementsByClassName('card-content')
    for (let i = 0; i < cards.length; i++) {
      console.log(cards[i])
      let computedStyle = window.getComputedStyle(cards[i])
      cards[i].style.width = computedStyle.width
      cards[i].style.height = computedStyle.width
      // cards[i].style.height = (parseInt(computedStyle.width) + 100) + 'px'
    }

    this.selectedYear = 2010
    this.name = 'john'
    if (this.$cookie.get('liked')) {
      this.notLiked = false
    }
  },
  data () {
    return {
      name: '',
      gender: 'M',
      year: 2016,
      selectedYear: 0,
      info: {
        area: ['England', 'Scotland', 'Wales', 'N-Ireland'],
        people: ['English', 'Scottish', 'Welsh', 'N-Irish'],
        tp: [null, null, null, null],
        pn: [null, null, null, null],
        p: [0, 0, 0, 0],
        pp: [0, 0, 0, 0]
      },
      loading: true,
      highlight: 0,
      refreshHighlight: -1,
      notLiked: true,
      likes: 0,
      dataRef: null
    }
  },
  watch: {
    selectedYear () {
      this.info.tp = [
        totals[`England${this.selectedYear}`],
        totals[`Scotland${this.selectedYear}`],
        totals[`Wales${this.selectedYear}`],
        totals[`N-Ireland${this.selectedYear}`]
      ]
      this.onChange()
    },
    highlight () {
      console.log(IEcharts)
    }
  },
  computed: {
    isMobile () {
      const md = new MobileDetect(window.navigator.userAgent)
      return md.mobile() !== null
    },
    bar () {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{b} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: [
            'England\n' + this.formatWithUnit(this.info.pn[0]),
            'Scotland\n' + this.formatWithUnit(this.info.pn[1]),
            'Wales\n' + this.formatWithUnit(this.info.pn[2]),
            'N-Ireland\n' + this.formatWithUnit(this.info.pn[3])
          ]
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 30,
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: this.info.p[0], name: 'England\n' + this.formatWithUnit(this.info.pn[0]), emphasis: true},
              {value: this.info.p[1], name: 'Scotland\n' + this.formatWithUnit(this.info.pn[1])},
              {value: this.info.p[2], name: 'Wales\n' + this.formatWithUnit(this.info.pn[2])},
              {value: this.info.p[3], name: 'N-Ireland\n' + this.formatWithUnit(this.info.pn[3])}
            ]
          }
        ],
        textStyle: {
          fontFamily: 'Ravi Prakash',
          fontSize: 20
        }
      }
    }
  },
  methods: {
    onReady (instance) {
      this.loading = false
    },
    onChange () {
      this.loading = true
      this.info.pn = this.findName(dataset, this.name, this.selectedYear)
      this.recalculate()
      const that = this
      if (this.dataRef) {
        this.dataRef.off('value')
      }
      this.dataRef = db.ref(`likes/${this.name}`)
      this.dataRef.on('value', function (snapshot) {
        if (snapshot.val()) {
          that.likes = parseInt(snapshot.val())
        } else {
          that.likes = 0
        }
      })
    },
    toggleLike () {
      this.notLiked = !this.notLiked
      if (this.notLiked) {
        this.$cookie.delete('liked')
      } else {
        this.$cookie.set('liked', true, 365)
      }
      const that = this
      db.ref(`likes/${this.name}`).once('value').then(function (snapshot) {
        const likes = parseInt(snapshot.val()) || 0
        db.ref(`likes/${that.name}`).set(likes + (that.notLiked ? -1 : 1))
      })
    },
    recalculate () {
      let totalP = 0
      for (let i = 0; i < 4; i++) {
        this.info.pp[i] = (parseInt(this.info.pn[i])) * 100.0 / parseInt(this.info.tp[i])
        if (isNaN(this.info.pp[i])) {
          this.info.pp[i] = 0
        }
        totalP += this.info.pp[i]
      }
      let max = 0
      for (let i = 0; i < 4; i++) {
        this.info.p[i] = parseInt(this.info.pp[i] / totalP * 100)
        if (this.info.p[i] > this.info.p[max]) {
          max = i
        }
      }

      this.highlight = max
      this.refreshHighlight += 1
      this.loading = false
    },
    formatWithComma (n) {
      return numeral(n).format(0)
    },
    formatWithUnit (n) {
      return numeral(n).format('0a')
    },
    findName (data, name, year) {
      var nameData = data.filter(function (d) {
        return d.name === name.toLowerCase() && d.year === parseInt(year)
      })

      console.log(nameData)

      // Count array respectively for England, Wales, Scotland, Northern Ireland
      var nameCount = [null, null, null, null]
      for (var i = 0; i < nameData.length; i++) {
        switch (nameData[i].country) {
          case 'England':
            nameCount[0] = nameData[i].count
            this.gender = nameData[i].gender
            break
          case 'Wales':
            nameCount[2] = nameData[i].count
            this.gender = nameData[i].gender
            break
          case 'Scotland':
            nameCount[1] = nameData[i].count
            this.gender = nameData[i].gender
            break
          case 'NorthernIreland':
            nameCount[3] = nameData[i].count
            this.gender = nameData[i].gender
        }
      }
      return nameCount
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tag {
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  max-width: 100%;
  position: relative;
}
.title {
  text-align: left;
}

th {
  color: #585858;
}
.notification {
  padding: 0.5rem 1rem 0.5rem 1rem;
}
.highlight.heading {
  color: #22509a;
}
.highlight.title {
  color: #3273dc;
}
.isMobile {
  padding-top: 0;
}
.notLiked {
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
}
</style>
