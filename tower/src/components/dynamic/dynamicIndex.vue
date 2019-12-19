<template>
   <div id="dynamic">
     <div id="dynamicHead">
       <el-row>
         <span>筛选动态:</span>
         <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                   所有项目
                  </span>
           <el-dropdown-menu>
             <el-dropdown-item>GT系统开发</el-dropdown-item>
             <el-dropdown-item>tower系统开发</el-dropdown-item>
           </el-dropdown-menu>
         </el-dropdown>
         <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                   所有成员
                  </span>
           <el-dropdown-menu >
             <el-dropdown-item v-for="(menber, index) in menberList" :key="index">
               <img :src="'/static/image/team/' + menber.imageName + '.png'" class="menberImage"/>
               <span class="menberUserName" style="position: relative;top: -10px;"><a href="javascript:;">{{menber.userName}}</a></span>
             </el-dropdown-item>
           </el-dropdown-menu>
         </el-dropdown>
       </el-row>
   </div>

     <div id="dynamicContent" v-for="(dynamic, index) in dynamicList" :key="index">
        <div id="dynamicDataHead">
            <el-row style="text-align: left;padding-left: 20px;padding-top: 20px">
              <el-col :span="20">
                <span style="padding: 10px 10px;border: 3px solid #E3E3E3;border-radius: 45%;color: #45ADB7;font-size: 16px;font-weight: 400">{{dynamic.time}}</span>
                <hr style="position: relative;top: -15px;left: 50px;"/>
                <span style="position: relative;right: -850px;top: -40px;">{{dynamic.projectName}}</span>
              </el-col>
            </el-row>
        </div>
        <div class="dynamicList" style="position: relative;top: -30px">
           <el-row v-for="(menber, index) in dynamic.menberList" :key="index" style="text-align: left;padding-left: 80px;margin-top: 16px;margin-bottom: 16px">
             <span class="interval"><a href="javascript:;">{{menber.dateTime}}</a></span>
             <img   :src="'/static/image/team/' + menber.imageName + '.png'" class="menberImage interval" style="position: relative;bottom: -10px"/>
             <span class="interval"><a href="javascript:;" class="dataTest">{{menber.userName}}</a></span>
             <span class="interval">{{menber.active}}:</span>
             <span class="interval"><a href="javascript:;" class="dataTest">{{menber.taskName}}</a></span>
           </el-row>
        </div>
     </div>
   </div>
</template>

