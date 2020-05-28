<template>
    <div>
     <div class="conteiner">
       <CalcBlock />
      <Sections :admin="isAdmin" :sections="getSections" :posts_section="posts_section"/>
     </div>
    <!-- <h3> Отзывы </h3> -->
    <!-- <Sliders /> -->
    <!-- <Tester :admin="isAdmin" /> -->
    <News :admin="isAdmin" />
    <Footer :admin="isAdmin" />
    </div>
</template>

<script>
// Отрисрвать навбар
import Footer from '@/components/Footer';
import Sliders from '@/components/Sliders';
import Sections from '@/components/Sections';
import Tester from '@/components/Tester';
import News from '@/components/News';
import CalcBlock from '@/components/CalcBlock';

export default {
  middleware: ['admin'],
  components: {
    Footer,
    Sliders,
    Sections,
    Tester,
    News,
    CalcBlock
  },
  async asyncData({store}){
    if(store.getters['sections/sections'].length === 0) {
      await store.dispatch('sections/fetch')
    }
    if(store.getters['posts_section/posts_section'].length === 0) {
      await store.dispatch('posts_section/fetch')
    }
  },
  computed: {
    isAdmin() {
      return this.$store.getters['auth/cokk']
    },
    getSections() {
      return this.$store.getters['sections/sections']
    },
    posts_section() {
      return this.$store.getters['posts_section/posts_section']
    }
  },

}
</script>

<style >
  /* h3 {
      text-align: center;
  } */
  body {
    background: url('../assets/back.jpg');
  }
</style>
