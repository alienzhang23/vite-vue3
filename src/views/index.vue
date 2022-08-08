<template>
  <div class="home">
    home
    <van-button type="primary" @click="funGo()">page1</van-button>
  </div>
</template>
<script>
import { reactive, onMounted, toRefs, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const data = reactive({});
     const _this = getCurrentInstance();
    const API = _this.proxy.$API;
    onMounted(() => {
    //示例
      API.config.getDataDetail().then()
    });
    const funGo = () => {
      router.push("/login");
    };
    return {
      ...toRefs(data),
      funGo
    };
  },
};
</script>
<style lang="less" scoped>
.home {
  font-size: 20px;
}
</style>
