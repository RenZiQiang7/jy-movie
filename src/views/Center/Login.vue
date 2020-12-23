<template>
  <div>
    <div class="logo">
      <img src="https://2url.cc/1OwrB" alt="" />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="[{ pattern, message: '手机号不正确' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Form, Button, Field, Toast } from "vant";

Vue.use(Form);
Vue.use(Button);
Vue.use(Field);
Vue.use(Toast);
export default {
  data: function () {
    return {
      username: "",
      password: "",
      pattern: /^1[3-9]\d{9}$/,
    };
  },
  created() {
    this.$store.commit("hideFooter", false);
  },
  destroyed() {
    this.$store.commit("hideFooter", true);
  },
  methods: {
    onSubmit(value) {
      // console.log(value)
      this.$http.post("/v1/login", value).then((ret) => {
        console.log(ret);
        if (ret.code == 0) {
          Toast.success("登录成功");

          this.$store.commit("setJwt", ret.jwt);
          setTimeout(() => {
            if (this.$route.query.toUrl) {
              this.$router.push(this.$route.query.toUrl);
            } else {
              this.$router.push("/center");
            }
          }, 2000);
        } else {
          Toast.fail(ret.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  margin-top: 150px;
  margin-bottom: 100px;
  text-align: center;
}
</style>