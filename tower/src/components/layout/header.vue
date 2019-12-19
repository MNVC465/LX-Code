<template>
  <div id="headContent">
    <!--中间内容-->
    <div class="main col">
      <div class="middle ul-menu ">
        <ul>
          <li>
            <router-link to="/">项目</router-link>
          </li>
          <li>
            <router-link to="/knowledgeBaseIndex">知识库</router-link>
          </li>
          <li>
            <router-link to="/dynamicIndex">动态</router-link>
          </li>
          <li>
            <router-link to="/calendarIndex">日历</router-link>
          </li>
          <li>
            <router-link to="/analysisIndex">鹰眼</router-link>
          </li>
          <li>
            <router-link to="/reportIndex">汇报</router-link>
          </li>
          <li>
            <router-link to="/teamIndex">团队</router-link>
          </li>
          <li>
            <router-link to="/myselfIndex">我自己</router-link>
          </li>
          <li>
            <router-link to="/organizationIndex">组织</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--左侧菜单-->
    <div class="left col ul-menu">
      <ul>
        <li>
          <a href="javascript:;"><span id="companyName">{{companyName}}</span>&nbsp;
            <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                   <i class="el-icon-caret-bottom"></i>
                  </span>
              <el-dropdown-menu>
                <el-dropdown-item>创建新团队</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </a>
        </li>
      </ul>
    </div>
    <!--右侧菜单-->
    <div class="right ul-menu col">
      <ul>
        <li>
          <el-input placeholder="请输入内容"></el-input>
        </li>
        <li><i class="el-icon-circle-plus-outline"></i></li>
        <li><i class="el-icon-question"></i></li>
        <li><i class="el-icon-message-solid"></i></li>
      </ul>
    </div>
  </div>

</template>

<script>
  import '../../assets/css/tower.css'

  export default {
    name: "Header",
    data (){
      return {
        companyName:'凌先医药'
      }
    }
  }
</script>

<style scoped>

  #headContent {
    padding: 0;
    margin: 0;
    background: #F4F7ED;
    width: 100%;
    height: 60px;
  }

  .col {
    float: left;
  }

  .main {
    width: 100%;
    height: 60px;
  }

  /*中间菜单设置*/
  .middle {
    margin: 0 400px 0 280px;
    text-align: center!important;
  }

  .middle li{
    font-size: 20px;
  }

  /* 左侧菜单设置*/
  .left {
    width: 280px;
    height: 60px;
    margin-left: -100%;
  }

  .left li{
    font-size: 20px;
    font-weight: 700;
  }

  /*右侧菜单设置*/
  .right {
    width: 400px;
    height: 60px;
    margin-left: -400px;
  }

  .right li i{
    font-size: 25px;
    color: gray;
  }


</style>
