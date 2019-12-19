<template>
  <div id="project-tags-content">
    <div id="project-tags-head">
      <div id="settingName" class="left">
        <router-link :to="{ path: '/projectSetting', query: {projectId: currentProjectId,projectName:projectName}}">
          <span><i class="el-icon-arrow-left"></i>{{settingName}}</span>
        </router-link>
      </div>
    </div>
    <div id="project-tags-main">
      <div id="project-main-head">
        <el-row class="align-left tagManager"><span>标签管理</span></el-row>
        <el-row class="align-left ">
          <span>标签分类</span><br/><br/>
          <input type="radio" name="tags" v-model="tagType" value="0" @click="changeTagList(0)"/> 任务标签
          <input type="radio" name="tags" v-model="tagType" value="1" @click="changeTagList(1)"/> 严重程度
        </el-row>
        <el-row class="align-left projectTagManager">
          <span>项目标签</span>
          <el-button @click="createTags=true">新建项目标签</el-button>
          <br/>
          <span class="dark-grey">仅在项目内使用，项目创建者可编辑</span>
        </el-row>
        <el-row v-if="createTags==true" class="align-left">
          <div id="createTags" class="left">
            <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
            <div class="inline-block" style="padding-left: 10px">
              <el-input v-model="tagsName" placeholder="请输入标签名称" style="position: relative;bottom: 13px"></el-input>
            </div>
          </div>
          <div class="right">
            <el-button type="success" @click="createProjectTag">创建标签</el-button>
            <el-button type="danger" @click="createTags=false">取消</el-button>
          </div>
        </el-row>
        <el-row class="align-left project-tag-all">
          <span>全局标签</span><br/>
          <span class="dark-grey">可在所有项目内使用，团队管理员可编辑</span>
        </el-row>
      </div>
      <div id="project-main-list">
        <el-row v-for="(tag,index) in projectTagList" class="align-left list-view-boder" :key="index">
          <el-col :span="16">
            <span :style="{'background':tag.tagColor}" class="tag-span-color-view"></span>
            <span class="tag-span-name-view">{{tag.tagName}}</span></el-col>
          <el-col :span="8" class="align-right tagmenu">
            <el-tooltip class="item" effect="dark" content="团队管理员可以编辑" placement="top">
              <span @click="projectTagUpdateView(tag.tagColor,tag.tagName,tag.id)"><a href="javascript:;">编辑</a></span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="团队管理员可以删除" placement="top">
              <span @click="projectTagDelete(tag.id)"><a href="javascript:;">删除</a></span>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
    </div>

    <div id="project-tag-update">
      <el-dialog :visible.sync="projectTagUpdateState" width="550px" top="300px" center class="user-dialog">
        <el-row class="align-left">
          <div id="updateTags" class="left">
            <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
            <div class="inline-block" style="padding-left: 10px">
              <el-input v-model="tagsName" placeholder="请输入标签名称" style="position: relative;bottom: 13px"></el-input>
            </div>
          </div>
          <div class="right">
            <el-button type="success" @click="projectTagUpdate">更新标签</el-button>
            <el-button type="danger" @click="projectTagUpdateState=false">取消</el-button>
          </div>
        </el-row>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  //引入公共样式
  import '../../assets/css/tower.css'
  import $ from 'jquery'
  import app from '../../utils/app'

  export default {
    name: "project-tags",
    data() {
      return {
        rootPath: '',
        currentProjectId: '',
        projectName: '',
        settingName: '项目设置',
        createTags: false,
        color: 'rgba(255, 69, 0, 0.68)',
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ],
        tagsName: '',
        projectTagList: [],
        tempProjectTagList:[],
        projectTagUpdateState: false,
        tagId: '',
        tagType:0
      }
    },
    created() {
      const $this = this;
      $this.rootPath = app.common.getRootPath();
      $this.currentProjectId = $this.$route.query.projectId;
      $this.projectName = $this.$route.query.projectName;
      $this.getProjectTags();
    },
    methods: {
      getProjectTags: function () {
        const $this = this;
        const tagType=$this.tagType;
        $.ajax({
          url: $this.rootPath + "projectTag/findTagByProjectId",
          type: "post",
          data: {
            projectId: $this.currentProjectId
          },
          dataType: "json",
          success: function (result) {
            if (result.length > 0) {
              $this.tempProjectTagList=result
              $this.projectTagList = result.filter(function(projectTag){
                 if(projectTag.type==tagType){
                   return projectTag;
                 }
              });
            }
          }
        });
      },
      createProjectTag: function () {
        const $this = this;
        const tagsName = $this.tagsName;
        const projectId = $this.currentProjectId;
        const color = $this.color;
        const tagType=$this.tagType;
        $.ajax({
          url: $this.rootPath + "projectTag/addTag",
          type: "post",
          data: {
            projectId: projectId,
            type: tagType,
            tagName: tagsName,
            tagColor: color
          },
          dataType: "json",
          success: function (result) {
            if (result.status == "success") {
              $this.getProjectTags();
              $this.createTags = false;
            }
          }
        });
      },
      projectTagUpdateView: function (color, tagsName, id) {
        const $this = this;
        $this.color = color;
        $this.tagsName = tagsName;
        $this.projectTagUpdateState = true;
        $this.tagId = id;
      },
      projectTagUpdate: function () {
        const $this = this;
        const tagColor = $this.color;
        const tagsName = $this.tagsName;
        const id = $this.tagId;
        $.ajax({
          url: $this.rootPath + "projectTag/updateTag",
          type: "post",
          data: {
            id: id,
            tagName: tagsName,
            tagColor: tagColor
          },
          dataType: "json",
          success: function (result) {
            if (result.status == "success") {
              $this.getProjectTags();
              $this.projectTagUpdateState = false;
            }
          }
        });
      },
      projectTagDelete: function (id) {
        const $this = this;
        $.ajax({
          url: $this.rootPath + "projectTag/deleteTag",
          type: "post",
          data: {
            id: id
          },
          dataType: "json",
          success: function (result) {
            if (result.status == "success") {
              $this.getProjectTags();
            }
          }
        });
      },
      changeTagList:function(type){
        const $this = this;
        $this.projectTagList = $this.tempProjectTagList.filter(function(projectTag){
          if(projectTag.type==type){
            return projectTag;
          }
        });
      }
    }
  }
</script>

<style scoped>

  #project-tags-content {
    width: 100%;
    min-height: 970px;
    margin: 0px auto;
    background: #FFFFFF;
    margin-top: 3px;
  }

  #project-tags-main {
    width: 700px;
    min-height: 750px;
    margin: 0px auto;
    margin-top: 10px;
  }

  #project-tags-head {
    height: 60px;
  }

  #project-tags-head i {
    font-size: 25px;
  }

  #settingName {
    padding: 10px 0px 0px 25px;
    font-size: 20px;
  }

  .tagManager {
    padding-bottom: 10px
  }

  .tagManager span {
    font-size: 20px;
    font-weight: 700;
  }

  .projectTagManager span, .projectTagManager .el-button {
    padding-right: 10px;
  }

  .el-row {
    padding: 10px 10px 10px 10px;
  }

  .project-tag-all {
    margin: 40px 0px 10px 0px
  }

  .project-tag-all span {
    padding-right: 10px;
    padding-top: 5px;
  }

  #project-main-list {
    margin-top: 20px;
  }

  .tagmenu span {
    padding-left: 10px;
  }


</style>