<script>
    export default {
        name: "dynamic-index",
      data() {
        return {
          dynamicList:[{
            time:'今',
            projectName:'系统开发',
            menberList:[
              {
                userName:'Aaron',
                menberType:'访客',
                dateTime:'9:15',
                active:'创建了任务',
                taskName:' 【数据文档分类】无法对文档目录进行修改',
                imageName:'1',
                email:'service@lxmed.com'
              },
              {
                userName:'艾美',
                menberType:'成员',
                dateTime:'10:17',
                active:'将任务指派给',
                taskName:'  李强  【培训记录】添加查看按钮权限',
                imageName:'2',
                email:'mei.ai@lxmed.com'
              },
              {
                userName:'卞可可',
                menberType:'成员',
                dateTime:'10:38',
                active:'创建了任务',
                taskName:'  【培训记录】添加查看按钮权限',
                imageName:'3',
                email:'keke.bian@lxmed.com'
              },
              {
                userName:'蔡静雯',
                menberType:'成员',
                dateTime:'10:49',
                active:'任务指派给',
                taskName:' 朱志民  项目平台所以查询框样式优化',
                imageName:'4',
                email:'jingwen.cai@wisdomvic.com'
              },
              {
                userName:'陈小敏',
                menberType:'成员',
                dateTime:'10:59',
                active:'移动了任务',
                taskName:' 项目平台所以查询框样式优化',
                imageName:'5',
                email:'xiaomin.cheng@lxmed.com'
              },
              {
                userName:'陈岚',
                menberType:'成员',
                dateTime:'12:16',
                active:'任务指派给',
                taskName:' 朱志民  移动端工时静态页面制作',
                imageName:'6',
                email:''
              },
              {
                userName:'陈灵堰',
                menberType:'成员',
                dateTime:'12:32',
                active:'移动了任务',
                taskName:'  移动端工时静态页面制作',
                imageName:'8',
                email:'lingyan.chen@lxmed.com'
              },
              {
                userName:'陈蜜Yumi',
                menberType:'成员',
                dateTime:'13:06',
                active:'移动了任务',
                taskName:'   【消息提醒】优化加载速度',
                imageName:'9',
                email:''
              },
              {
                userName:'陈恬静',
                menberType:'成员',
                dateTime:'13:18',
                active:'移动了任务',
                taskName:'   上传文件后，在点击上传文件后，弹出提示取消，会出现上传界面',
                imageName:'10',
                email:''
              },
              {
                userName:'党明珠',
                menberType:'成员',
                dateTime:'13:25',
                active:'移动了任务',
                taskName:'  【受试者管理】受试者修改基本信息',
                imageName:'12',
                email:'mingzhu.dang@wisdomvic.com'
              },
              {
                userName:'邓梦娇',
                menberType:'成员',
                dateTime:'14:25',
                active:'创建了任务',
                taskName:'   【数据文档分类】无法对文档目录进行修改',
                imageName:'13',
                email:'mengjiao.deng@wisdomvic.com'
              },
              {
                userName:'丁倩',
                menberType:'成员',
                dateTime:'14:25',
                active:'创建了任务',
                taskName:'  【数据文档分类】无法对文档目录进行修改',
                imageName:'14',
                email:'qian.ding@lxmed.com'
              },
              {
                userName:'范世朋',
                menberType:'成员',
                dateTime:'14:25',
                active:'创建了任务',
                taskName:'  【数据文档分类】无法对文档目录进行修改',
                imageName:'11',
                email:'shipeng.fan@wisdomvic.com'
              }
            ]
          },{
            time:'昨天',
            projectName:'GT开发',
            menberList:[
              {
                userName:'Aaron',
                menberType:'访客',
                dateTime:'9:15',
                active:'创建了任务',
                taskName:' 【数据文档分类】无法对文档目录进行修改',
                imageName:'1',
                email:'service@lxmed.com'
              },
              {
                userName:'艾美',
                menberType:'成员',
                dateTime:'10:17',
                active:'将任务指派给',
                taskName:'  李强  【培训记录】添加查看按钮权限',
                imageName:'2',
                email:'mei.ai@lxmed.com'
              },
              {
                userName:'卞可可',
                menberType:'成员',
                dateTime:'10:38',
                active:'创建了任务',
                taskName:'  【培训记录】添加查看按钮权限',
                imageName:'3',
                email:'keke.bian@lxmed.com'
              },
              {
                userName:'蔡静雯',
                menberType:'成员',
                dateTime:'10:49',
                active:'任务指派给',
                taskName:' 朱志民  项目平台所以查询框样式优化',
                imageName:'4',
                email:'jingwen.cai@wisdomvic.com'
              },
              {
                userName:'陈小敏',
                menberType:'成员',
                dateTime:'10:59',
                active:'移动了任务',
                taskName:' 项目平台所以查询框样式优化',
                imageName:'5',
                email:'xiaomin.cheng@lxmed.com'
              },
              {
                userName:'陈岚',
                menberType:'成员',
                dateTime:'12:16',
                active:'任务指派给',
                taskName:' 朱志民  移动端工时静态页面制作',
                imageName:'6',
                email:''
              },
              {
                userName:'陈灵堰',
                menberType:'成员',
                dateTime:'12:32',
                active:'移动了任务',
                taskName:'  移动端工时静态页面制作',
                imageName:'8',
                email:'lingyan.chen@lxmed.com'
              },
              {
                userName:'陈蜜Yumi',
                menberType:'成员',
                dateTime:'13:06',
                active:'移动了任务',
                taskName:'   【消息提醒】优化加载速度',
                imageName:'9',
                email:''
              },
              {
                userName:'陈恬静',
                menberType:'成员',
                dateTime:'13:18',
                active:'移动了任务',
                taskName:'   上传文件后，在点击上传文件后，弹出提示取消，会出现上传界面',
                imageName:'10',
                email:''
              },
              {
                userName:'党明珠',
                menberType:'成员',
                dateTime:'13:25',
                active:'移动了任务',
                taskName:'  【受试者管理】受试者修改基本信息',
                imageName:'12',
                email:'mingzhu.dang@wisdomvic.com'
              },
              {
                userName:'邓梦娇',
                menberType:'成员',
                dateTime:'14:25',
                active:'创建了任务',
                taskName:'   【数据文档分类】无法对文档目录进行修改',
                imageName:'13',
                email:'mengjiao.deng@wisdomvic.com'
              },
              {
                userName:'丁倩',
                menberType:'成员',
                dateTime:'14:25',
                active:'创建了任务',
                taskName:'  【数据文档分类】无法对文档目录进行修改',
                imageName:'14',
                email:'qian.ding@lxmed.com'
              },
              {
                userName:'范世朋',
                menberType:'成员',
                dateTime:'14:25',
                active:'创建了任务',
                taskName:'  【数据文档分类】无法对文档目录进行修改',
                imageName:'11',
                email:'shipeng.fan@wisdomvic.com'
              }
            ]
          }],

          menberList:[
            {
              userName:'Aaron',
              menberType:'访客',
              dateTime:'9:15',
              active:'创建了任务',
              taskName:' 【数据文档分类】无法对文档目录进行修改',
              imageName:'1',
              email:'service@lxmed.com'
            },
            {
              userName:'艾美',
              menberType:'成员',
              dateTime:'10:17',
              active:'将任务指派给',
              taskName:'  李强  【培训记录】添加查看按钮权限',
              imageName:'2',
              email:'mei.ai@lxmed.com'
            },
            {
              userName:'卞可可',
              menberType:'成员',
              dateTime:'10:38',
              active:'创建了任务',
              taskName:'  【培训记录】添加查看按钮权限',
              imageName:'3',
              email:'keke.bian@lxmed.com'
            },
            {
              userName:'蔡静雯',
              menberType:'成员',
              dateTime:'10:49',
              active:'任务指派给',
              taskName:' 朱志民  项目平台所以查询框样式优化',
              imageName:'4',
              email:'jingwen.cai@wisdomvic.com'
            },
            {
              userName:'陈小敏',
              menberType:'成员',
              dateTime:'10:59',
              active:'移动了任务',
              taskName:' 项目平台所以查询框样式优化',
              imageName:'5',
              email:'xiaomin.cheng@lxmed.com'
            },
            {
              userName:'陈岚',
              menberType:'成员',
              dateTime:'12:16',
              active:'任务指派给',
              taskName:' 朱志民  移动端工时静态页面制作',
              imageName:'6',
              email:''
            },
            {
              userName:'陈灵堰',
              menberType:'成员',
              dateTime:'12:32',
              active:'移动了任务',
              taskName:'  移动端工时静态页面制作',
              imageName:'8',
              email:'lingyan.chen@lxmed.com'
            },
            {
              userName:'陈蜜Yumi',
              menberType:'成员',
              dateTime:'13:06',
              active:'移动了任务',
              taskName:'   【消息提醒】优化加载速度',
              imageName:'9',
              email:''
            },
            {
              userName:'陈恬静',
              menberType:'成员',
              dateTime:'13:18',
              active:'移动了任务',
              taskName:'   上传文件后，在点击上传文件后，弹出提示取消，会出现上传界面',
              imageName:'10',
              email:''
            },
            {
              userName:'党明珠',
              menberType:'成员',
              dateTime:'13:25',
              active:'移动了任务',
              taskName:'  【受试者管理】受试者修改基本信息',
              imageName:'12',
              email:'mingzhu.dang@wisdomvic.com'
            },
            {
              userName:'邓梦娇',
              menberType:'成员',
              dateTime:'14:25',
              active:'创建了任务',
              taskName:'   【数据文档分类】无法对文档目录进行修改',
              imageName:'13',
              email:'mengjiao.deng@wisdomvic.com'
            },
            {
              userName:'丁倩',
              menberType:'成员',
              dateTime:'14:25',
              active:'创建了任务',
              taskName:'  【数据文档分类】无法对文档目录进行修改',
              imageName:'14',
              email:'qian.ding@lxmed.com'
            },
            {
              userName:'范世朋',
              menberType:'成员',
              dateTime:'14:25',
              active:'创建了任务',
              taskName:'  【数据文档分类】无法对文档目录进行修改',
              imageName:'11',
              email:'shipeng.fan@wisdomvic.com'
            }
          ]
        }
      }
    }
</script>

<style >
  a {
    text-decoration: none;
    color: #44ACB6;
  }

  /**
    设置项目内容
   */
  #dynamic {
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
    设置用户图片显示大小
   */
  .menberImage{
    text-align: left;
    border-radius: 50%;
    height: 30px;
    width: 30px;
  }

  #dynamicHead .el-row{
    text-align: left;
    padding-top: 20px;
    padding-left: 20px;
  }
  .interval{
    margin-left: 10px;
  }

   .dataTest{
     color: black;
   }
  .dataTest:hover{
    color: #44ACB6;
  }

</style>
