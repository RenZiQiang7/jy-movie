<template>
  <div id="container" class="wrapper" :style="{ height: height + 'px' }">
    <div>
      <van-loading size="24px" vertical v-show="isLoading"
        >加载中...
      </van-loading>
      <van-card
        v-for="v in films"
        :key="v.filmId"
        @click="goToDetail(v.filmId)"
      >
        <template #title>
          <span style="fontsize: 16px; color: #191a1b">{{ v.name }}</span>
          <span class="film-type">{{ v.filmType.name }}</span>
        </template>
        <template #thumb>
          <img :src="v.poster" alt="" />
        </template>
        <template #desc>
          <div class="actor" style="margintop: 30px">
            主演:{{ v.actors | parseActors }}
          </div>
          <div class="nation">上映日期：{{ v.premiereAt | parseTime }}</div>
          <div class="buy">预购</div>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Card, Loading, PullRefresh } from "vant";
import axios from "@/api/http.js";
import url from "@/config/uri";
import BScroll from "better-scroll";

Vue.use(Loading);
Vue.use(Card);
Vue.use(PullRefresh);
export default {
  data: function () {
    return {
      films: [],
      isLoading: true,
      isLoading2: true,
      pageNum: 1,
      bs: null,
      y: 0,
      height: 0,
    };
  },
  methods: {
    getData(func = null) {
      axios.get(url.getComingSoon + `?pageNum=${this.pageNum}`).then((data) => {
        // console.log(data);
        if (this.pageNum <= Math.ceil(data.data.total / 10)) {
          this.pageNum++;
          this.films = this.films.concat(data.data.films);
          console.log(data);
          //    this.list = [...this.list, ...data.data.films];
        }
        if (func == null) {
          this.isLoading = false;
        } else {
          func();
        }
      });
    },
    goToDetail(filmId) {
      this.$router.push("/film/" + filmId);
    },
    onRefresh: function () {
      this.getData(() => {
        this.isLoading2 = false;
      });
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    this.height = document.documentElement.clientHeight - 94;
  },
  updated() {
    this.bs = new BScroll(".wrapper", {
      // ...
      pullUpLoad: true,
      click: true,
      startY: this.y,
    });
    this.bs.on("pullingUp", () => {
      this.getData();

      this.y = this.bs.y;
      this.bs.finishPullUp();
    });
  },

  filters: {
    parseActors: function (actors) {
      if (actors) {
        let str = "";
        actors.forEach((val) => {
          str += val.name + " ";
        });
        return str.substr(0, 15) + "...";
      } else {
        return "暂无主演";
      }
    },
    parseTime(timestamp) {
      const weeks = ["日", "一", "二", "三", "四", "五", "六"];
      timestamp = timestamp + "";
      timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp;
      var date = new Date(timestamp);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var week = weeks[date.getDay()];

      return "星期" + week + " " + m + "月" + d + "日";
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 66px;
  height: 94px;
  border-radius: 0;
}
.actor {
  font-size: 13px;
  margin-top: 4px;
  color: #797d82;
}
.nation {
  font-size: 13px;
  margin-top: 4px;
  color: #797d82;
}
.buy {
  line-height: 22px;
  height: 20px;
  width: 45px;
  color: #ff5f16;
  font-size: 13px;
  text-align: center;
  border-radius: 2px;
  border: 1px solid;
  position: absolute;
  border: 1px solid #ff5f16;
  left: 83%;
  top: 35%;
}
.van-card__thumb {
  width: 66px;
}
.film-type {
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
  margin-left: 5px;
}
#container {
  margin-top: 44px;
  margin-bottom: 50px;
}
</style>