<template>
  <div class="history">
   
    <div class="list" v-if="list.length">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :immediate-check="false"
          :finished="finished"
          finished-text="没有更多了"
          :offset="10"
          @load="onLoad"
        >
          <div
            class="list-item"
            v-for="(item, index) in list"
            :key="index"
            @click="funDetail(item, index)"
          >
           

            {{ item }}
          </div>
        </van-list></van-pull-refresh
      >
    </div>

    <div class="blank" v-if="list.length == 0">
      <p>没有数据噢～</p>
    </div>
  
   
  </div>
</template>
<script>
import {
  reactive,
  onMounted,
  onActivated,
  toRefs,
  ref,
  getCurrentInstance,
} from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const data = reactive({
      refreshing: false,
      loading: false,
      finished: false,
      param: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      list: [],
    });
    const _this = getCurrentInstance();
    const API = _this.proxy.$API;
    onActivated(() => {
      const $wrapper = document.querySelector("#app");
      console.log(111, route.params.keepAlive);

      if (route.params.keepAlive === "0") {
        data.list = [];
        data.param.pageNum = 1;
        getList();
        $wrapper.scrollTop = 0;
      } else {
        const scrollTop = window.localStorage.getItem("historyScrollTop");
        console.log(999, scrollTop);

        if (scrollTop && $wrapper) {
          $wrapper.scrollTop = scrollTop;
          console.log(888, $wrapper.scrollTop);
        }

      }
    });
    onMounted(() => {
      getList();
    });

    const funDetail = (item, index) => {
      cacheScrollTop();
      router.push(
        `/detail`
      );
    };
 
    const onRefresh = () => {
      data.finished = false;
      data.param = {
        pageNum: 1,
        pageSize: 10,
      };
      data.loading = true;
      getList();
    };
    const onLoad = () => {
      console.log(456);
      data.param.pageNum++;
      getList();
    };
    const getList = () => {
      setTimeout(() => {
        let res={
            content:[1,2,3,4,5,6,7,8,9,10],
            totalElements:100
        }
        if (data.refreshing) {
          data.list = [];
          data.refreshing = false;
        }
        data.list = data.list.concat(res.content);
      
        data.loading = false;
        if (data.list.length >= res.totalElements) {
          data.finished = true;
        }
      },500);
    };

   
   
  
    const cacheScrollTop = () => {
      const $wrapper = document.querySelector("#app"); // 列表的外层容器 注意找到滚动的盒子
      const scrollTop = $wrapper ? $wrapper.scrollTop : 0;

      window.localStorage.setItem("historyScrollTop", scrollTop);
    };
    return {
      ...toRefs(data),
      onRefresh,
      onLoad,
      cacheScrollTop,
      funDetail,
      getList,
    };
  },
};
</script>
<style lang="less" scoped>
.history {
  height: 100vh;
  
  .blank {
    img {
      width: 200px;
      height: 200px;
      margin-bottom: 12px;
      margin-top: 121px;
    }
    p {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .list {
    .list-item {
      margin: auto;
      width: 351px;
      min-height: 166px;
      padding: 20px 18px 0;
      background: #ffffff;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      text-align: left;
      position: relative;
      overflow: hidden;
      margin-bottom: 20px;
      &:first-child {
        margin-top: 4px;
      }
     
      

      
      
     
     
    }
  }

 
}
</style>
