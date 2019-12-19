<template>
  <div class="7845">

    <simditor id="aa" @change="change"></simditor>
    <button>1245</button>
    <button>7895</button>
  </div>
</template>

<script>
  import  Simditor from '../simditor'
    export default {
        name: "knowledge-view-data",
      components: {
        Simditor
      },
      methods:{
        change(val){
          console.log(val)  //以html格式获取simditor的正文内容
        },
        submitSimditor:function (editorId) {

        },
        cancelSimditor:function(){

        }
      }
    }
</script>

<style scoped>

</style>
