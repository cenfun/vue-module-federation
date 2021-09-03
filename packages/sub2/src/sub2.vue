<template>
    <div>sub2
        <Header></Header>
        <div class="sub2-body">sub2 body</div>
    </div>
</template>
<script>
export default {
  components: { Header:() => import('app/Header') },
  mounted() {
      console.log("sub2 mounted");
  }
}
</script>
<style lang="scss">
.sub2-body {
    color: #f00;
}
</style>