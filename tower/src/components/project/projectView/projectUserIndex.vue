<template>
  <div id="project-user-content">
    <div id="project-user-head">
      <div id="projectName" class="left">
        <router-link :to="{ path: '/projectViewPanel', query: {projectId: currentProjectId,projectName:projectName}}">
          <span><i class="el-icon-arrow-left"></i>{{projectName}}</span>
        </router-link>
      </div>
    </div>
    <div id="project-user-main">
      <div>
        <el-row>
          <div id="projectMenberNum">
            <span>项目成员</span><span class="numView">{{tempProjectUserList.length}}</span>
          </div>
        </el-row>
        <el-row>
          <div id="projectMenuType" class="ul-menu">
            <ul class="left">
              <li ><a href="javascript:;" class="menberTypeSign" @click="getManagerList($event)"><span>项目管理员</span><span>{{managerNum}}</span></a></li>
              <li><a href="javascript:;" @click="getMenberList($event)"><span>普通成员</span><span>{{menberNum}}</span></a></li>
              <li><a href="javascript:;" @click="getVisitorrList($event)"><span>项目游客</span><span>{{visitor}}</span></a></li>
            </ul>
          </div>
        </el-row>
        <el-row>
          <div id="projectUserMenu" class="ul-menu align-left">
            <ul class="left">
              <li><a href="javascript:;">
                <el-button type="primary" @click="projectAddUser"><i class="el-icon-plus"></i>新增</el-button>
              </a></li>
              <li><a href="javascript:;">
                <el-button :disabled="disabledFlag" class="disabledFlag" @click="projectChangeUserState=true">
                  调整项目角色
                </el-button>
              </a></li>
              <li><a href="javascript:;">
                <el-button :disabled="disabledFlag" class="disabledFlag" @click="removeProjectUserRole">移除项目
                </el-button>
              </a></li>
            </ul>
            <ul class="right">
              <li><a href="javascript:;">
                <el-input v-model="userName" placeholder="输入成员名称"></el-input>
              </a></li>
            </ul>
          </div>
        </el-row>
        <div id="project-user-view">
          <el-row style="margin-bottom: 10px">
            <el-col :span="18" class="align-left">
              <input type="checkbox" name="userCheckAll"/>
              <span>名字</span></el-col>
            <el-col :span="6" class="align-left">成员分组</el-col>
          </el-row>
          <el-row class="list-view-boder" v-for="(menber, index) in menberList" :key="index">
            <el-col :span="18" class="align-left" @click.native="changeUserSate(menber.id)">
              <input type="checkbox" :value="menber.user.id" name="userCheck" v-model="checkedList"/>
              <img :src="menber.user.icon" class="userImageMin menberUser"/>
              <span>{{menber.user.name}}</span>
            </el-col>
            <el-col :span="6" class="align-left"></el-col>
          </el-row>
        </div>
        <el-row>
          <div id="projectMenberChange">
            <span>成员变化记录</span>
          </div>
        </el-row>
        <el-row>
          <div id="projectMenberReturn" style="font-size: 25px;padding-left: 40px;text-align: left;padding-top: 20px">
            <el-button type="danger">退出项目</el-button>
          </div>
        </el-row>
      </div>
    </div>

    <!--调整角色-->
    <div id="project-change-user">
      <el-dialog :visible.sync="projectChangeUserState" width="400px" top="300px" center class="user-dialog">
        <div>
          <el-form label-width="80px">
            <el-row>
              <div class="form-inline-block"><span style="font-size: 25px;font-weight: 200">调整角色为</span></div>
            </el-row>
            <el-row>
              <div class="inline-block form-inline-block">
                <input type="radio" name="userRadio" v-model="checkedValue" value="1" class="from-radio"/>
              </div>
              <div class="inline-block">
                <span class="span-font-size">项目管理员</span><br/>
                <span class="span-top">可以管理所有项目内容与项目成员</span>
              </div>
            </el-row>
            <el-row>
              <div class="inline-block form-inline-block">
                <input type="radio" name="userRadio" v-model="checkedValue" value="0" class="from-radio"/>
              </div>
              <div class="inline-block">
                <span class="span-font-size">普通成员</span><br/>
                <span class="span-top">可以创建与编辑项目内容</span>
              </div>
            </el-row>
            <el-row>
              <div class="inline-block form-inline-block">
                <input type="radio" name="userRadio" v-model="checkedValue" value="2" class="from-radio"/>
              </div>
              <div class="inline-block">
                <span class="span-font-size">项目访客</span><br/>
                <span class="span-top">可查看访客可见的项目内容与完成任务</span>
              </div>
            </el-row>
            <el-row class="form-inline-block">
              <el-button type="primary" @click="changeProjectUserRole">修改所选{{checkedList.length}}人角色</el-button>
              <el-button type="success" @click="projectChangeUserState=false">取消</el-button>
            </el-row>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!--添加项目用户-->
    <div id="project-user-add">
      <el-dialog :visible.sync="projectAddUserState" width="600px" top="200px" center>
        <div id="addUserContetnt">
          <div id="add-user-head" class="form-inline-block span-top">
            <span style="font-size: 25px">{{addUserTypeDesc}}</span>
          </div>
          <div>
            <el-row style="margin-bottom: 10px">
              <el-col :span="18" class="align-left">
                <input type="checkbox" name="userCheckAll"/>
                <span>名字</span></el-col>
              <el-col :span="6" class="align-left">成员分组</el-col>
            </el-row>
          </div>
          <div id="add-user-list">
            <el-row v-for="(user, index) in userList" :key="index" class="list-view-boder">
              <el-col :span="18" class="align-left">
                <input type="checkbox" :value="user.id" name="userCheck" v-model="checkUserList"/>
                <img :src="user.icon" class="userImageMin menberUser"/>
                <span>{{user.name}}</span>
              </el-col>
              <el-col :span="6" class="align-left"></el-col>
            </el-row>
          </div>
          <div style="padding-top: 20px">
            <el-row>
              <el-button type="primary" @click="submitProjectUser">确定</el-button>
              <el-button type="warning" @click="projectAddUserState=false">取消</el-button>
            </el-row>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  //引入公共样式
  import '../../../assets/css/tower.css'
  import $ from 'jquery'
  import app from '../../../utils/app'
  import ElButton from "element-ui/packages/button/src/button";
  import ElRadio from "element-ui/packages/radio/src/radio";

  export default {
    components: {
      ElRadio,
      ElButton
    },
    name: "project-user-index",
    data() {
      return {
        rootPath: '',
        currentProjectId: '',
        projectName: '',
        userName: '',
        menberList: [],
        tempProjectUserList: [],
        managerNum: 0,
        menberNum: 0,
        visitor: 0,
        checkedList: [],
        disabledFlag: 'disabled',
        menberType: 1, //默认项目管理员,
        projectChangeUserState: false,
        projectUser: {},
        checkedValue: 0,
        projectAddUserState: false,
        addUserTypeDesc: '',
        checkUserList: [],
        userList: []
      }
    },
    created() {
      const $this = this;
      $this.rootPath = app.common.getRootPath();
      $this.currentProjectId = $this.$route.query.projectId;
      $this.projectName = $this.$route.query.projectName;
      $this.getUserList();
    },
    watch: {
      userName: function (newUserName, oldUserName) { //监听用户输入查询
        const $this = this;
        if (newUserName == "" || newUserName == null) {
          $this.menberList = $this.getUserList();
        } else {
          $this.menberList = $this.menberList.filter(function (menber) {
            if (menber.user.name.search(newUserName) != -1) {
              return menber;
            }
          });
        }
      }
    },
    methods: {
      getUserList: function () {
        const $this = this;
        $.ajax({
          url: $this.rootPath + "projectUser/findByProjectUser",
          type: "get",
          data: {
            projectId: $this.currentProjectId
          },
          dataType: "json",
          success: function (result) {
            if (result.length > 0) {
              $this.tempProjectUserList = result;
              $this.managerNum = 0;
              $this.menberNum = 0;
              $this.visitor = 0;
              $this.menberList = $this.tempProjectUserList.filter(function (projectUser) {
                if (projectUser.userType == 1 || projectUser.userType == 3) {
                  $this.managerNum++;
                  return projectUser;
                } else if (projectUser.userType == 0) {
                  $this.menberNum++;
                } else if (projectUser.userType == 2) {
                  $this.visitor++;
                }
              });
            }
          }
        });
      },
      getManagerList: function (e) {
        const $this = this;
        $this.showMenberSign(e.target)
        $this.menberType = 1;
        $this.menberList = $this.tempProjectUserList.filter(function (projectUser) {
          if (projectUser.userType == 1 || projectUser.userType == 3) {
            return projectUser;
          }
        });
      },
      getMenberList: function (e) {
        const $this = this;
        $this.showMenberSign(e.target)
        $this.menberType = 0;
        $this.menberList = $this.tempProjectUserList.filter(function (projectUser) {
          if (projectUser.userType == 0) {
            return projectUser;
          }
        });
      },
      getVisitorrList: function (e) {
        const $this = this;
        $this.showMenberSign(e.target)
        $this.menberType = 2;
        $this.menberList = $this.tempProjectUserList.filter(function (projectUser) {
          if (projectUser.userType == 2) {
            return projectUser;
          }
        });
      },
      changeUserSate: function (userId) {
        const $this = this;
        if (!userId) {
          return false;
        }
        $(".disabledFlag").removeClass("is-disabled");
        $(".disabledFlag").removeAttr("disabled");

      },
      changeProjectUserRole: function () {  //调整项目角色
        const $this = this;
        const checkedValue = $this.checkedValue;
        const checkedList = $this.checkedList;
        if (checkedList.length == 0) {
          return false;
        }
        $.ajax({
          url: $this.rootPath + "projectUser/changeUserRole",
          type: "post",
          data: {
            menberType: checkedValue,
            checkedList: checkedList.join(",")
          },
          dataType: "json",
          success: function (result) {
            if (result.status == "success") {
              $this.getUserList();
              //清除页面上被选择的
              $this.checkedList = [];
              $this.projectChangeUserState = false;
            }
          }
        });
      },
      removeProjectUserRole: function () {
        const $this = this;
        const checkedList = $this.checkedList;
        if (checkedList.length == 0) {
          return false;
        }
        $.ajax({
          url: $this.rootPath + "projectUser/removeProjectUser",
          type: "post",
          data: {
            checkedList: checkedList.join(",")
          },
          dataType: "json",
          success: function (result) {
            if (result.status == "success") {
              $this.getUserList();//清除页面上被选择的
              $this.checkedList = [];
            }
          }
        });
      },
      projectAddUser: function () {
        const $this = this;
        $this.projectAddUserState = true;
        const addUserTypeDes = ['新增项目成员', '新增项目管理员', '新增项目游客'];
        const menberType = $this.menberType;
        $this.addUserTypeDesc = addUserTypeDes[menberType];
        $this.getUserAllList();
      },
      getUserAllList: function () {
        const $this = this;
        $.ajax({
          url: $this.rootPath + "/system/user/findAll",
          type: "get",
          dataType: "json",
          success: function (result) {
            if (result.length > 0) {
              $this.userList = result;
            }
          }
        });
      },
      submitProjectUser: function () {
        const $this = this;
        const menberType = $this.menberType;
        const checkUserList = $this.checkUserList;
        if (checkUserList.length == 0) {
          return false;
        }
        const projectId = $this.currentProjectId;
        $.ajax({
          url: $this.rootPath + "projectUser/addUserByList",
          type: "post",
          data: {
            projectId: projectId,
            userType: menberType,
            checkUserList: checkUserList.join(",")
          },
          dataType: "json",
          success: function (result) {
            if (result.status == "success") {
              $this.getUserList();
              //清除页面上被选择的
              $this.checkUserList = [];
              $this.projectAddUserState = false;
            }
          }
        });
      },
      showMenberSign:function(dom){
        $("#projectMenuType li a").removeClass("menberTypeSign");
        $(dom).parent().addClass("menberTypeSign");
      }
    }
  }
