<template>
  <div id="app">
    <Header/>
    <Content/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Content from './components/Content.vue'
export default {
  name: 'App',
  components: {
    Header, Content
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";
#app {
}
</style>
