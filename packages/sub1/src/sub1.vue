<template>
  <div>
    sub1
    <Header></Header>
    <div class="sub1-body">sub1 body</div>
  </div>
</template>
<script>
export default {
  components: {
    Header: () => import("app/Header")
  },
  mounted() {
    console.log("sub1 mounted");
  },
};
</script>
<style lang="scss">
.sub1-body {
    color: #0f0;
}
</style>