<template>
  <div class="container">
    <nav-bar />
    <banner
      title="Most Popular Names!!!"
      subtitle="Baby Name @UK"
    />
    <section class="section">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <article class="message is-info">
            <div class="message-body">
              Use the filters to display the data you want
            </div>
          </article>
        </div>
      </div>
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <div class="field has-addons">
            <p class="control">
              <a class="button">
                Year
              </a>
            </p>
            <p class="control">
              <span class="select">
                <select v-model="year">
                  <option>2010</option>
                  <option>2011</option>
                  <option>2012</option>
                  <option>2013</option>
                  <option>2014</option>
                  <option>2015</option>
                </select>
              </span>
            </p>
            <p class="control">
              <a class="button">
                Top
              </a>
            </p>
            <p class="control">
              <input class="input" type="number" v-model="start">
            </p>
            <p class="control">
              <a class="button">
                to
              </a>
            </p>
            <p class="control">
              <input class="input" type="number" v-model="end">
            </p>
          </div>
          <div class="field has-addons">
            <p class="control">
              <a class="button">
                Gender
              </a>
            </p>
            <p class="control is-expanded">
              <span class="select">
                <select v-model="gender">
                  <option value="M">Boy</option>
                  <option value="F">Girl</option>
                </select>
              </span>
            </p>
          </div>
          <div class="field has-addons">
            <p class="control">
              <a class="button">
                Region
              </a>
            </p>
            <p class="control is-expanded">
              <span class="select">
                <select v-model="region">
                  <option>England</option>
                  <option>Scotland</option>
                  <option>Wales</option>
                  <option value="NorthernIreland">Northern Ireland</option>
                </select>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="columns">
        <div class="column is-10 is-offset-1 ecbox">
          <IEcharts :option="bar" :loading="loading" @ready="onReady"></IEcharts>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <article class="message is-info">
            <div class="message-body">
              Browse all data between 2010-2015
            </div>
          </article>
          <div class="tabs">
            <ul>
              <li :class="{'is-active': this.selectedTab === 'England'}" @click="tabClick($event, 'England')"><a>England</a></li>
              <li :class="{'is-active': this.selectedTab === 'Scotland'}" @click="tabClick($event, 'Scotland')"><a>Scotland</a></li>
              <li :class="{'is-active': this.selectedTab === 'Wales'}" @click="tabClick($event, 'Wales')"><a>Wales</a></li>
              <li :class="{'is-active': this.selectedTab === 'NorthernIreland'}" @click="tabClick($event, 'NorthernIreland')"><a>Northern Ireland</a></li>
            </ul>
          </div>
          <div class="content region-data-box">
            <table>
              <tr>
                <th></th>
                <th>Country</th>
                <th>Year</th>
                <th>Rank</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Count</th>
              </tr>
              <tr v-for="(item, index) in regionData[selectedTab]" :key="index">
                <td># {{index}}</td>
                <td>{{item.country}}</td>
                <td>{{item.year}}</td>
                <td>{{item.rank}}</td>
                <td>{{item.name}}</td>
                <td>{{item.gender}}</td>
                <td>{{item.count}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import dataset from '../assets/dataset'
import IEcharts from 'vue-echarts-v3/src/full.vue'
export default {
  name: 'statistics-page',
  components: {
    NavBar, Banner, IEcharts
  },
  mounted () {
    const cards = document.getElementsByClassName('ecbox')
    for (let i = 0; i < cards.length; i++) {
      console.log(cards[i])
      let computedStyle = window.getComputedStyle(cards[i])
      cards[i].style.width = computedStyle.width
      cards[i].style.height = computedStyle.width
      // cards[i].style.height = (parseInt(computedStyle.width) + 120) + 'px'
    }

    this.start = 1
  },
  data () {
    return {
      name: '',
      start: 0,
      end: 20,
      gender: 'M',
      year: 2010,
      region: 'England',
      barData: {
        name: [],
        count: []
      },
      selectedTab: 'England',
      loading: true
    }
  },
  watch: {
    start () {
      this.filterNames(dataset, this.start, this.end, this.gender, this.year, this.region)
    },
    end () {
      this.filterNames(dataset, this.start, this.end, this.gender, this.year, this.region)
    },
    gender () {
      this.filterNames(dataset, this.start, this.end, this.gender, this.year, this.region)
    },
    year () {
      this.filterNames(dataset, this.start, this.end, this.gender, this.year, this.region)
    },
    region () {
      this.filterNames(dataset, this.start, this.end, this.gender, this.year, this.region)
    }
  },
  computed: {
    bar () {
      return {
        tooltip: {},
        grid: [
          {
            top: 0,
            containLabel: true
          }
        ],
        xAxis: [{
          type: 'value',
          position: 'top',
          splitLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            rotate: 0,
            textStyle: {
              fontSize: 20
            }
          }
        }],
        yAxis: [{
          type: 'category',
          data: this.barData.name,
          inverse: true,
          axisLabel: {
            interval: 0,
            rotate: 0,
            textStyle: {
              fontSize: 20
            }
          },
          splitLine: {
            show: false
          }
        }],
        series: [{
          type: 'bar',
          stack: 'chart',
          z: 3,
          label: {
            normal: {
              position: 'right',
              show: true
            }
          },
          data: this.barData.count
        }],
        textStyle: {
          fontFamily: 'Ravi Prakash',
          fontSize: 20
        }
      }
    },
    regionData () {
      const en = dataset.filter((record) => {
        return record.country === 'England'
      })
      const sc = dataset.filter((record) => {
        return record.country === 'Scotland'
      })
      const wa = dataset.filter((record) => {
        return record.country === 'Wales'
      })
      const ir = dataset.filter((record) => {
        return record.country === 'NorthernIreland'
      })
      return {
        England: en,
        Scotland: sc,
        Wales: wa,
        NorthernIreland: ir
      }
    }
  },
  methods: {
    filterNames (data, start, end, gender, year, region) {
      var filterData = data.filter(function (d) {
        return d.rank >= parseInt(start) && d.rank <= parseInt(end) && d.gender === gender && d.year === parseInt(year) && d.country === region
      })
      // Name for y axis and count for x axis
      var barData = {name: [], count: []}
      for (var i = 0; i < filterData.length; i++) {
        barData.name.push(filterData[i].name)
        barData.count.push(filterData[i].count)
      }
      this.barData = barData
    },
    onReady () {
      this.loading = false
    },
    tabClick (e, name) {
      this.selectedTab = name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.region-data-box {
  height: 300px;
  width: 100%;
  overflow: scroll;
  display: block;
}
</style>
