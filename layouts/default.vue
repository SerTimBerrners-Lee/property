<template>
  <div>
    <main>
    <Navbar />
      <nuxt />
    </main>
  </div>
</template>

<script>
// Отрисрвать навбар 
import Navbar from '@/components/Navbar';
export default {
  components: {
    Navbar,
 },
 
}
</script>


