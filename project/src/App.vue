<template>
  <div id="app">
    <router-view></router-view>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Baby Name @UK</strong> by <a href="#">Fahad Altuwaijri </a>, <a href="#">Kang Cheng </a>, <a href="#">Jeevan Cyriac </a>, <a href="#">Haihan Jiang </a>, <a href="#">Yahya Majrashi </a>. 
          </p>
          <p>
            The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
            is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
          </p>
          <p>
            <a class="icon" href="https://github.com/cheng-kang/comp6214">
              <i class="fa fa-github"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import 'bulma/css/bulma.css'

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.footer {
  padding: 3rem 1.5rem 3rem;
}
</style>
