<template>
  <div class="home">
    home
    <van-button type="primary" @click="funGo()">List</van-button>
   
  </div>
</template>
<script>
import { reactive, onMounted, toRefs, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      uploadFileUrl: [],
    });
     const _this = getCurrentInstance();
    const API = _this.proxy.$API;
    onMounted(() => {
    //示例
      API.login.getDataDetail().then()
    });
    const funGo = () => {
      router.push("/list");
    };
     // 上传前的拦截操作
     const beforeOpenUpload = (pass) => {
      console.log("上传前的操作");
      pass();
    };
    // 选择某张图片进行上传
    const onUploadImage = (file) => {
      if (!file) return;
      const isQualified = uploadImageVerify(file); // 验证：图片是否符合要求
      if (!isQualified) return;
      console.log("file", file);
      // 上传图片到云服务器，注意取 file.raw
      // TODO.....
      console.log("file.raw", file.raw);
      getBase64(file.raw, (base64Url) => {
        data.uploadFileUrl.push({url:base64Url});
      });
    };
    // 获取本地图片的base64，以便临时显示
    const getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    };
    // 验证：图片是否符合要求
    const uploadImageVerify = (file) => {
      // 判断所传图片的文件类型是否符合jpg、jpeg、png
      const isJPG =
        file.raw.type === "image/jpg" ||
        file.raw.type === "image/jpeg" ||
        file.raw.type === "image/png";
      if (!isJPG) {
        // Toast.fail("上传的图片只能是 JPG，JPEG，PNG 格式!")
       
        return false;
      }
      // 判断所传图片的大小是否小于1M
      const isLt2M = file.size / 1024 / 1024 <= 1;
      if (!isLt2M) {
        // Toast.fail("上传图片大小不能超过 1MB!")
     
        return false;
      }
      // 判断所传图片名字长度是否超过100，若上传到服务器会重命名则可不考虑
      const strCodeLength = getStringByteLength(file.name);
      if (strCodeLength > 100) {
        // Toast.fail(`上传图片的名称字节长度不能超过 100! 当前名称长度为 ${strCodeLength}`)
    
        return false;
      }
      return true;
    };
    // 验证：所传图片名字的长度
    const getStringByteLength = (string) => {
      if (typeof string !== "string") return;
      const length = new Array(string.length)
        .fill(null)
        .reduce((total, _, i) => {
          const charCode = string.charCodeAt(i);
          total += charCode > 255 ? 2 : 1;
          return total;
        }, 0);
      return length;
    };
    
    return {
      ...toRefs(data),
      funGo,
      beforeOpenUpload,
      onUploadImage,
    };
  },
};
</script>
<style lang="less" scoped>
.home {
  font-size: 20px;
  .upload-img {
  width: 100px;
  height: 100px;
  background-color: #e9e9e9;
  border: 1px dashed #bbbab9;
  object-fit: contain;
  cursor: pointer;
}
.upload-box {
  width: 100px;
  height: 100px;
  background-color: #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8c8c8c;
  border: 1px dashed #bbbab9;
  cursor: pointer;
  .upload-title {
    margin-left: 8px;
  }
  &:hover {
    border-color: #ac7a16;
    color: #ac7a16;
  }
}
}
</style>
