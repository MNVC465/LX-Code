<template>
  <div id="project-content">

    <!--项目顶部菜单-->
    <div id="project-top-menu-content">
      <el-row>
        <div id="left-menu" class="left">
          <span id="start"><i class="el-icon-star-off"></i></span>
          <span id="allProject"><a href="javascript:;">所有项目</a></span>
          <span @click="projectTempldateShow()"><a href="javascript:;" >项目模板</a></span>
        </div>
        <div id="right-menu" class="right">
          <span><a href="javascript:;" id="createProject" @click="getProjectTypeList">新建项目</a></span>
          <span @click="showProjectView(true)"><i class="el-icon-s-grid"></i></span>
          <span @click="showProjectView(false)"><i class="el-icon-s-unfold"></i></span>
        </div>
      </el-row>
    </div>

    <!--项目card卡片布局-->
    <div id="project-card-content" v-if="projectViewSate==true">
      <el-row>
        <el-col :span="5" v-for="(project, index) in projectList" :key="index" :offset="1">
          <router-link
            :to="{ path: '/projectViewPanel', query: {projectId: project.id,projectName:project.projectName}}">
            <div style="padding: 3px">
              <el-card :body-style="{ padding: '0px' }">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                     class="image" style="text-align: center">
                <div style="padding: 14px;">
                  <span>{{project.projectName}}</span>
                </div>
              </el-card>
            </div>
          </router-link>
        </el-col>
      </el-row>

    </div>

    <!--项目list 列表布局-->
    <div id="project-list-content" v-if="projectViewSate==false">
      <el-row v-for="(project, index) in projectList" :key="index" class="list-hide-div">
        <router-link :to="{ path: '/projectViewPanel', query: {projectId: project.id,projectName:project.projectName}}">
          <div style="">
            <el-col :span="14" :offset="1">
              <a href="javascript:;">
                <span><i class="el-icon-s-tools"></i></span>
                <span>{{project.projectName}}</span>
              </a>
            </el-col>
            <el-col :span="2" :offset="1">
              <a href="javascript:;" class="list-hide">
                <span><i class="el-icon-star-on"></i></span>
              </a>
            </el-col>
            <el-col :span="6">
              <a href="javascript:;" class="list-hide">
                <span>待处理任务</span><span id="projectTaskNumber">{{projectList.length==0?"":projectList.length}}</span>
              </a>
            </el-col>
          </div>
        </router-link>
      </el-row>
    </div>

    <!--项目新建-->
    <div id="project-create-content">
      <el-dialog :visible.sync="centerDialogVisible" width="50%" top="200px" center>
        <el-row class="projectType"><span>选择项目类型</span></el-row>
        <el-row class="projectTypeList">
          <el-col :span="7" v-for="(projectType, index) in projectTypeList" :key="index" :offset="1">
            <div @click="selectProjectType(projectType.type)">
              <el-card :body-style="{ padding: '0px' }" :class="'projectTypeDiv'+projectType.type+''">
                <img :src="'/static/image/projectType/' + projectType.typeIcon + '.png'"
                     class="image">
                <div>
                  <span class="projectTypeName">{{projectType.typeName}}</span>
                  <div class="bottom clearfix">
                    <span>{{projectType.typeDesc}}</span>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>

        </el-row>
        <el-row class="createProjectNext">
          <el-button @click="nextStep">下一步</el-button>
        </el-row>
        <el-row class="projectDemo"><span>💡想获取规划项目的灵感?<a href="javascript:;">来看看我们的样板间吧</a></span></el-row>
      </el-dialog>
    </div>

    <!-- 项目form表单-->
    <div id="project-form-div">
      <el-dialog :visible.sync="projectFormSate" width="40%" top="200px" center>
        <el-row><span>{{projectTypeName}}</span></el-row>
        <el-form ref="project" :model="project" label-width="80px">
          <el-form-item label="项目图标">
            <span><i class="el-icon-setting"></i></span>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="project.projectName"></el-input>
          </el-form-item>
          <el-form-item label="项目描述">
            <el-input type="textarea" v-model="project.description" rows="10"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="projectFormSate=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 项目模板-->
      <div id="project-template-div" style="margin-top: 10px;margin-bottom: 10px">
        <el-dialog :visible.sync="projectTemplateViewVisible" width="700px" top="100px" style="height:660px" center>
          <el-row style="text-align: left;margin-bottom: 20px">
            <span>项目模板</span>
            <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                   <span>创建项目模板</span><i class="el-icon-caret-bottom"></i>
                  </span>
              <el-dropdown-menu>
                <el-dropdown-item>标准项目模板</el-dropdown-item>
                <el-dropdown-item>看板项目模板</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
          <div id="project-list-copy">
            <el-row v-for="(project, index) in projectList" :key="index" class="project-template-list list-hide-div">
              <el-col :span="12" style="text-align: left">
                <a href="javascript:;">
                  <span><i class="el-icon-s-tools"></i></span>
                  <span>{{project.projectName}}</span>
                </a>
              </el-col>
              <el-col :span="6">
                <a href="javascript:;" class="list-hide"><span>复制模板</span></a>
              </el-col>
              <el-col :span="6">
                <a href="javascript:;" class="list-hide"><span>生成新项目</span></a>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
      </div>
    </div>

    <!--&lt;!&ndash;  项目模板&ndash;&gt;
    <div id="project-template">
      <el-row>
        <a href="javascript:;" @click="projectTempldateShow()"><span>项目模板</span></a>
      </el-row>
    </div>-->


  </div>
