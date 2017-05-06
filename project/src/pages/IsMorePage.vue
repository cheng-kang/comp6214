<template>
  <div class="container">
    <nav-bar />
    <banner
      title="Baby Name @UK"
      subtitle="Is my name more English/Scottish...?"
    />
    <section class="section">
      <div class="field has-addons">
        <p class="control is-expanded">
          <input class="input" type="text" v-model="name" placeholder="Type in your name">
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
        <div class="column">
        </div>
        <div class="column">
          <div class="card">
            <div class="card-content">
              <IEcharts :option="bar" :loading="loading" :highlight="highlight" @ready="onReady"></IEcharts>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item">
                <img :src="`/static/Flag_${info.area[highlight]}.png`" width="30">
              </div>
            </footer>
          </div>
        </div>
        <div class="column">
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
    <section class="section">
      <article class="message is-success">
        <div class="message-body">
          {{name}}, your name is more <span style="text-transform: uppercase;">{{info.people[highlight]}}</span>!
          <br> 
          <br>
          <social-sharing url="https://vuejs.org/" inline-template>
            <div>
              <network network="facebook">
                <i class="fa fa-fw fa-facebook"></i>
              </network>
              <network network="googleplus">
                <i class="fa fa-fw fa-google-plus"></i>
              </network>
              <network network="linkedin">
                <i class="fa fa-fw fa-linkedin"></i>
              </network>
              <network network="pinterest">
                <i class="fa fa-fw fa-pinterest"></i>
              </network>
              <network network="reddit">
                <i class="fa fa-fw fa-reddit"></i>
              </network>
              <network network="twitter">
                <i class="fa fa-fw fa-twitter"></i>
              </network>
              <network network="weibo">
                <i class="fa fa-weibo"></i>
              </network>
              <network network="whatsapp">
                <i class="fa fa-fw fa-whatsapp"></i>
              </network>
            </div>
          </social-sharing>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.vue'
import numeral from 'numeral'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'

export default {
  name: 'is-more-page',
  components: {
    NavBar, Banner, IEcharts
  },
  mounted () {
    const cards = document.getElementsByClassName('card-content')
    for (let i = 0; i < cards.length; i++) {
      console.log(cards[i])
      let computedStyle = window.getComputedStyle(cards[i])
      cards[i].style.width = computedStyle.width
      cards[i].style.height = computedStyle.width
    }

    console.log(IEcharts)
  },
  data () {
    return {
      name: 'Tom',
      year: 2016,
      info: {
        area: ['England', 'Scotland', 'Wales', 'N-Ireland'],
        people: ['English', 'Scottish', 'Welsh', 'N-Irish'],
        tp: ['42300000', '12300000', '11100000', '8800000'],
        pn: ['38901', '1239', '3219', '21233'],
        p: [15, 30, 20, 35]
      },
      loading: true
    }
  },
  computed: {
    highlight () {
      let max = 0
      for (var i = 1; i < this.info.p.length; i++) {
        if (this.info.p[i] > this.info.p[max]) {
          max = i
        }
      }
      return max
    },
    bar () {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{b} ({d}%)'
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
                  fontSize: '30',
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
              {value: this.info.p[0], name: 'England\n' + this.formatWithUnit(this.info.pn[0])},
              {value: this.info.p[1], name: 'Scotland\n' + this.formatWithUnit(this.info.pn[1])},
              {value: this.info.p[2], name: 'Wales\n' + this.formatWithUnit(this.info.pn[2])},
              {value: this.info.p[3], name: 'N-Ireland\n' + this.formatWithUnit(this.info.pn[3])}
            ]
          }
        ]
      }
    }
  },
  methods: {
    onReady (instance) {
      this.loading = false
    },
    formatWithComma (n) {
      return numeral(n).format(0)
    },
    formatWithUnit (n) {
      return numeral(n).format('0a')
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
</style>
