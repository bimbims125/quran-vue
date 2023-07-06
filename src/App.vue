<template>
  <Header/>
  <div class="container mt-5">
    <router-view/>
  </div>
  <Footer/>
</template>
<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

export default{
  components:{
    Header: Header,
    Footer:Footer
  }
}
</script>
<style>
#app{
  font-family: 'Roboto', sans-serif;
}
</style>
