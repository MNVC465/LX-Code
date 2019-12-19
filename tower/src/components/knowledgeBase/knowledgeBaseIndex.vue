<template>
  <div class="" id="knowledgeContainer">
    <div id="knowledgeMain" class="col">
      <div id="knowledge-main-wrap">
        <div id="head-breadcrumb" style="padding-top: 20px;padding-left: 20px;height: 50px;border-bottom: 1px solid #F6F6F6">
          <el-row>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </el-row>
        </div>
        <div id="knowledgeView">
           <router-view/>
        </div>

      </div>
    </div>
    <div id="knowledge-left" class="col">
      <el-tree :data="data" node-key="id" :props="defaultProps" :indent="18" accordion @node-click="handleNodeClick" style="font-size: 25px;background: #F6F6F6;padding-left: 5px ">
      </el-tree>
    </div>
    <div id="knowledge-right" class="col">
      <div id="rigth-head-menu" style="padding-top: 20px;height: 50px;border-bottom: 1px solid #F6F6F6">
        <el-row >
          <span><a href="javascript:;">#5603</a></span>
          <span><a href="javascript:;"><i class="el-icon-edit-outline"></i></a></span>
          <span><a href="javascript:;">...</a></span>
        </el-row>
      </div>
      <div id="operation" style="padding-top: 20px">
        <el-button style="color:white;background: #44ACB6; padding: 8px 12px"><i class="el-icon-plus">创建文档</i></el-button>
        <ul>
          <li><a href="javascript:;"><i class="el-icon-upload">上传文件</i></a></li>
          <li><a href="javascript:;"><i class="el-icon-upload">上传文件夹</i></a></li>
          <li><a href="javascript:;"><i class="el-icon-folder">创建文件夹</i></a></li>
          <li><a href="javascript:;"><i class="el-icon-notebook-1">从项目中添加文档和文件</i></a></li>
          <li><a href="javascript:;"><i class="el-icon-sort">文件排序</i></a></li>
          <li><a href="javascript:;"><i class="el-icon-delete">回收站</i></a></li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  //引入公共样式
  import '../../assets/css/tower.css'
  export default {
    name: "knowledge-base-index",
    data() {
      return {
        data: [{
          id: 1,
          icon:'el-icon-s-data',
          label: '一级 1',
          children: [{
            id: 4,
            icon:'',
            label: '二级 1-1',
            children: [{
              id: 9,
              icon:'',
              label: '三级 1-1-1'
            }, {
              id: 10,
              icon:'',
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          icon:'',
          label: '一级 2',
          children: [{
            id: 5,
            icon:'',
            label: '二级 2-1'
          }, {
            id: 6,
            icon:'',
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            icon:'',
            label: '二级 3-1'
          }, {
            id: 8,
            icon:'',
            label: '二级 3-2',
            children: [{
              id: 11,
              icon:'',
              label: '三级 3-2-1'
            }, {
              id: 12,
              icon:'',
              label: '三级 3-2-2'
            }, {
              id: 13,
              icon:'',
              label: '三级 3-2-3'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data.id);
      }
    }
  }
</script>

<style >
  body {min-width: 900px;margin:0;}
  .col {float: left;}
  #knowledgeMain {width: 100%;height: 950px;background-color: white;}
  #knowledge-main-wrap {margin: 0 220px 0 280px;}
  #knowledge-left {width: 280px;height: 950px;margin-left: -100%;border-right:1px solid #F6F6F6;background: #F6F6F6 }
  #knowledge-right {width: 220px;height: 950px;margin-left: -220px;}

  #head-breadcrumb .el-row .el-breadcrumb .el-breadcrumb-item{
    font-size: 25px;
  }

  #rigth-head-menu span a{
    text-decoration: none;
    color: #999999;
  }
  #rigth-head-menu span a:hover{
    text-decoration: none;
    color: #44ACB6;
  }

  #rigth-head-menu span{
    margin-right: 10px;
  }
  #operation{
    text-align: left;
  }
  #operation ul{
    list-style-type: none;
    padding-left: 0px;
  }
  #operation ul li{
    margin-top: 10px;
    margin-bottom:10px;
  }
  #operation ul a {
     color: #4EB1BC;
   }
  #operation ul a:hover {
    color: #44ACB6;
  }
</style>
