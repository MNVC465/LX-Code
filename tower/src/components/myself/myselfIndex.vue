<template>
  <div id="myself">
    <div id="myselfMessage">
      <img src="/static/image/qiang.png" id="userImage"/>
      <div id="baseMessage">
        <span id="userName">李强</span>
        <span id="userEmail">qiang.li@lxmed.com </span>
        <span id="userSign"> <a href="javascript:;"><i class="el-icon-edit"></i>填写工作签名</a></span>
      </div>
    </div>
    <div id="centerMenu">
      <el-row>
        <el-col :span="12" class="menuMssage">
          <span id="task"><router-link to="/myselfIndex/myselfTask">任务</router-link></span>
          <span id="collect"><router-link to="/projectIndex">收藏</router-link></span>
          <span id="schedule"><router-link to="/projectIndex">日程</router-link></span>
          <span id="report"><router-link to="/projectIndex">汇报</router-link></span>
          <span id="email"><router-link to="/projectIndex">邮件</router-link></span>
        </el-col>
        <el-col :span="12" class="loginMessage">
          <span><a href="javascript:;">上次登录:3小时前</a></span>
        </el-col>
      </el-row>
    </div>
    <div id="messageViewData">
      <router-view/>
    </div>

  </div>
</template>

<script>
  export default {
    name: "myself-index"
  }
</script>

<style>
  a {
    text-decoration: none;
    color: #44ACB6;
  }

  /**
    设置项目内容
   */
  #myself {
    width: 960px;
    min-height: 660px;
    margin: 0px auto;
    background: #FFFFFF;
    margin-top: 3px;
  }

  /**
   设置背景颜色
   */
  body {
    background: #F4F7ED;
  }

  /**
    设置用户头像
   */
  #userImage {
    text-align: left;
    border-radius: 50%;
    height: 90px;
    width: 90px;
    margin-left: 40px;
  }

  #myselfMessage {
    text-align: left;
    /*padding-top: 30px;*/
  }

  #baseMessage {
    display: inline-block;
    margin-left: 10px;
    margin-top: 30px;
  }

  #baseMessage span {
    display: block;
    margin-bottom: 15px;
  }

  #userSign a {
    color: #B1B1B1;
  }

  /**
    中间菜单
   */
  #centerMenu {
    border-bottom: 1px solid #E3E3E3;
    border-top: 1px solid #E3E3E3;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  #centerMenu span {
    padding-right: 8px;
  }
  #centerMenu a {
    color: #555555;
  }

  #centerMenu a:hover {
    color: #44ACB6;
  }

  .menuMssage {
    text-align: left;
    padding-left: 40px;
  }

  .loginMessage {
    text-align: right;
    padding-right: 20px;
  }

  #task {
    font-size: 20px;
  }

</style>
