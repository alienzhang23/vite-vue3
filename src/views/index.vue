<template>
    <div>home
        <van-button type="primary">Primary</van-button>
    </div>
</template>
<script>
export default {
    data() {
        return{}
    },
    mounted(){
        console.log(import.meta.env.MODE)
        console.log(import.meta.env.VITE_SOME_KEY)
    }
}
</script>