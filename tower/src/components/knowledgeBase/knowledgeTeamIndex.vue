<template>
  <div id="knowledgeTeamMain">
    <div id="knowledgeTeamHead" style="display: inline-block;width: 100%">
      <ul v-for="(menber, index) in menberList" :key="index">
        <li><img :src="'/static/image/team/' + menber + '.png'" class="knowledgeMenberImage"/></li>
      </ul>
      <span style="padding:4px 6px 4px 6px;background: #EFEFEF;border-radius: 8px;margin-left: 3px">共&nbsp;{{menberList.length}}人</span>
      <el-button style="padding: 8px 12px"><i class="el-icon-plus"></i>添加成员</el-button>
    </div>
    <div id="knowledgeTeamViewData">
      <div id="contentViewData">
        <el-row>
          <el-col :span="10" style="position: relative;left: 30px">
            <el-checkbox v-model="checkedData"></el-checkbox>
            <span>
                     <a href="javascript:;" style="position: relative;left: -2px">名称</a>
                   </span>
          </el-col>
          <el-col :span="6">
            <span><a href="javascript:;">最后修改人</a></span>
          </el-col>
          <el-col :span="4">
            <span><a href="javascript:;">最后修改时间<i class="el-icon-bottom"></i></a></span>
          </el-col>
          <el-col :span="4" style="text-align: right;">
            <span><a href="javascript:;" style="position: relative;left: -30px">操作</a></span>
          </el-col>
        </el-row>
        <el-row v-for="(data, index) in dataList" :key="index" class="showData">
          <el-col :span="10" style="padding-left: 10px">
            <el-checkbox v-model="checkedData"></el-checkbox>
            <span>
                 <i class="el-icon-folder" v-if="data.isFolder==true"></i>
                 <i class="el-icon-document" v-if="data.isFolder==false"></i>
                      <router-link to="/knowledgeBaseIndex/knowledgeViewData">{{data.fileName}}</router-link>
               </span>
          </el-col>
          <el-col :span="6">
            <span><a href="javascript:;">{{data.userName}}</a></span>
          </el-col>
          <el-col :span="4">
            <span><a href="javascript:;">{{data.dateTime}}</a></span>
          </el-col>
          <el-col :span="4" style="text-align: right;">
            <span><a href="javascript:;" style="position: relative;left: -30px">...</a></span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div>
      <simditor :id="1245" v-on:saveDataSimditor='saveDataSimditor' :viewData="viewData" />
    </div>
    <div>
      <simditor :id="aa1" v-on:saveDataSimditor='saveDataSimditor' :viewData="viewData" />
    </div>
  </div>
</template>
<script>
  import app from '../../utils/app'
  import Simditor from '../simditor'

  export default {
    name: "knowledge-team-index",
    components: {
      Simditor
    },
    data() {
      return {
        aa: 'taskIredsdfasdf',
        aa1: 'asfdasdfasfasdfasasf',
        datas: '',
        viewData:'测试数据信息展示数据显示哈哈哦哦哦嗯嗯呵呵',
        currentSimditorIds: [],
        menberList: ['1', '2', '3', '4', '5', '6', '7', '8'],
        checkedData: false,
        dataList: [
          {
            fileName: '开发文档',
            userName: '李强',
            dateTime: '2018-05-19',
            isFolder: true
          },
          {
            fileName: 'Api',
            userName: '朱志明',
            dateTime: '2019-02-26',
            isFolder: true
          }, {
            fileName: 'Update',
            userName: '张三',
            dateTime: '2019-03-24',
            isFolder: true
          }, {
            fileName: '笔记',
            userName: '李四',
            dateTime: '2019-04-18',
            isFolder: true
          }, {
            fileName: '流程图',
            userName: '王五',
            dateTime: '2019-05-26',
            isFolder: true
          },
        ]
      }
    },
    methods: {
      change(val) {
        console.log(val)  //以html格式获取simditor的正文内容
      },
      getHtml: function (editorId) {
        const simditorDataName = 'simditorData' + editorId;
        this.$refs.simditorDataaa.getDatas(editorId);
      },
      /**
       * 富文本保存按钮的回调函数
       * @param simditorId
       */
      saveDataSimditor: function () {
        const $this = this;
        $this.currentSimditorIds.push(simditorId);
      }
    }
  }
</script>

<style>
  #knowledgeTeamMain {
    text-align: left;
  }

  #knowledgeTeamHead {
    padding-top: 10px;
    padding-left: 20px;
    display: inline-block;
  }

  #knowledgeTeamHead ul {
    list-style-type: none;
  }

  #knowledgeTeamHead ul li {
    float: left;
    padding-left: 5px;
  }

  .knowledgeMenberImage {
    text-align: left;
    border-radius: 50%;
    height: 30px;
    width: 30px;
  }

  #knowledgeTeamHead .el-button:hover {
    background: #44ACB6;
    color: white;
  }

  #knowledgeTeamViewData {
    padding-top: 20px;
  }

  #knowledgeTeamViewData a {
    text-decoration: none;
    color: #777777;
  }

  #knowledgeTeamViewData a:hover {
    text-decoration: none;
    color: #44ACB6;
  }

  .showData {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #E3E3E3;
    border-top: 1px solid #E3E3E3;
  }

  #contentViewData {
    margin-left: 30px;
    margin-right: 20px;
  }

</style>
