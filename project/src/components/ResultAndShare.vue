<template>
  <article class="message is-success">
    <div class="message-body">
      <slot></slot>
      <social-sharing :url="$route.fullPath" inline-template>
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
</template>

<script>

export default {
  name: 'result-and-share',
  component: {

  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
