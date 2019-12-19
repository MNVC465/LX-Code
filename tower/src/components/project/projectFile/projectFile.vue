<template>
  <div id="project-file-content">
    <div id="project-file-head">
      <div class="left">
        <router-link :to="{ path: '/projectViewPanel', query: {projectId: currentProjectId,projectName:projectName}}">
          <span><i class="el-icon-arrow-left"></i>{{projectName}}</span>
        </router-link>
      </div>
    </div>
    <div id="project-file-main">
      <div id="project-file-left" class="inline-block project-file left">
        <div id="project-file-left-content">
          <div style="height:60px;border-bottom: 1px solid #D6D8DD"><span
            style="padding: 10px 0px 10px 0px;position: relative;top: 20px;font-size: 20px;">项目网盘</span>
          </div>
          <ul v-for="(menu,index1) in leftMenu" :key="index1">
            <li :class="{leftActiveColor:leftColorIndex===index1}" @click="changeLeftColor(index1)"><a><span><i :class="menu.icon"></i>&nbsp;&nbsp;{{menu.name}}</span></a></li>
          </ul>
        </div>
      </div>
      <div id="project-file-right" class="inline-block project-file align-left left">
        <div id="project-file-head-menu" class="ul-menu">
          <ul class="left align-left">
            <li><a><span>上传</span></a></li>
            <li><a><span>下载</span></a></li>
            <li><a><span>分享</span></a></li>
            <li><a><span>删除</span></a></li>
            <li @click="createFolderState=true"><a><span>新建文件夹</span></a></li>
            <li><a><span>离线下载</span></a></li>
            <li><a><span>更多</span></a></li>
          </ul>
          <ul class="right align-right">
            <li><a><span><i class="el-icon-s-grid"></i></span></a></li>
            <li><a><span><i class="el-icon-s-unfold"></i></span></a></li>
          </ul>
        </div>
        <div id="project-file-bottem-menu" class="ul-menu">
          <ul class="left align-left">
            <li><a><span><i class="el-icon-arrow-left"></i></span></a></li>
            <li><a><span><i class="el-icon-arrow-right"></i></span></a></li>
            <li><a><span><i class="el-icon-caret-bottom"></i></span></a></li>
            <li><a><span><i class="el-icon-refresh-right"></i></span></a></li>
            <li style="border-left: 1px solid #E4E4E4;padding-left: 8px">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">项目网盘</el-breadcrumb-item>
                <el-breadcrumb-item >活动管理</el-breadcrumb-item>
              </el-breadcrumb>
            </li>
          </ul>
          <ul class="right align-right">
            <input id="project-file-query" @keyup.enter="queryFileData" v-model="queryData" name="query"
                   placeholder="按回车键搜索查询内容" style="height: 25px;position: relative;top: -7px;padding-right: 30px">
            <i class="el-icon-search inline-block right" style="position: relative;top: -4px;left: -30px"></i>
          </ul>
        </div>
        <div id="project-file-viewData">
          <div id="project-file-card">
            <el-row
              style="height: 758px; width:850px;overflow-y: auto;overflow-x: hidden;padding-right: 15px;padding-bottom: 20px"
              v-if="folderList.length>0">
              <el-col :span="3" v-for="(folder,index) in folderList" :key="index" :offset="1">
                <div :class="{activeColor:colorIndex===index}" @click="changeColor(index)"  @dblclick.native="test02" class="fileFolder">
                  <el-dropdown trigger="click" size="medium" placement="bottom-end">
                    <div style="padding-top: 10px;padding-bottom: 10px">
                      <img v-if="folder.hasChild==true" :src="'/static/image/file/tower-folder.png'"
                           class="image" style="text-align: center">
                      <img v-if="folder.hasChild==false" :src="'/static/image/file/tower-folder-empty.png'"
                           class="image" style="text-align: center">
                      <div style="padding: 2px;">
                        <span style="text-overflow: ellipsis;white-space: nowrap;overflow:hidden;">{{folder.categoryName}}</span>
                      </div>
                    </div>
                    <el-dropdown-menu>
                      <el-dropdown-item>
                        <span class="span-icon"><i class="el-icon-top-right"></i></span>
                        <span>打开</span><br/>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span class="span-icon"><i class="el-icon-download"></i></span>
                        <span>下载</span><br/>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span class="span-icon"><i></i></span>
                        <span>复制</span><br/>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span class="span-icon"><i></i></span>
                        <span>剪切</span><br/>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span class="span-icon"><i></i></span>
                        <span>移动到</span><br/>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span class="span-icon"><i class="el-icon-delete"></i></span>
                        <span>删除</span><br/>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span class="span-icon"><i></i></span>
                        <span>重命名</span><br/>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span class="span-icon"><i></i></span>
                        <span>属性</span><br/>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
            </el-row>
          </div>
          <div id="project-file-list">


          </div>

          <div id="createFolderDiv">
            <el-dialog :visible.sync="createFolderState" width="400px" top="300px" center>
              <el-form label-width="100px">
                <el-form-item label="文件夹名称">
                  <el-input v-model="folderName"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="createFolder">保存</el-button>
                  <el-button @click="createFolderState=false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  //引入公共样式
  import '../../../assets/css/tower.css'
  import $ from 'jquery'
  import app from '../../../utils/app'
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    components: {ElButton},
    name: "project-file",
    data() {
      return {
        rootPath: '',
        currentProjectId: '',
        projectName: '',
        projectFileViewSate: false,
        leftMenu:[{
          name:'最近使用',
          icon:'el-icon-time'
        },
          {
            name:'全部文件',
            icon:'el-icon-tickets'
          },
          {
            name:'图片',
            icon:''
          },
          {
            name:'文档',
            icon:''
          },
          {
            name:'音乐',
            icon:''
          },
          {
            name:'隐藏',
            icon:''
          },
          {
            name:'我的分享',
            icon:''
          },
          {
            name:'回收站',
            icon:'el-icon-delete'
          }],
        queryData: '',
        newFileName: '新建文件夹',
        folderList: [],
        parentId: 0, //文件目录parentId默认等于0
        createFolderState: false,
        folderName: '',
        colorIndex: -1,
        leftColorIndex:-1
      }
    },
    created() {
      const $this = this;
      $this.rootPath = app.common.getRootPath();
      $this.currentProjectId = $this.$route.query.projectId;
      $this.projectName = $this.$route.query.projectName;
      $this.getAllFolder();
    },
    methods: {
      queryFileData: function () {
        const $this = this;
        console.log($this.queryData);
      },
      getAllFolder: function () {
        const $this = this;
        const projectId = $this.currentProjectId;
        $.ajax({
          url: $this.rootPath + "projectFileCategory/getAllFolder",
          type: "get",
          data: {
            projectId: projectId
          },
          dataType: "json",
          success: function (result) {
            if (result.length > 0) {
              $this.folderList = result;
            }
          }
        });
      },
      createFolder: function () {
        const $this = this;
        const parentId = $this.parentId;
        const projectId = $this.currentProjectId;
        const folderName = $this.folderName;
        $.ajax({
          url: $this.rootPath + "projectFileCategory/add",
          type: "post",
          data: {
            pid: parentId,
            projectId: projectId,
            categoryName: folderName
          },
          dataType: "json",
          success: function (result) {
            if (result.status == 'success') {
              $this.createFolderState = false;
              $this.getAllFolder();
            }
          }
        });
      },
      changeColor: function (index) {
       const  $this=this;
        this.colorIndex = index;
      },
      changeLeftColor: function(index){
        const  $this=this;
        this.leftColorIndex = index;
      },
      test02: function () {
        console.log(2)
      }

    }
  }
