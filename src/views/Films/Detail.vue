<template>
  <div style="marginbottom: 10px">
    <div class="header">
      <div class="goBack" @click="back">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
          alt=""
        />
      </div>
      <div class="title" v-show="showTitle">
        {{ film.name }}
      </div>
    </div>

    <div class="poster">
      <img v-lazy="film.poster" alt="" />
    </div>

    <div class="main">
      <div class="main-detail">
        <div style="fontsize: 18px">
          {{ film.name }}
          {{ filmType }}
        </div>
        <div class="detail">
          {{ film.category }}
        </div>
        <div class="detail">
          {{ film.premiereAt | parseTime }}
        </div>
        <div class="detail">{{ film.nation }} | {{ film.runtime }}分钟</div>
        <div class="detail">
          {{ film.synopsis }}
        </div>
      </div>

      <div class="main-actor">
        <div class="yzry">演职人员</div>
        <Swiper :key="'yzry_' + film.actors.length">
          <div class="swiper-slide" v-for="(v, k) in film.actors" :key="k">
            <img :src="v.avatarAddress" alt="" width="85" height="100" />
            <div style="width: 85px; textalign: center">{{ v.name }}</div>
          </div>
        </Swiper>
      </div>
      <div class="main-actor">
        <div class="yzry">剧照</div>
        <Swiper :key="'yzry_' + film.photos.length">
          <div class="swiper-slide" v-for="(v, k) in film.photos" :key="k">
            <img :src="v" alt="" width="100" height="100" />
            <div style="width: 85px; textalign: center">{{ v.name }}</div>
          </div>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/config/uri";
import moment from "moment";
import Swiper from "@/components/Swiper";

export default {
  data: function () {
    return {
      film: { actors: [], photos: [] },
      showTitle: false,
      filmType: "",
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
  created() {
    // this.$event.$emit('isshowfooter',false);
    this.$store.commit("hideFooter", false);
    this.$http
      .get(url.getFilmInfo + "?filmId=" + this.$route.params.filmId)
      .then((ret) => {
        console.log(ret);
        this.film = ret.data.film;
        this.filmType = ret.data.film.filmType.name;
      });
  },
  mounted() {
    window.onscroll =  ()=> {
      console.log(document.documentElement.scrollTop);
      if (document.documentElement.scrollTop > 40) {
        this.showTitle = true;
      } else {
        this.showTitle = false;
      }
    };
  },

//   },
  destroyed() {
    // this.$event.$emit('isshowfooter',true)
    this.$store.commit("hideFooter", true);
  },
  filters: {
    parseTime(value) {
      return moment(value * 1000).format("YYYY-MM-DD");
    },
  },
  components: {
    Swiper,
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0px;

  z-index: 99;
  width: 100%;
  height: 40px;
  .goBack {
    height: 40px;
    display: inline-block;
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 1;
    img {
      width: 30px;
      border-radius: 50%;
      background-color: rgba($color: #aca8a8, $alpha: 1);
    }
  }
  .title {
    font-size: 17px;
    display: inline-block;
    width: 100vw;
    line-height: 40px;
    text-align: center;
    color: black;
    background: #fff;
  }
}

.poster {
  width: 100%;
  height: 56vw;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
}
.main {
  background: #f4f4f4;
  .main-detail {
    padding: 15px;
    background: #fff;
    .detail {
      font-size: 13px;
      color: #797d82;
      margin-top: 4px;
    }
  }
  .main-actor {
    background: #fff;
    margin-top: 10px;
    .yzry {
      font-size: 16px;
      text-align: left;
      color: #191a1b;
      padding: 15px;
      height: 22.5px;
      line-height: 22px;
    }
  }
}
</style>