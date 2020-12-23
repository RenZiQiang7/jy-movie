<template>
  <van-tabs @click="changeTab" v-model="active" v-show="show" class="topheader">
    <van-tab title="正在热映"></van-tab>
    <van-tab title="即将上映"></van-tab>
  </van-tabs>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";


Vue.use(Tab);
Vue.use(Tabs);
export default {
  data() {
    return {
      active: 0,
      url:['/films/nowplaying','/films/commingsoon'],
      show:true
    };
  },
  methods: {
    changeTab(index) {
      this.$router.push(this.url[index]);
    },
  },
  created(){
    this.active=this.url.indexOf(this.$route.path)
  },
  mounted(){
    window.onscroll=()=>{
       var height = document.documentElement.scrollTop || document.body.scrollTop;
  
       if(height>50&&height<200){
          this.show=false;
       }else{
         this.show=true;
       }
    };

  },
  watch:{
    $route:function(val){
       this.active = this.url.indexOf(val.fullPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.topheader{
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
}
</style>