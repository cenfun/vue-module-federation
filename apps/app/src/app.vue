<template>
    <div>app
        <Header></Header>
        <Sub1></Sub1>
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