</template>

<script>
  import '../../assets/css/tower.css'
  import $ from 'jquery'
  import app from '../../utils/app'

  export default {
    name: "project-index",
    data() {
      return {
        rootPath: '',  //项目根路径
        centerDialogVisible: false,
        projectViewSate: true,
        centerDialogVisible: false,
        projectFormSate: false,
        projectTemplateViewVisible: false,
        projectTypeName: '',
        project: {projectName: '', description: '', icon: ''},
        projectType: 0,
        activeStyle: '',
        projectList: [],
        projectTypeList: []
      }
    },
    created() {
      this.rootPath = app.common.getRootPath();
      this.getProjectList();

    },
    methods: {
      showProjectView(sate) {  //项目面板切换
        this.projectViewSate = sate;
      },
      selectProjectType(type) {//项目类型选择
        const projectType = this.projectType;
        this.projectType = type;
        if (projectType != 0) {
          $(".projectTypeDiv" + projectType).removeClass("projectSelectStyle");
        }
        $(".projectTypeDiv" + type).addClass("projectSelectStyle");
      },
      nextStep() {
        const projectTypeNum = this.projectType;
        if (projectTypeNum == 0) {
          this.$alert('请选择对应项目类型', '提醒内容', {
            confirmButtonText: '确定'
          });
          return false;
        }
        this.centerDialogVisible = false;
        const projectType = this.projectTypeList.filter(function (projectType) {
          if (projectType.type == projectTypeNum) {
            return projectType;
          }
        });
        this.projectTypeName = "创建" + projectType[0].typeName;
        this.projectFormSate = true;
      },
      projectTempldateShow() {
        this.projectTemplateViewVisible = true;
      },
      onSubmit() { //新建项目
        const $this = this;
        const project = $this.project;
        const projectName = project.projectName.trim();
        const description = project.description.trim();
        if (projectName != "" && description != "") {
          $.ajax({
            url: $this.rootPath + "project/add",
            type: "post",
            data: {
              projectType: $this.projectType,
              projectName: projectName,
              description: description
            },
            dataType: "json",
            success: function (result) {
              if (result.status == 'success') {
                $this.projectFormSate = false;
                $this.projectList.push(project);
              } else {
                $this.projectFormSate = true;
              }
            }
          });
        }
      },
      getProjectList: function () {  //获取所有的项目信息
        const $this = this;
        const userId = app.storage.getValue("userId");
        $.ajax({
          url: $this.rootPath + "project/projectList",
          type: "get",
          data: {
            userId: 121
          },
          dataType: "json",
          success: function (result) {
            if (result) {
              $this.projectList = result;
            }
          }
        });
      },
      getProjectTypeList: function () { //获取项目类型
        const $this = this;
        $.ajax({
          url: $this.rootPath + "projectType/findAll",
          type: "get",
          dataType: "json",
          success: function (result) {
            if (result) {
              $this.centerDialogVisible = true
              $this.projectTypeList = result;
            }
          }
        });
      }
    }
  }
