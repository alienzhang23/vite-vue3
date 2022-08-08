<template>
  <div class="login bg flex flex-vertical" v-if="isChecked">
    <div class="login-msg flex-item-none">
      <div>尊敬的家长，您好！</div>
      <div>欢迎登录 海亮教师评价系统</div>
    </div>
    <div class="flex-item"></div>
    <div class="login-box flex-item-none">
      <div class="login-item login-mobile">
        <input
          @blur="iosHandle"
          v-model="mobile"
          placeholder="请输入预留手机号"
          :type="isPC ? 'text' : 'tel'"
        />
      </div>
      <div class="login-item login-code">
        <input
          @blur="iosHandle"
          v-model="code"
          placeholder="请输入验证码"
          :type="isPC ? 'text' : 'tel'"
          @keyup.enter="login"
        />
        <div class="login-code-get" @click="getCode">
          <div v-waves="{ type: 'center' }">
            {{ timeStr }}
          </div>
        </div>
      </div>
      <div class="btn" v-waves @click="login">登　录</div>
      <div class="login-logo"></div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted , toRefs, ref, getCurrentInstance,watch } from "vue";
import { useRouter } from "vue-router";
import {isPC } from "@/utils/utils"
import {Toast} from 'vant'
export default {
  name: "Login",
  setup() {
    /*
      18667912879
      201301
      */
    const data = reactive({
      time: 60,
      timeStr: "获取验证码",
      mobile: "",
      code: "",
      isChecked: 1, //是否已经校验
    });
    onMounted (()=>{
    //     this.$handle.login.checkLogin().then((res) => {
    //   if (res == 1) {
    //     this.jump(0);
    //   } else {
    //     this.isChecked = 1;
    //   }
    })
    watch(()=>data.time, (newValue, oldValue) => {
      data.timeStr = newValue == data.time ? "获取验证码" : newValue + "秒";
    },{deep:true})
    const timeControl=()=> {
      if (data.time <= 0) {
        data.time = time;
        return;
      }
      data.time--;
      setTimeout(timeControl, 1000);
    }
    const getCode=()=> {
      if (data.time !== 60) {
        return;
      }
      if (!data.mobile.match(/^1[0-9]{10}$/)) {
        return Toast(
          data.mobile.length ? "手机号格式有误" : "请填写手机号"
        );
      }
      timeControl();
    //   this.$handle.login.getCode({ mobile }).then((res) => {
    //     this.$$message.text("验证码发送成功");
    //   });
    }
    const jump=(time)=> {
    //   this.getStudents(1, (res1) => {
    //     time > 0 && this.$$message.text("登录成功");
    //     setTimeout(() => {
    //       if (res1.length > 1) {
    //         this.$router.push({ name: "Students" });
    //       } else if (res1.length == 1) {
    //         this.$router.push({
    //           name: "Start",
    //           query: {
    //             stu_id: res1[0].stu_id,
    //             act_id: res1[0].activity.act_id,
    //             school_id: res1[0].school_id,
    //           },
    //         });
    //       } else {
    //         this.$$message.text("很抱歉，没有学生信息");
    //       }
    //     }, time);
    //   });
    }
    const login=()=> {
      if (!data.mobile.match(/^1[0-9]{10}$/)) {
        return Toast(
          data.mobile.length ? "手机号格式有误" : "请填写手机号"
        );
      }
      if (data.code.length < 4 || data.code.length > 6) {
        return Toast(data.code.length ? "验证码有误" : "请填写验证码");
      }
    //   this.$handle.login.login({ data.mobile, data.code }).then((res) => {
    //     this.jump(1500);
    //   });
    }
    const iosHandle=()=> {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
    return {
      ...toRefs(data),
      timeControl,
      getCode,
      jump,
      login,
      iosHandle,
      isPC
    };
  },

  
};
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  background-image: url("@/assets/img/login.png");
  background-position: center top;
  .login-msg {
    padding: 40px 0 0 25px;
    color: #fff;
    font-size: 17px;
    & > div:first-child {
      padding-bottom: 8px;
    }
  }
  .login-box {
    width: 325px;
    margin: 0 auto;
    padding-top: 10px;
    .btn {
      height: 53px;
      line-height: 53px;
      border-radius: 26px;
    }
    .login-logo {
      background-image: url("@/assets/img/logo.png");
      margin-top: 8px;
      height: 55px;
      margin-right: -10px;
      background-repeat: no-repeat;
      background-position: center right;
      background-size: 140px auto;
    }
    .login-item {
      position: relative;
      &.login-code {
        margin: 18px 0 50px;
        input {
          padding-right: 100px;
        }
        .login-code-get {
          color: #fff;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          cursor: pointer;
          > div {
            padding: 15px 20px;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .login-item input {
      height: 53px;
      width: 100%;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 26px;
      padding: 0 26px;
      border: 0;
      font-size: 14px;
    }
  }
}
@placeholder: #929292;
input::-webkit-input-placeholder {
  color: @placeholder;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: @placeholder;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: @placeholder;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: @placeholder;
}
</style>
