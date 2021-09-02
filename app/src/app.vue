<template>
    <div>app
        <Header></Header>
        <Sub1></Sub1>
    </div>
</template>
<script>
import Header from './header.vue';
export default {
  components: { 
      Header,
      Sub1: () => import("sub1/Sub1")
   },
  mounted() {
      console.log("app mounted")
  }
}
</script>