</script>

<style scoped>

  /**
    设置项目内容
   */
  #project-content {
    width: 960px;
    min-height: 770px;
    margin: 0px auto;
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    border-radius: 6px;
    position: relative;
  }

  /*顶部左侧菜单设置*/
  #left-menu {
    padding: 10px 0px 10px 20px;
  }

  #left-menu i, #left-menu a {
    font-size: 18px;
    padding: 8px 12px 8px 12px;
    border-radius: 15px;
    border: 1px solid #ccc;
  }

  #start i:hover {
    color: #F7F700;
  }

  #allProject a {
    color: white;
    background: #44ACB6;
  }

  /*顶部右侧菜单设置*/
  #right-menu {
    padding: 10px 10px 10px 0px;
  }

  #right-menu i, #right-menu a {
    font-size: 18px;
  }

  #createProject {
    color: #63BBC5;
  }

  #createProject:hover {
    color: #44ACB6;
  }

  /**
   card 布局
  */
  #project-card-content :hover {
    color: #44ACB6;
  }

  /**
  设置项目列表
   */
  #project-list-content {
    margin-top: 15px;
    padding-left: 20px;
    padding-right: 10px;
  }

  #project-list-content .el-row {
    text-align: left;
    padding-bottom: 15px;
    padding-top: 15px;
    font-size: 18px;
    border-top: 1px solid #E3E3E3;
    border-bottom: 1px solid #E3E3E3;
  }

  #projectTaskNumber {
    font-size: 25px;
  }

  /**
  项目新建
   */
  .projectType {
    text-align: center;
    padding-bottom: 15px;
    font-size: 20px;
    font-weight: 400;
  }

  .projectTypeList {
    text-align: center;
    padding-top: 10px;
  }

  .projectTypeList .el-card {
    height: 220px;
  }

  .projectTypeName {
    padding-top: 10px;
    font-size: 20px;
    font-weight: 500;
  }

  /**
  设置点击项目类型是的样式
  */
  .projectSelectStyle {
    background: #E2F7F8;
    border: 1px solid #E2F7F8;
  }

  /**
  下一步
   */
  .createProjectNext {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;

  }

  .createProjectNext .el-button {
    padding: 10px 50px 10px 50px;
    color: white;
    background: #44ACB6;
  }

  /**
  样品展示
   */

  .projectDemo {
    background: #FFFACD;
    text-align: center;
    padding: 20px 0px 20px 0px;
  }

  .projectDemo a {
    color: #6DBFC9;
  }

  /**
    项目form
   */

  #project-form-div .el-row {
    text-align: center;
    padding-bottom: 10px;
    font-size: 22px;
  }

 /* !**
    项目模板设置
   *!
    #project-template {
    margin: 40px 0px 20px 0px;
    }

  #project-template span{
    font-size: 20px;
    font-weight: 400;
  }*/

  #project-template .el-row {
    text-align: left;
    padding-left: 20px;
  }

  .project-template-list {
    text-align: left;
    padding-bottom: 15px;
    padding-top: 15px;
    border-bottom: 1px solid #DDDDDD;
    border-top: 1px solid #DDDDDD;
  }

  .project-template-list a span {
    font-size: 18px;
  }

  .project-template-list:hover {
    background: #F4F7ED;
  }

</style>

<style>
  /*不能再scope中修改全局变量*/

  /**
   设置用户角色切换弹出层 #project-change-user
   */


  .el-dialog__body  #project-list-copy{
    height: 400px;
    overflow: auto;
  }
</style>
