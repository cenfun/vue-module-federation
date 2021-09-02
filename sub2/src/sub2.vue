<template>
    <div>sub2
        <Header></Header>
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