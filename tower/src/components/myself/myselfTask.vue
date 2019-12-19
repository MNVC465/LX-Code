<template>
    <div id="myselfTaskMain">
      <div id="taskSearch">

      </div>
      <div id="taskList">
        <div id="taskSearchmune">
          <el-row class="searchButton">
            <el-col :span="12" style="text-align: left">
              <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                   <el-button>排序:按截止日期<i class="el-icon-arrow-down"></i></el-button>
                  </span>
                <el-dropdown-menu>
                  <el-dropdown-item>按截止日期</el-dropdown-item>
                  <el-dropdown-item>按创建日期</el-dropdown-item>
                  <el-dropdown-item>手动排序</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                  <el-button>所有项目<i class="el-icon-arrow-down"></i></el-button>
                  </span>
                <el-dropdown-menu>
                  <el-dropdown-item>所有项目</el-dropdown-item>
                  <el-dropdown-item>Tower系统开发</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="12" style="text-align: right">
               <span><router-link to="/myselfIndex/myselfTask">查看已完成任务</router-link></span>
               <span><router-link to="/myselfIndex/myselfTask">查看创建的任务</router-link></span>
            </el-col>
          </el-row>
        </div>
        <div id="takListItem" v-for="(o, index) in 3" :key="o" :offset="1">
          <el-row class="item">
            <el-col :span="16" style="text-align: left;padding-left: 20px">
              <el-checkbox v-model="checked"></el-checkbox>
              <el-tag type="danger">bug</el-tag>
              <span id="taskName">【节假日设置】界面数据没有显示</span>
              <i class="el-icon-document"></i>
            </el-col>
            <el-col :span="6">
              <el-date-picker
                v-model="value1"
                type="date"
                size="small"
                placeholder="设置截止日期">
              </el-date-picker>
            </el-col>
            <el-col :span="2" class="more">
              <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                  <span>...更多</span>
                  </span>
                <el-dropdown-menu>
                  <el-dropdown-item> <span><i class="el-icon-delete"></i></span></el-dropdown-item>
                  <el-dropdown-item><span><i class="el-icon-edit-outline"></i></span></el-dropdown-item>
                  <el-dropdown-item><span><i class="el-icon-video-play"></i></span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "myself-task",
        data() {
          return {
            checked: true,
            value1:''
          }
        }
    }
</script>

<style>
   .searchButton{
     padding-top: 20px;
     padding-left: 30px;
     padding-right: 20px;
     padding-bottom: 10px;
   }

  /**
    设置操作列
   */
  #operationBtn{
    display: none;
  }





</style>
