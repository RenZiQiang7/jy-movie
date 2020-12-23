<template>
  <div>
    <div>当前城市</div>
    <van-index-bar :index-list="cityIndex">
      <template v-for="(item,index) in dataList">
        <van-index-anchor index="1" :key="index">{{item.index}}</van-index-anchor>
        <van-cell v-for="(city) in item.data" :title="city.name" :key='city.cityIndex' @click="setCity(city.cityId,city.name)"/>
      </template>
    </van-index-bar>
  </div>
</template>

<script>
import uri from "@/config/uri";
import Vue from "vue";
import { IndexBar, IndexAnchor ,Cell} from "vant";

Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell)
export default {
  data: function () {
    return {
      dataList: [],
      cityIndex: [],
      charIndex: [],
    };
  },
  methods:{
    setCity(cityIndex,cityName){
      this.$store.commit('setCity',{cityId:cityIndex,cityName:cityName})
    }
  },
  created() {
    this.$store.commit("hideFooter", false);
    this.$http.get(uri.getCity).then((ret) => {
      console.log(ret);
      if (ret.status == 0) {
        for (let i = 65; i < 90; i++) {
          this.charIndex.push(String.fromCharCode(i));
        }

        this.charIndex.forEach((el) => {
          let tmp = ret.data.cities.filter(
            (item) => el.toLowerCase() == item.pinyin.substr(0, 1)
          );
          if (tmp.length > 0) {
            this.cityIndex.push(el);
          }
          this.dataList.push({
            index: el,
            data: tmp,
          });
        });
      }
    });
  },
  destroyed() {
    this.$store.commit("hideFooter", true);
  },
};
</script>