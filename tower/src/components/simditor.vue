<template>
  <div class="simditor" style="border: none">
    <textarea :id="id" class="simditorView"></textarea>
    <div style="margin: 10px 0px 10px 0px" class="simditorBtn">
      <el-button type="success" @click="saveDataSimditor">确定</el-button>
      <el-button type="danger" @click="destroySimditor">取消</el-button>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import Simditor from 'simditor'
  import 'simditor/styles/simditor.css'
  import app from '../utils/app'
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    components: {ElButton},
    name: 'simditor',
    data() {
      return {
        editor: '',
        fileServicePath: ''
      }
    },
    props: {
      id: {
        viladator: function (value) {
          if(value==1245){
            return "mki78465blkl";
          }else{
            return "mki78465blkl";
          }
        }

        },  //这里传入动态id，一个页面能使用多个编辑器,并且该Id应该为唯一
        viewData: ''
      },
      mounted() {
        const $this = this;
        const viewData = $this.viewData;
        $this.fileServicePath = app.common.getFileServicePath();
        $this.editor = new Simditor({
          textarea: $('#' + this.id),
          toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', 'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'image', 'hr', 'indent', 'outdent', 'alignment'],
          upload: {
            url: $this.fileServicePath + 'file/simditor', //文件上传的接口地址
            params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
            fileKey: 'uploadFile', //服务器端获取文件数据的参数名
            connectionCount: 3,
            leaveConfirm: '正在上传文件'
          },
          pasteImage: true,
          placeholder: '请输入编辑内容',
          codeLanguages: [
            {name: 'JavaScript', value: 'js'}
          ]
        });
        if (viewData != '') {
          $this.editor.setValue(viewData);
        }
      },
      methods: {
        /**
         * 富文本销毁
         * */

        destroySimditor: function () {
          $(".simditorBtn").remove();
          this.editor.destroy();
        },


        /**
         * 获取当前simditor中所有的HTML内容
         */
        getSimdtorHtml: function () {
          return this.editor.getValue();
        },

        /**
         *
         * */
        getDataByEditor: function () {
          const $this = this;
          let allImage = [];
          const htmlData = $this.getSimdtorHtml();
          let images = $(htmlData).find("img");
          $.each(images, function (i, v) {
            let url = $(v).attr("src");
            let fileUUId = url.substring(url.lastIndexOf("\\") + 1, url.lastIndexOf("."));
            allImage.push(fileUUId);
          });
          $this.destroySimditor();
          const contentData = {content: htmlData, files: allImage.join(","), id: $this.id};
          app.storage.setValue($this.id, JSON.stringify(contentData));
        },
        saveDataSimditor: function () {
          const $this = this;
          $this.getDataByEditor();
          this.$emit('saveDataSimditor', this.id);
        }
      }
    }
</script>

<style>
  .simditorView:focus {
    color: #44ACB6;
  }

</style>
