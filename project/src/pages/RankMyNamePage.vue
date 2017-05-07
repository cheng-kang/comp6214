<template>
  <div class="container">
    <nav-bar />
    <banner
      title="Baby Name @UK"
      subtitle="Rank My Name!"
    />
    <section class="section">
      <div class="field has-addons">
        <p class="control is-expanded">
          <input class="input" id="name-input" type="text" v-model="name" placeholder="Type in your name" @change="onChange($event)">
        </p>
        <p class="control">
          <a class="button">
            Explore
          </a>
        </p>
      </div>
      <div class="content">
        <span 
          class="tag"
          v-for="item in matches"
          @click="clickOnTag(item)"
        >
          {{item}}
        </span>
      </div>
    </section>
    <section class="section" :class="{ isMobile: isMobile }" v-show="name !== ''">
      <h1 class="title is-5"><strong>{{name.toUpperCase()}}</strong>, let's see your result:</h1>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="card" id="card-box">
            <div class="card-content" id="card">
              <IEcharts :option="line" :loading="loading" @ready="onReady" v-if="name !== ''"></IEcharts>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
      <div class="container content">
        <table style="font-size: 0.8em">
          <tr>
            <th></th>
            <th>2010</th>
            <th>2011</th>
            <th>2012</th>
            <th>2013</th>
            <th>2014</th>
            <th>2015</th>
          </tr>
          <tr
            v-for="(which, index) in [engRank, scoRank, walRank, ireRank]"
            :key="index"
          >
            <td>{{area[index]}}</td>
            <td
              v-for="(item, idx) in which"
              :key="idx"
            >
              {{item === null ? '-' : item}}
            </td>
          </tr>
        </table>
      </div>
        </div>
      </div>
    </section>
    <section class="section" :class="{ isMobile: isMobile }" v-show="name === ''">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <article class="message is-primary" id="msg-box">
            <div class="message-header">
              <p>Rank My Name</p>
            </div>
            <div class="message-body">
              Type in your name in the search box above!
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.vue'
import MobileDetect from 'mobile-detect'
import dataset from '../assets/dataset'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
export default {
  name: 'rank-my-name-page',
  components: {
    NavBar, Banner, IEcharts
  },
  mounted () {
    const card = document.getElementById('card')
    const msgBox = document.getElementById('msg-box')
    const cardBox = document.getElementById('card-box')
    if (this.name === '') {
      let msgBoxStyle = window.getComputedStyle(msgBox)
      if (this.isMobile) {
        const newWidth = (parseInt(msgBoxStyle.width) - 40) + 'px'
        card.style.width = newWidth
        card.style.height = newWidth
        cardBox.style.width = newWidth
        cardBox.style.height = newWidth
      } else {
        card.style.width = msgBoxStyle.width
        card.style.height = msgBoxStyle.width
      }
    } else {
      let cardStyle = window.getComputedStyle(card)
      card.style.width = cardStyle.width
      card.style.height = cardStyle.width
    }

    this.renderChart()
  },
  data () {
    return {
      name: '',
      matches: [],
      area: ['England', 'Scotland', 'Wales', 'N-Ireland'],
      loading: true,
      engRank: [],
      scoRank: [],
      walRank: [],
      ireRank: []
    }
  },
  computed: {
    isMobile () {
      const md = new MobileDetect(window.navigator.userAgent)
      return md.mobile() !== null
    },
    names () {
      return dataset.map((item) => {
        return item.name
      })
    },
    line () {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['England', 'Scotland', 'Wales', 'Northern Ireland']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2010', '2011', '2012', '2013', '2014', '2015'],
          name: 'Year',
          axisLine: {
            onZero: false
          }
        },
        yAxis: {
          type: 'value',
          name: 'Rank',
          nameLocation: 'middle',
          nameGap: 25,
          inverse: true
        },
        series: [{
          name: 'England',
          type: 'line',
          data: this.engRank,
          markPoint: {
            data: [{
              type: 'max',
              name: 'Lowest rank'
            },
            {
              type: 'min',
              name: 'Highest rank'
            }]
          },
          markLine: {
            data: [{
              type: 'average',
              name: 'Average rank'
            }]
          }
        },
        {
          name: 'Scotland',
          type: 'line',
          data: this.scoRank,
          markPoint: {
            data: [{
              type: 'max',
              name: 'Lowest rank'
            },
            {
              type: 'min',
              name: 'Highest rank'
            }]
          },
          markLine: {
            data: [{
              type: 'average',
              name: 'Average rank'
            }]
          }
        },
        {
          name: 'Wales',
          type: 'line',
          data: this.walRank,
          markPoint: {
            data: [{
              type: 'max',
              name: 'Lowest rank'
            },
            {
              type: 'min',
              name: 'Highest rank'
            }]
          },
          markLine: {
            data: [{
              type: 'average',
              name: 'Average rank'
            }]
          }
        },
        {
          name: 'Northern Ireland',
          type: 'line',
          data: this.ireRank,
          markPoint: {
            data: [{
              type: 'max',
              name: 'Lowest rank'
            },
            {
              type: 'min',
              name: 'Highest rank'
            }]
          },
          markLine: {
            data: [{
              type: 'average',
              name: 'Average rank'
            }]
          }
        }]
      }
    }
  },
  watch: {
    name () {
      this.renderChart()

      const nameLowerCase = this.name.toLowerCase()
      const nameLength = nameLowerCase.length

      var matches = new Set()
      if (nameLength !== 0) {
        for (let i = 0; i < this.names.length; i++) {
          if (this.names[i].substring(0, nameLength) === nameLowerCase) {
            matches.add(this.names[i])
          }
        }
      }
      if (matches.size !== 1) {
        this.matches = [...matches].slice(0, 10)
      } else {
        this.matches = []
      }
    }
  },
  methods: {
    onReady (instance) {
      this.loading = false
    },
    onChange () {
    },
    clickOnTag (item) {
      this.name = item
    },
    renderChart () {
      const nameLowerCase = this.name.toLowerCase()
      let targetData = dataset.filter(function (n) {
        // Name obtained from search box
        return n.name === nameLowerCase
      })
      // Arrays to store information for different regions
      let engData = targetData.filter(function (n) {
        return n.country === 'England'
      })
      let scoData = targetData.filter(function (n) {
        return n.country === 'Scotland'
      })
      let walData = targetData.filter(function (n) {
        return n.country === 'Wales'
      })
      let ireData = targetData.filter(function (n) {
        return n.country === 'NorthernIreland'
      })
      // Arrays to store ranks for different regions
      let engRank = [null, null, null, null, null, null]
      let scoRank = [null, null, null, null, null, null]
      let walRank = [null, null, null, null, null, null]
      let ireRank = [null, null, null, null, null, null]
      const allData = [engData, scoData, walData, ireData]
      const allRank = [engRank, scoRank, walRank, ireRank]
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < allData[i].length; j++) {
          console.log(allData[i][j])
          allRank[i][allData[i][j].year - 2010] = allData[i][j].rank
        }
      }
      this.engRank = allRank[0]
      this.scoRank = allRank[1]
      this.walRank = allRank[2]
      this.ireRank = allRank[3]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  text-align: left;
}
.message {
  margin: 3em 0;
}
.isMobile {
  padding-top: 0;
}
.tag:hover {
  background-color: #e2e2e2;
  cursor: pointer;
}
</style>