</script>

<style scoped>

  #project-file-content {
    width: 100%;
    height: 910px;
    margin: 0px auto;
    background: #F4F7ED;
    margin-top: 3px;
  }

  #project-file-main {
    width: 1000px;
    height: 860px;
    margin: 0px auto;
    margin-top: 10px;
    background: white;
  }

  #project-file-head {
    height: 40px;
  }

  #project-file-head i {
    font-size: 25px;
  }

  .project-file {
    height: 860px;
  }

  #project-file-left {
    width: 150px;
    background: #F9FAFB;

  }

  #project-file-left-content {
    width: 150px;
    height: 860px;
    border: 1px solid #D6D8DD;
  }

  #project-file-right {
    width: 850px;
  }

  /**
  设置左侧菜单
   */

  #project-file-left ul {
    list-style-type: none;
    padding: 0px;
    margin: 0px;
  }

  #project-file-left ul li {
    height: 40px;
    border-left: 2px solid white;
    padding-left: 3px;
    padding-top: 15px;
  }

  #project-file-left ul li:hover, #project-file-left ul li:focus {
    background: #E0F2FB;
    border-left: 2px solid #06A8FF;
  }

  #project-file-head-menu {
    border: 1px solid #D6D8DD;
    border-left: none;
    height: 60px;
  }

  .ul-menu ul {
    padding: 0px 0px 0px 2px;
  }

  /**
  设置右侧菜单
   */
  #project-file-head-menu li {
    border: 1px solid white;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 6px;
    padding-bottom: 6px;
  }

  #project-file-head-menu li:hover {
    border: 1px solid #44ACB6;
  }

  /**
  设置bottom菜单中
   */
  #project-file-bottem-menu {
    border: 1px solid #F0F0F0;
    border-right: 1px solid #D6D8DD;
    border-left: none;
    padding-left: 15px;
    height: 40px;
  }

  #project-file-bottem-menu ul {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  #project-file-bottem-menu li {
    padding: 0px;
  }

  #project-file-bottem-menu i {
    font-size: 20px;
  }

  #project-file-viewData {
    height: 758px;
    border-right: 1px solid #D6D8DD;
    border-bottom: 1px solid #D6D8DD;
    border-top: 1px solid #D6D8DD;
  }

  /**
  设置滚动条
   */
  .dropDown-style {
    position: absolute;
    top: 285px;
    left: 390px;
  }

  .span-icon {
    width: 20px;
    display: inline-block;
  }

  .activeColor  {
    background: #E0F2FB;
  }
  .leftActiveColor{
    background: #E0F2FB;
  }
  .fileFolder{
    padding: 0px 10px 0px 5px;
    width: 100px;
    border-radius: 2px;
  }
  .el-breadcrumb__inner{
    padding: 0px!important;
  }
  .el-breadcrumb__item{
    padding: 0px!important;
  }
</style>

