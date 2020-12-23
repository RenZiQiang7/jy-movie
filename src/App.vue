<template>
  <div id="app">
    <router-view />
    <!-- <Footer v-show="$store.state.isShowFooter"/> -->
     <Footer v-show="$store.state.isShowFooter" />
  </div>
</template>

<script>
import Footer from "@/components/Navigation/footer";

export default {
  components: {
    Footer,
  },
  created() {
    // this.$event.$on("isshowfooter", (bool) => {
    //   this.showFooter = bool;
    // });

  },
};
</script>

<style lang="scss">
</style>
