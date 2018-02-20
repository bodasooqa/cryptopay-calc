<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
    <a class="navbar-brand" href="#">
      <img src="../assets/logo.png" class="d-inline-block align-top logo" alt="">
    </a>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      title: 'Cryptopay'
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  height: 65px;
}
</style>
