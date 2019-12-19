<template>
  <div id="project-setting-content">
    <div id="project-setting-head">
      <div id="settingName" class="left">
        <router-link :to="{ path: '/projectViewPanel', query: {projectId: currentProjectId,projectName:projectName}}">
          <span><i class="el-icon-arrow-left"></i>{{projectName}}</span>
        </router-link>
      </div>
    </div>
    <div id="project-setting-main">
      <div id="projectSetting">
        <el-row class="align-left" style="padding-bottom: 10px"><span
          style="font-size: 20px;font-weight: 400;">项目设置</span></el-row>
        <el-form ref="project" :model="project" label-width="10px">
          <el-form-item class="align-left">
            <el-input placeholder="请输入项目名称" v-model="projectName" clearable style="width: 690px"></el-input>
          </el-form-item>
          <el-form-item class="align-left">
            <el-input type="textarea" placeholder="简单描述项目便于他人理解" rows="3" style="width: 690px"></el-input>
            <br/>
            <input type="radio" name="1"/><span>对访客隐藏敏感内容</span>
          </el-form-item>
          <el-form-item class="align-left">
            <span style="font-size: 16px;font-weight: 200">项目类型</span>
          </el-form-item>
          <el-form-item class="align-left">
            <input type="radio" name="2"/><span style="padding-left: 10px">清单模式</span><span
            style="color: #D3D3D3;padding-left: 10px">更好地组织、细分和管理任务，适用于一般项目管理 </span>
            <br/>
            <input type="radio" name="2"/><span style="padding-left: 10px">看板模式</span><span
            style="color: #D3D3D3;padding-left: 10px">擅长处理流程化任务，适用于产品研发、用户支持等场景</span>
          </el-form-item>
          <el-form-item class="align-left">
            <span style="font-size: 16px;font-weight: 200">项目公开性</span>
          </el-form-item>
          <el-form-item class="align-left">
            <input type="radio" name="3"/><span style="padding-left: 10px">私有项目</span><span
            style="color: #D3D3D3;padding-left: 10px">仅项目成员可以查看和编辑该项目  </span>
            <br/>
            <input type="radio" name="3"/><span style="padding-left: 10px">公开项目</span><span
            style="color: #D3D3D3;padding-left: 10px">任何人都可以通过链接查看该项目，仅项目成员可以编辑该项目</span>
          </el-form-item>
          <el-form-item class="align-left">
            <span style="font-size: 16px;font-weight: 200">项目分组</span>
          </el-form-item>
          <el-form-item class="align-left">
            <input type="checkbox" name="4"/><span style="padding-left: 10px">个人日常工作</span>
            <input type="checkbox" name="4"/><span style="padding-left: 10px">临床项目</span>
            <input type="checkbox" name="4"/><span style="padding-left: 10px">公司管理</span>
            <input type="checkbox" name="4"/><span style="padding-left: 10px">非临床项目</span>
          </el-form-item>
          <el-form-item class="align-left">
            <el-button type="primary">保存设置</el-button>
          </el-form-item>
          <el-form-item class="align-left" style="margin: 10px 0px 10px 0px">
            <div style="border-bottom: 1px solid #D3D3D3"></div>
          </el-form-item>
        </el-form>
      </div>
      <div id="projectModelSetting">
        <el-form ref="project" :model="project" label-width="10px">
          <el-form-item class="align-left">
            <div><span>调整项目模块</span></div>
            <div><span style="color: #D3D3D3">你可以拖动模块调整位置，隐藏的模块可随时恢复。</span></div>
          </el-form-item>
          <el-form-item>
            <el-row class="align-left taskDiv boder-bottom">
              <span><i class="el-icon-circle-check"></i></span><span style="padding-left: 10px">任务</span> <span
              class="right white-color">隐藏</span>
            </el-row>
            <el-row class="align-left taskDiv boder-bottom">
              <span><i class="el-icon-chat-dot-round"></i></span><span style="padding-left: 10px">讨论</span> <span
              class="right white-color">隐藏</span>
            </el-row>
            <el-row class="align-left taskDiv boder-bottom">
              <span><i class="el-icon-folder"></i></span><span style="padding-left: 10px">文件</span> <span
              class="right white-color">隐藏</span>
            </el-row>
            <el-row class="align-left taskDiv boder-bottom">
              <span><i class="el-icon-document"></i></span><span style="padding-left: 10px">文档</span> <span
              class="right white-color">隐藏</span>
            </el-row>
            <el-row class="align-left taskDiv boder-bottom">
              <span><i class="el-icon-date"></i></span><span style="padding-left: 10px">日程</span> <span
              class="right white-color">隐藏</span>
            </el-row>
          </el-form-item>
        </el-form>

        <el-form ref="project" :model="project" label-width="10px">
          <el-form-item>
            <el-row class="align-left center">
              <div class="left" style="width: 70%">
                <span style="padding-left: 10px">管理项目成员</span><br/>
                <span style="color: #D3D3D3;padding-left: 10px">设置团队内可以访问当前项目的成员 </span>
              </div>
              <div class="right">
                <el-button type="primary">管理项目成员</el-button>
              </div>
            </el-row>
            <el-row class="align-left center">
              <div class="left" style="width: 70%">
                <span style="padding-left: 10px">管理标签</span><br/>
                <span style="color: #D3D3D3;padding-left: 10px">设置当前项目可用的标签。 </span>
              </div>
              <div class="right center">
                <router-link :to="{ path: '/projectTags', query: {projectId: currentProjectId,projectName:projectName}}">
                  <el-button type="primary">管理标签</el-button>
                </router-link>
              </div>
            </el-row>
            <el-row class="align-left">
              <div class="left" style="width: 70%">
                <span style="padding-left: 10px">任务自定义字段</span><br/>
                <span style="color: #D3D3D3;padding-left: 10px">设置当前项目可使用的任务自定义字段。</span>
              </div>
              <div class="right center">
                <el-button type="primary">任务自定义字段</el-button>
              </div>
            </el-row>
            <el-row class="align-left">
              <div class="left" style="width: 70%">
                <span style="padding-left: 10px">导出任务</span><br/>
                <span style="color: #D3D3D3;padding-left: 10px">将项目中所有的任务导出成表格，方便自行统计整理。 </span>
              </div>
              <div class="right center">
                <el-button type="primary">导出任务</el-button>
              </div>
            </el-row>
            <el-row class="align-left">
              <div class="left" style="width: 70%">
                <span style="padding-left: 10px">归档项目</span><br/>
                <span style="color: #D3D3D3;padding-left: 10px">项目归档后，将不再出现在 Tower 里。你可以通过激活操作，将项目重新恢复正常。</span>
              </div>
              <div class="right center">
                <el-button type="primary">了解,归档这个项目</el-button>
              </div>
            </el-row>
            <el-row class="align-left">
              <div class="left" style="width: 70%">
                <span style="padding-left: 10px">复制成项目模板</span><br/>
                <span style="color: #D3D3D3;padding-left: 10px">把这个项目复制为项目模板，将只保留此项目里未完成的任务清单和任务，不会保留评论。</span>
              </div>
              <div class="right center">
                <el-button type="primary">复制成项目模板</el-button>
              </div>
            </el-row>
            <el-row class="align-left">
              <div class="left" style="width: 60%">
                <span style="padding-left: 10px">删除项目</span><br/>
                <span style="color: #D3D3D3;padding-left: 10px">项目删除后，所有的内容也将被立刻删除，请谨慎操作。</span>
              </div>
              <div class="right center">
                <el-button type="danger">了解风险，删除这个项目</el-button>
              </div>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  //引入公共样式
  import '../../assets/css/tower.css'
  import $ from 'jquery'
  import app from '../../utils/app'
  import ElInput from "element-ui/packages/input/src/input";

  export default {
    components: {ElInput},
    name: "project-setting",
    data() {
      return {
        rootPath: '',
        currentProjectId: '',
        projectName: '',
        project: {}
      }
    },
    created() {
      const $this = this;
      $this.rootPath = app.common.getRootPath();
      $this.currentProjectId = $this.$route.query.projectId;
      $this.projectName = $this.$route.query.projectName;
    },

    methods: {}
  }
</script>

<style scoped>

  #project-setting-content {
    width: 100%;
    min-height: 870px;
    margin: 0px auto;
    background: #FFFFFF;
    margin-top: 3px;
  }

  #project-setting-main {
    width: 700px;
    min-height: 750px;
    margin: 0px auto;
    margin-top: 10px;
  }

  #project-setting-head {
    height: 60px;
  }

  #project-setting-head i {
    font-size: 25px;
  }

  #settingName {
    padding: 10px 0px 0px 25px;
    font-size: 20px;
  }

  .el-form-item {
    margin: 5px;
  }
  .center{
    position: relative;
    top: 15px;
  }
</style>



