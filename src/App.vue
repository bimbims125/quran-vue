<template>
  <Header/>
  <router-view/>
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