</script>

<style scoped>

  #project-user-content {
    width: 100%;
    min-height: 970px;
    margin: 0px auto;
    background: #FFFFFF;
    margin-top: 3px;
  }

  #project-user-head {
    height: 60px;
  }

  #project-user-head i {
    font-size: 25px;
  }

  #projectName {
    padding: 10px 0px 0px 25px;
    font-size: 20px;
  }

  /*用户面板*/
  #project-user-main {
    width: 960px;
    min-height: 900px;
    margin: 0px auto;
    margin-top: 50px;
  }

  #projectMenberNum {
    font-size: 25px;
    padding-left: 40px;
    text-align: left;
    padding-top: 20px
  }

  .numView {
    padding: 5px;
    background: #D3D3D3;
    border-radius: 50%
  }

  #project-user-view {
    padding-left: 50px
  }

  #project-user-view .el-checkbox {
    padding-right: 8px;
    font-size: 20px;
  }
  #projectMenuType li a{
    padding-bottom: 5px;
    border-bottom: 2px solid white;
  }

  #projectMenuType li a:hover{
    border-bottom: 2px solid green;
  }

  .menberTypeSign{
    border-bottom: 2px solid green;
  }

  .list-view-boder {
    height: 60px;
  }

  .menberUser {
    position: relative;
    top: 15px
  }

  #projectMenberChange {
    font-size: 25px;
    padding-left: 40px;
    text-align: left;
    padding-top: 20px
  }

  .form-inline-block {
    margin: 10px 0px 10px 0px;
  }

  .from-radio {
    position: relative;
    top: -12px;
  }

  .span-font-size {
    font-size: 18px;
  }

  .span-top {
    margin-top: 10px;
  }
</style>


<style>
  /*不能再scope中修改全局变量*/

  /**
   设置用户角色切换弹出层 #project-change-user
   */

  .el-dialog__body {
    padding-top: 10px !important;
    height: 450px;
  }

  .el-dialog__body #add-user-list {
    height: 300px;
    overflow: auto;
  }
</style>
