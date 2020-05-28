<template>
    <div>
        <Column  :sections="sections" :admin="admin" :posts_section="posts_section" /> 
                   
    </div>
</template>

<script>
import Column from '@/components/Column';
export default {
  props: { 
    admin: {
      type: Boolean
    },
    sections: {
      type: Array
    },
    posts_section: {
      type: Array
    }
  },
  
  components: {
      Column
  }, 
  methods: {
      posts(id) {
          this.$router.push({ path: '/posts/'+ id, component: 'title'})
      },
  }
}
</script>

<style scoped>

</style>
