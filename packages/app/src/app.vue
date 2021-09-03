<template>
    <div>app
        <Header></Header>
        <div class="line"></div>
        <Sub1></Sub1>
        <div class="line"></div>
        <Sub2></Sub2>
    </div>
</template>
<script>
import Header from './header.vue';
export default {
  components: { 
      Header,
      Sub1: () => import("sub1/Sub1"),
      Sub2: () => import("sub2/Sub2"),
   },
  mounted() {
      console.log("app mounted")
  }
}
</script>
<style lang="scss">
.line {
    border-top: thin solid #ccc;
    margin: 10px 0;
}
</style>