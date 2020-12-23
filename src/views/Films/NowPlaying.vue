<template>
  <div class="container">
 
      <van-pull-refresh
        v-model="isLoading2"
        success-text="加载成功"
        @refresh="onRefresh"
      >
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
            <div style="fontsize: 14px; margintop: 4px; color: #797d82">
              观众评分<span style="color: #ffb232">{{ v.grade }}</span>
            </div>
            <div class="actor">主演:{{ v.actors | parseActors }}</div>
            <div class="nation">{{ v.nation }} | {{ v.runtime }}分钟</div>
            <div class="buy">购票</div>
          </template>
        </van-card>
      </van-pull-refresh>

  </div>
</template>

<script>
import Vue from "vue";
import { Card, Loading, PullRefresh } from "vant";

import url from "@/config/uri";

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
    };
  },
  methods: {
    getData(func = null) {
      this.$http.get(url.getNowPlaying + `?pageNum=${this.pageNum}`).then((data) => {
        if (this.pageNum <= Math.ceil(data.data.total / 10)) {
          this.pageNum++;
          this.films = data.data.films.concat(this.films);
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
.container {
  margin-top: 44px;
  margin-bottom: 50px;
}
</style>