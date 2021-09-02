<template>
  <div>
    sub1
    <Header></Header>
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