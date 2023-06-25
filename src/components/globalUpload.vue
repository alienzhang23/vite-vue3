<template>
    <div>
      <slot></slot>
      <div class="upload" @click="active">
      <slot name="fileSlot">
        <!-- 默认内容 -->
      </slot>
   
      <input @click.stop ref="inputFile"  multiple="multiple" class="input-file" type="file" :accept="accept" :action="action" @change="onFileChange" />
    </div>
    </div>
  </template>
  
  <script>
  import { getCurrentInstance, reactive, toRefs, onMounted } from 'vue'
  export default {
    components: {},
    props: {
      beforeOpenFileBox: {
        type: Function,
        default: null
      },
      accept: {
        type: String,
        default: () => ''
      },
      action: {
        type: String,
        default: () => '#'
      },
      onChange: {
        type: Function,
        default: null
      }
    },
    setup(props) {
      const { proxy} = getCurrentInstance()
      // #region 变量
      const data = reactive({})
      // #endregion
  
      // #region 生命周期、监听、计算 函数
      onMounted(() => {})
      // #endregion
  
      // #region 页面操作方法
      const active = () => {
        if (props.beforeOpenFileBox) {
          props.beforeOpenFileBox(openFileBox)
        } else {
          openFileBox()
        }
      }
      const openFileBox = () => {
        const el = proxy.$refs.inputFile
        el.click()
      }
      const onFileChange = e => {
        const files = e.target.files
        const handleFiles = handleOrigin(files)
        if (props.onChange) {
          props.onChange(handleFiles[0], handleFiles)
        }
        e.target.value = null
      }
      const handleOrigin = files => {
        const returnV = []
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          let obj = {
            name: file.name,
            raw: file,
            size: file.size,
            uid: file.lastModified,
            type: file.type
          }
          returnV.push(obj)
        }
        return returnV
      }
      // #endregion
  
      return {
        ...toRefs(data),
        active,
        openFileBox,
        onFileChange,
        handleOrigin
      }
    }
  }
  </script>
  
  <style lang="less"></style>
  
  <style lang="less" scoped>
  .upload {
    .input-file {
      display: none;
    }
  }
  </style>