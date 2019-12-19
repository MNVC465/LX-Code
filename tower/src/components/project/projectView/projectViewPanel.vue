<template>
  <div id="project-panle-content">
    <div id="project-panle-head-menu">
      <!--顶部菜单-->
      <div id="top-menu">
        <div id="projectMenber" class="ul-menu">
          <ul class="left">
            <li class="userImageSpan projectName"><span>{{projectName}}</span></li>
            <li v-for="(menber, index) in menberList" :key="index" class="userImageLi">
              <el-tooltip class="item" effect="dark" :content="''+menber.user.name+''" placement="top">
                <img :src="menber.user.icon" class="userImageMin"/>
              </el-tooltip>
            </li>
            <li class="userImageSpan"><span>共{{menberList.length}}人</span></li>
            <li class="userImageSpan">
              <router-link
                :to="{ path: '/projectUserIndex', query: {projectId: currentProjectId,projectName:projectName}}">
                <el-button style="padding: 8px 12px"><i class="el-icon-plus"></i>添加成员</el-button>
              </router-link>
            </li>
          </ul>
          <ul class="right rightMenu">
            <li><span><i class="el-icon-info" @click="projectMessageState=true">信息</i></span></li>
            <li><span><i class="el-icon-s-marketing">进展</i></span></li>
            <li>
              <router-link
                :to="{ path: '/projectSetting', query: {projectId: currentProjectId,projectName:projectName}}">
                <span><i class="el-icon-s-tools">设置</i></span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!--底部菜单-->
      <div id="bottom-menu" class="ul-menu">
        <ul class="left">
          <li><a href="javascript:;">任务</a></li>
          <li><a href="javascript:;">讨论</a></li>
          <li>
            <router-link
              :to="{ path: '/projectFile', query: {projectId: currentProjectId,projectName:projectName}}">
              <span>文件</span>
            </router-link>
          </li>
          <li><a href="javascript:;">文档</a></li>
          <li><a href="javascript:;">日程</a></li>
        </ul>
        <ul class="right bottomRightMenu">
          <li><a href="javascript:;"><i class="el-icon-data-analysis"></i></a></li>
          <li><a href="javascript:;"><i class="el-icon-collection-tag"></i></a></li>
          <li><a href="javascript:;"><i class="el-icon-date"></i></a></li>
          <li><a href="javascript:;"><i class="el-icon-s-fold"></i></a></li>
          <li><a href="javascript:;"><i class="el-icon-menu"></i></a></li>
          <li><a href="javascript:;">...</a></li>
        </ul>
      </div>
    </div>
    <!--面板看板-->
    <div id="project-panle-view">
      <div class="listData">
        <draggable class="baseDraggable" :list="listParent" :group="fatherGroup"
                   @end="endParent">
          <div class="itemData" v-for="(element, index) in listParent" :key="index">
            <div class="list-group-parent">
              <div class="modelTask">
                <div class="detailedDiv">
                  <div class="modelTaskHead">
                    <span class="detailedListNum"> {{ element.list.length }}</span>
                    <span class="detailedName"><a href="javascript:;">{{ element.modelName }}</a></span>
                    <div class="detailedMenu">
                    <span>
                      <a href="javascript:;" @click="createProjectModelTask(element.id,element.list.length)"><i
                        class="el-icon-plus taskAdd"></i></a></span>
                      <el-dropdown trigger="click" placement="bottom-start">
                        <span><a href="javascript:;"><i class="el-icon-more detailedMore"></i></a></span>
                        <el-dropdown-menu>
                          <el-dropdown-item @click.native="updateProjectModel(element)"><span><i
                            class="el-icon-edit-outline"></i></span><span>编辑</span></el-dropdown-item>
                          <el-dropdown-item @click=""><span><i class="el-icon-s-claim"></i></span><span>归档</span>
                          </el-dropdown-item>
                          <el-dropdown-item @click.native="deleteProjectModel(element.id)"><span><i
                            class="el-icon-delete-solid"></i></span><span>删除</span></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <div class="modelTaskData">
                    <draggable class="" :list="element.list" :group="chrildrenGroup" @end="endChildren"
                               @change="change">
                      <div class="" v-for="(element1, index1) in element.list" :key="element1.index1">
                        <input type="hidden" class="detailedId" :data-id="element.id" :value="element.id"/>
                        <div class="taskDiv">
                          <div class="taskTag">
                            <div class="inline-block taskTagView">
                              <span v-for="(taskTag,index2) in JSON.parse(element1.taskTags)"
                                    :style="{'background':taskTag.tagColor}"
                                    :class="taskTag.type==null?'':'tag-view-name'">{{taskTag.tagName}}</span>
                            </div>
                            <el-dropdown trigger="click" placement="bottom-start" class="right">
                              <span><a href="javascript:;"><i
                                class="el-icon-more detailedMore white-color"></i></a></span>
                              <el-dropdown-menu>
                                <el-dropdown-item @click=""><span><i
                                  class="el-icon-circle-check"></i></span><span>完成任务</span></el-dropdown-item>
                                <el-dropdown-item @click=""><span><i
                                  class="el-icon-video-play"></i></span><span>开始任务</span></el-dropdown-item>
                                <el-dropdown-item @click=""><span><i
                                  class="el-icon-edit-outline"></i></span><span>编辑</span></el-dropdown-item>
                                <el-dropdown-item @click=""><span><i
                                  class="el-icon-delete-solid"></i></span><span>删除</span></el-dropdown-item>
                              </el-dropdown-menu>
                            </el-dropdown>

                          </div>
                          <div class="taskName">
                            {{ element1.taskName }}
                          </div>
                          <div class="taskUser" v-if="element1.taskUser!=null">
                            <el-tooltip class="item" effect="dark" :content="''+element1.taskUser.name+''"
                                        placement="right">
                              <el-dropdown trigger="click" size="medium" placement="bottom-start">
                                <img :src="element1.taskUser.icon" class="userImageMin"/>
                                <el-dropdown-menu style="width: 300px;">
                                  <el-dropdown-item v-for="(menber, index) in menberList" :key="index">
                                    <div @click="taskAssignUser(menber.user,element1.taskUser,element)">
                                      <img :src="menber.user.icon" class="userImageMin"
                                           style="position: relative;top: 6px"/>
                                      <span>{{menber.user.name}}</span>
                                      <span v-if="menber.user.id==element1.taskUser.id" class="right"><i
                                        class="el-icon-check checkUser"></i></span>
                                    </div>
                                  </el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </el-tooltip>
                          </div>
                        </div>
                      </div>
                    </draggable>
                    <div class="taskAddBtnDiv">
                      <el-button class="taskAddBtn" @click="createProjectModelTask(element.id,element.list.length)"><i
                        class="el-icon-plus"></i></el-button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="itemData">
            <div class="list-group-parent">
              <el-button class="addDetailedBtn" @click="createProjectModel"><i class="el-icon-plus">添加清单</i></el-button>
            </div>
          </div>
        </draggable>
      </div>
    </div>

    <!--创建新的清单-->
    <div id="project-model-task-new">
      <el-dialog :visible.sync="projectModelState" width="40%" top="200px" center>
        <el-form ref="projectModel" :model="projectModel" label-width="80px">
          <el-form-item label="清单名称">
            <el-input v-model="projectModel.modelName"></el-input>
          </el-form-item>
          <el-form-item label="清单描述">
            <el-input type="textarea" v-model="projectModel.remark" rows="10"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitModel">保存</el-button>
            <el-button @click="projectModelState==false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <div id="project-task-new">
      <el-dialog :visible.sync="projectModelTaskState" width="600px" top="150px" center>
        <el-form ref="projectTask" :model="projectTask" label-width="5px">
          <el-row style="margin: 5px 0px 10px 0px">
            <el-input v-model="taskName" placeholder="输入任务标题"></el-input>
          </el-row>
          <el-form-item>
            <di class="inline-block">
              <span style="padding-left: 5px;" class="iconClass"><i class="el-icon-s-custom"
                                                                    style="font-size: 20px"></i></span>
              <li v-if="newTaskAssignUser.user!=null" class="userImageLi inline-block"
                  style="list-style-type:none;">
                <el-tooltip class="item" effect="dark" :content="''+newTaskAssignUser.user.name+''" placement="top">
                  <img :src="newTaskAssignUser.user.icon" class="userImageMin"/>
                </el-tooltip>
              </li>
            </di>
            <el-dropdown trigger="click" size="medium" placement="bottom-start">
              <span>选择负责人</span>
              <el-dropdown-menu style="width: 300px;">
                <el-dropdown-item v-for="(menber, index) in menberList" :key="index">
                  <div @click="selectTaskAssignUser(menber)">
                    <img :src="menber.user.icon" class="userImageMin"
                         style="position: relative;top: 6px"/>
                    <span>{{menber.user.name}}</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item>
            <span style="padding-left: 5px;"><i class="el-icon-warning" style="font-size: 20px"></i></span>
            <el-dropdown trigger="click" size="medium" placement="bottom-start">
              <span :style="{'background':taskLevel.tagColor}" :class="taskLevel.type==null?'':'tag-view-name'">{{taskLevel.tagName}}</span>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(projectTag,index) in projectTaskList" :key="index"
                                  @click.native="selectLevel(projectTag)" style="padding-left: 0px">
                  <div v-if="projectTag.type==1">
                    <span :style="{'background':projectTag.tagColor}" class="tag-span-color-view"></span>
                    <span class="tag-span-name-view">{{projectTag.tagName}}</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item>
            <span style="padding-left: 5px;"><i class="el-icon-price-tag" style="font-size: 20px"></i></span>
            <el-dropdown trigger="click" size="medium" placement="bottom-start">
              <span v-for="(tag ,index) in taskTags" :key="index" :style="{'background':tag.tagColor}"
                    :class="tag.type==null?'':'tag-view-name'">{{tag.tagName}}</span>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(projectTag,index) in projectTaskList" :key="index"
                                  @click.native="selectTags(projectTag)">
                  <div v-if="projectTag.type==0">
                    <span :style="{'background':projectTag.tagColor}" class="tag-span-color-view"></span>
                    <span class="tag-span-name-view">{{projectTag.tagName}}</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item>
            <span style="padding-left: 5px;"><i class="el-icon-date" style="font-size: 20px"></i></span>
            <span v-if="addTaskTimeSate==false" @click="addTaskTimeSate=true">设置截止时间</span>
            <el-date-picker v-model="projectTask.taskEndTime" v-if="addTaskTimeSate==true" type="date"
                            placeholder="选择日期"
                            style="width: 500px"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <div class="inline-block" style="vertical-align: top;"><span style="padding-left: 5px;"><i
              class="el-icon-edit-outline" style="font-size: 20px"></i></span></div>
            <div class="inline-block">
              <span v-if="addTaskDescSate==false" @click="addTaskDescSate=true">添加任务描述</span>
              <el-input v-if="addTaskDescSate==true" type="textarea" rows="6" style="width: 500px"
                        v-model="projectTask.taskDescription">
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="inline-block" style="vertical-align: top;">
              <span style="padding-left: 5px;"><i class="el-icon-paperclip" style="font-size: 20px"></i></span>
            </div>
            <div class="inline-block">
              <span v-if="addTaskFileSate==false" @click="addTaskFileSate=true">上传任务附件</span>
              <el-upload class="upload-demo" v-if="addTaskFileSate==true" drag
                         action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitTask">创建任务</el-button>
            <el-button @click="projectModelTaskState=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!--项目信息-->
    <div id="project-message-view">
      <el-dialog :visible.sync="projectMessageState" width="25%" top="300px" center>
        <div id="project-message-content">
          <el-form label-width="100px">
            <span class="projectName" style="text-align: center;margin-bottom: 10px">{{projectName}}</span>
            <el-form-item label="创建者:">
              <div id="projectMenberCreate" class="ul-menu">
                <ul class="left">
                  <li v-for="(menber, index) in menberList" :key="index" class="userImageLi left">
                    <el-tooltip class="item" effect="dark" :content="''+menber.user.name+''" placement="top"
                                v-if="menber.userType==3">
                      <img :src="menber.user.icon" class="userImageMin" style="position: relative;top: -10px"/>
                    </el-tooltip>
                  </li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="项目管理员:">
              <div id="projectMenberManager" class="ul-menu">
                <ul class="left">
                  <li v-for="(menber, index) in menberList" :key="index" class="userImageLi left">
                    <el-tooltip class="item" effect="dark" :content="''+menber.user.name+''" placement="top"
                                v-if="menber.userType==1">
                      <img :src="menber.user.icon" class="userImageMin" style="position: relative;top: -10px"/>
                    </el-tooltip>
                  </li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="创建时间:">
              <span>2019-06-03</span>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" class="right">退出项目</el-button>
            </el-form-item>
          </el-form>
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
  // 引入拖拽组件
  import draggable from 'vuedraggable'
  import ElInput from "element-ui/packages/input/src/input";
  import Simditor from '../../simditor'

  export default {
    name: "project-view-panel",
    components: {
      //调用组件
      ElInput,
      draggable,
      Simditor
    },

    data() {
      return {
        detailedId: '',
        currentProjectId: '',  //当前项目Id
        projectName: '',
        rootPath: '',
        fatherGroup: 'father',
        chrildrenGroup: 'chrildren',
        tempProjectModelId: '',
        orderNo: '',
        projectModelId: '',
        projectModel: {},
        projectTask: {},
        taskName: '',
        taskUserId: '',
        element: {},
        projectMessageState: false,
        projectModelState: false,
        projectModelTaskState: false,
        addTaskTimeSate: false,
        addTaskDescSate: false,
        addTaskFileSate: false,
        newTaskAssignUser: {user: {name: '添加任务人'}},
        menberList: [],
        taskAssignUserList: [],
        listParent: [],
        projectTaskList: [],
        taskLevel: {  //默认数据
          tagColor: '',
          tagName: '任务紧急程度',
          type: null
        },
        taskTags: [{
          tagColor: '',
          tagName: '任务标签',
          type: null
        }],
      }
    },
    created() {
      const $this = this;
      $this.rootPath = app.common.getRootPath();
      $this.currentProjectId = $this.$route.query.projectId;
      $this.projectName = $this.$route.query.projectName;
      $this.getProjectTaskList();
      $this.getUserList();
      $this.getProjectModelList();
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
              $this.menberList = result;
            }
          }
        });
      },
      getProjectModelList: function () {
        const $this = this;
        $.ajax({
          url: $this.rootPath + "projectModel/findProjectModelList",
          type: "get",
          data: {
            projectId: $this.currentProjectId
          },
          dataType: "json",
          success: function (result) {
            if (result.length > 0) {
              $this.listParent = result;
            }
          }
        });
      },
      change: function (evt) {
        const $this = this;
        if (evt.removed) {
          $this.element = evt.removed.element;
        }
      },
      endParent: function (evt) {
        const $this = this;
        const listParent = $this.listParent;
        const ids = [];
        $.each(listParent, function (i, v) {
          ids.push(v.id);
        });
        if (ids.length == 0) {
          return false;
        }
        const projectId = $this.currentProjectId;
        $.ajax({
          url: $this.rootPath + "projectModel/moveProjectModel",
          type: "post",
          data: {
            projectId: projectId,
            ids: ids.join(",")
          },
          dataType: "json",
          success: function (result) {
            if (result.status == "error") { //清单移动失败，重新渲染
              $this.getProjectModelList();
            }
          }
        });
      },
      endChildren: function (evt) {
        const $this = this;
        const tempEvt = evt;
        let fromModelId = $this.element.projectModelId; //从哪一个清单中来源的
        let toModelId = null;   //到哪一个清单中去
        const toModelDivs = $(tempEvt.to.innerHTML).find(".detailedId");
        $.each(toModelDivs, function (i, v) {
          toModelId = $(v).data("id");
          return false;
        });
        const toOrFromList = $this.listParent.filter(function (element) {//从listParent中获取数据
          if (element.id == fromModelId || element.id == toModelId) {
            return element;
          }
        });
        let fromIds = [];
        let toIds = [];
        $.each(toOrFromList, function (i, v) {
          if (v.id == fromModelId) {
            fromIds = $this.getListIds(v.list);
          }
          if (v.id == toModelId) {
            toIds = $this.getListIds(v.list);
          }
        });
        const projectId = $this.currentProjectId;
        const taskId = $this.element.id;
        $.ajax({
          url: $this.rootPath + "projectModel/moveProjectModelTask",
          type: "post",
          data: {
            projectId: projectId,
            fromIds: fromIds.join(","),
            fromModelId, fromModelId,
            taskId: taskId,
            toIds: toIds.join(","),
            toModelId: toModelId
          },
          dataType: "json",
          success: function (result) {
            if (result.status == "error") { //清单移动失败，重新渲染
              $this.getProjectModelList();
            }
          }
        });
      },
      getListIds: function (list) {
        const ids = [];
        if (list.length > 0) {
          $.each(list, function (i, v) {
            ids.push(v.id);
          })
        }
        return ids;
      },
      deleteProjectModel: function (projectModelId) {
        const $this = this;
        $.ajax({
          url: $this.rootPath + "projectModel/deleteProjectModelTask",
          type: "post",
          data: {
            id: projectModelId
          },
          dataType: "json",
          success: function (result) {
            if (result.status == "success") { //清单移动失败，重新渲染
              $this.getProjectModelList();
            }
          }
        });
      },
      createProjectModel: function () {
        const $this = this;
        $this.projectModelState = true;
      },
      createProjectModelTask: function (modelId, orderNo) {
        const $this = this;
        $this.orderNo = orderNo == null ? 0 : orderNo;
        $this.projectModelTaskState = true;
        $this.tempProjectModelId = modelId;
      },
      updateProjectModel: function (projectModel) {
        const $this = this;
        $this.projectModelId = projectModel.id;
        $this.projectModel = projectModel;
        $this.projectModelState = true;

      },
      onSubmitModel: function () {
        const $this = this;
        let projectModel = $this.projectModel;
        let listParent = $this.listParent;
        const orderNo = listParent.length;
        const data = {
          id: $this.projectModelId,
          projectId: $this.currentProjectId,
          modelName: projectModel.modelName,
          orderNo: orderNo,
          remark: projectModel.remark
        }
        $.ajax({
          url: $this.rootPath + "projectModel/add",
          type: "post",
          data: data,
          dataType: "json",
          success: function (result) {
            if (result.status == "error") { //清单移动失败，重新渲染
              $this.getProjectModelList();
            } else {
              $this.getProjectModelList();
              $this.projectModelState = false;
            }
          }
        });
      },
      onSubmitTask: function () {
        const $this = this;
        const projectModelTask = $this.projectTask;
        const taskLevel = $this.taskLevel;
        const taskTags = $this.taskTags;
        const datanew = {
          projectId: $this.currentProjectId,
          projectModelId: $this.tempProjectModelId,
          taskName: $this.taskName,
          taskDescription: projectModelTask.taskDescription,
          taskEndTime: projectModelTask.taskEndTime,
          taskTags: JSON.stringify(taskTags),
          taskLevel: JSON.stringify(taskLevel),
          taskUserId: $this.taskUserId,
          orderNo: $this.orderNo
        }
        $.ajax({
          url: $this.rootPath + "/project/task/add",
          type: "post",
          data: datanew,
          dataType: "json",
          success: function (result) {
            if (result.status == "error") { //清单移动失败，重新渲染
              $this.getProjectModelList();
            } else {
              $this.taskName = '';
              $this.projectTask = {};
              $this.taskLevel = {tagColor: '', tagName: '任务紧急程度', type: null}; //默认数据
              $this.taskTags = [{tagColor: '', tagName: '任务标签', type: null}];
              $this.taskUserId = '';
              $this.orderNo = '';
              $this.addTaskTimeSate = false;
              $this.addTaskDescSate == false;
              $this.addTaskFileSate = false;
              $this.newTaskAssignUser = {user: {name: '添加任务人'}};
              $this.projectModelTaskState = false;
              $this.getProjectModelList();
            }
          }
        });
      },
      taskAssignUser: function (user, taskUser, element) {
        const $this = this;
        if (user.id == taskUser.id) {
          return false;
        }
        const taskList = element.list;
        let currentTaskId;
        $.each(taskList, function (i, v) {
          if (taskUser.id == v.taskUser.id) {
            v.taskUser.icon = user.icon;
            v.taskUser.name = user.name;
            v.taskUser.id = user.id;
            currentTaskId = v.id;
            return false;
          }
        })
        //提交数据
        $.ajax({
          url: $this.rootPath + "/project/task/taskAssign",
          type: "post",
          data: {
            id: currentTaskId,
            taskUserId: user.id
          },
          dataType: "json",
          success: function (result) {
            if (result.status == "error") { //清单移动失败，重新渲染
              $this.getProjectModelList();
            }
          }
        });
      },
      selectTaskAssignUser: function (menber) {
        const $this = this;
        $this.newTaskAssignUser = menber;
        $this.taskUserId = menber.user.id;
      },
      getProjectTaskList: function () {
        const $this = this;
        $.ajax({
          url: $this.rootPath + "projectTag/findTagByProjectId",
          type: "post",
          data: {
            projectId: $this.currentProjectId
          },
          dataType: "json",
          success: function (result) {
            if (result.length > 0) {
              $this.projectTaskList = result;
            }
          }
        });
      },
      selectLevel: function (level) {
        const $this = this;
        $this.taskLevel = {id: level.id, type: level.type, tagName: level.tagName, tagColor: level.tagColor};
      },
      selectTags: function (tag) {
        const $this = this;
        let tempTags = $this.taskTags.filter(function (tag) {
          if (tag.type != null) {
            return tag;
          }
        });
        tempTags.push({id: tag.id, type: tag.type, tagName: tag.tagName, tagColor: tag.tagColor});
        $this.taskTags = tempTags;
      }
    }
  }
