<template>
  <van-tabbar v-model="active" active-color="#FFAF8B">
    <van-tabbar-item to="/films">
      <van-icon class="iconfont icon-dianying" slot="icon" />
      <span>电影</span>
    </van-tabbar-item>
    <van-tabbar-item to="/cinema">
      <van-icon class="iconfont icon-yingyuan" slot="icon" />
      <span>影院</span>
    </van-tabbar-item>
    <van-tabbar-item to="/center">
      <van-icon class="iconfont icon-wode" slot="icon" />
      <span>我的</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem, Icon } from "vant";
import "@/assets/iconfont/iconfont.css";
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
export default {
  data() {
    return {
      active: 0,
     
    };
  },
  methods:{
    updateIndex(path){
      switch (path) {
          case "/films/nowplaying":
          case "/films/commingsoon":
            this.active = 0;
            break;
          case "/cinema":
            this.active = 1;
            break;
          case "/center":
            this.active = 2;
            break;
        }
    }
  },
  created() {
    this.updateIndex(this.$route.path)



  },
  watch:{
    $route:function(val){
      console.log(val)
         this.updateIndex(val.path)
    }
  }
};
</script>