</script>

<style scoped>

  #project-panle-content {
    background: white;
  }

  /**
   顶部菜单
   */
  #project-panle-head-menu {
    border-top: 1px solid #E3E3E3;
    border-bottom: 1px solid #E3E3E3;
  }

  #top-menu {
    height: 50px;
    width: 100%;
  }

  /**
    项目用户
   */
  #projectMenber {
    height: 50px;
    width: 100%;
  }

  #projectMenber ul {
    display: inline-block;
    margin: 0px;
    padding-left: 20px;
  }

  #projectMenber ul li {
    padding-left: -10px !important;
  }

  .userImageLi {
    position: relative;
    top: 10px;
  }

  /**
    设置项目名称样式
   */
  .projectName {
    font-size: 25px;
    font-weight: 400;
  }

  .rightMenu {
    padding: 10px 10px 10px 0px;

  }

  .rightMenu span i {
    font-size: 16px;
    color: #878787;
  }

  .rightMenu span i:hover {
    color: #44ACB6;
  }

  /**
   底部菜单
   */
  .bottomRightMenu {
    padding-right: 10px;
  }

  #bottom-menu {
    height: 40px;
    width: 100%;
  }

  #bottom-menu ul {
    margin: 0px !important;
  }

  #bottom-menu .left {
    padding-left: 20px !important;
  }

  /**
    内容面板
   */
  #project-panle-view {
    min-width: 1000px;
    overflow-y: hidden;
    white-space: nowrap;
  }

  .listData {
    position: relative;
  }

  .itemData {
    width: 320px;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 5px;
    position: relative;
    display: inline-block;
    vertical-align: top;
  }

  /**
     设置拖拽组件的样式
   */
  .baseDraggable {
    text-align: left;
  }

  /**
    设置单个清单样式
   */
  .list-group-parent {
    display: inline-block;
    background: #EFEFEF;
    width: 320px;
    position: relative;
    height: 100%;
    vertical-align: top;
    border: 1px solid #EFEFEF;
    border-radius: 3px;

  }

  .modelTaskData {
    overflow-y: auto;
    overflow-x: hidden;
    height: 860px;
  }

  .modelTaskHead {
    min-height: 40px;
    padding: 0px 5px 0px 5px;
    font-size: 20px;
    font-weight: 500;
  }

  .modelTask {
    height: 860px;
  }

  /**
    设置单个清单的样式
   */
  .detailedDiv {
    padding: 3px 0px 3px 0px;
    margin-bottom: 10px;
  }

  /**
    设置清单中任务的数量
   */
  .detailedListNum {
    padding: 3px 5px 3px 5px;
    background: #999999;
    width: 280px;
    min-height: 50px;
    color: white;
    border: 1px solid #999999;
    border-radius: 40%;
    margin-right: 10px
  }

  /**
    设置清单名称
   */
  .detailedName {
    font-size: 18px;
    font-weight: 400;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
  }

  /**
    设置清单菜单
   */
  .detailedMenu {
    display: inline-block;
    float: right
  }

  /**
    任务添加按钮
   */
  .taskAdd {
    font-size: 18px;
    margin-right: 10px
  }

  /**
    更多设置
   */
  .detailedMore {
    font-size: 18px
  }

  /**
   任务div
   */
  .taskDiv {
    min-height: 90px;
    /*padding: 5px;*/
    width: 280px;
    margin: 0 auto;
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    border-radius: 3px;
    margin-bottom: 10px;
  }

  /**
   任务标签设置
   */
  .taskTag {
    margin-bottom: 8px;
    margin-top: 8px;
    padding-left: 5px;

  }

  /**
  任务标签名称
   */
  .taskTagName {
    padding: 5px 8px 5px 8px;
    color: white;
    border-radius: 6px;
  }

  /**
    内容超出折行
  */
  .taskName {
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    padding-left: 5px;
    height: 100%;
  }

  .taskUser {
    text-align: right;
    margin-bottom: 3px;
    margin-right: 3px;
  }

  /**
    任务添加按钮Div
   */
  .taskAddBtnDiv {
    text-align: center;
  }

  /**
    任务添加按钮
   */
  .taskAddBtn {

    width: 280px;
    margin: 0 auto;
  }

  /**
   任务清单新增
   */
  .addDetailedBtn {
    padding-left: 125px;
    padding-right: 105px
  }

  /**
    选择用户
   */
  .checkUser {
    color: green;
  }

  /*项目信息*/

  #project-message-content .el-form-item, #projectMenberCreate .el-form-item {
    margin: 0px 0px 5px;
  }

  #projectMenberManager ul, #projectMenberCreate ul {
    margin: 0px;
    padding: 0px;
  }

  .taskTagView {
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    width: 85%;
  }

</style>

<style>
  .el-upload-dragger {
    width: 500px;
  }
</style>
