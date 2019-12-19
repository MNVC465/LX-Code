import Vue from 'vue'
import Router from 'vue-router'
import projectIndex from '@/components/project/projectIndex'
import projectSetting from '@/components/project/projectSetting'
import projectTags from '@/components/project/projectTags'
import projectFile from '@/components/project/projectFile/projectFile'

import myselfIndex from '@/components/myself/myselfIndex'
import teamIndex from '@/components/team/teamIndex'
import analysisIndex from '@/components/analysis/analysisIndex'
import dynamicIndex from '@/components/dynamic/dynamicIndex'
import reportIndex from '@/components/report/reportIndex'
import myselfTask from '@/components/myself/myselfTask'
import calendarIndex from '@/components/calendar/calendarIndex'
import knowledgeBaseIndex from '@/components/knowledgeBase/knowledgeBaseIndex'
import knowledgeTeamIndex from '@/components/knowledgeBase/knowledgeTeamIndex'
import projectViewPanel from '@/components/project/projectView/projectViewPanel'
import projectUserIndex from '@/components/project/projectView/projectUserIndex'
import knowledgeViewData from '@/components/knowledgeBase/knowledgeViewData'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'projectIndex',
      component: projectIndex //项目首页
    },
    {
      path: '/projectViewPanel',
      name: 'projectViewPanel',
      component: projectViewPanel //项目面板
    },
    {
      path: '/projectSetting',
      name: 'projectSetting',
      component: projectSetting //项目设置
    },
    {
      path: '/projectTags',
      name: 'projectTags',
      component: projectTags //标签设置
    },
    {
      path: '/projectUserIndex',
      name: 'projectUserIndex',
      component: projectUserIndex //项目成员
    },
    {
      path: '/projectFile',
      name: 'projectFile',
      component: projectFile //项目文件设置
    },
    {
      path: '/myselfIndex',
      name: 'myselfIndex',
      component: myselfIndex,
      children: [
        {
          path: '',
          component: myselfTask
        }
      ]
    },
    {
      path: '/teamIndex',
      name: 'teamIndex',
      component: teamIndex
    },
    {
      path: '/analysisIndex',
      name: 'analysisIndex',
      component: analysisIndex
    },
    {
      path: '/dynamicIndex',
      name: 'dynamicIndex',
      component: dynamicIndex
    },
    {
      path: '/reportIndex',
      name: 'reportIndex',
      component: reportIndex
    },
    {
      path: '/calendarIndex',
      name: 'calendarIndex',
      component: calendarIndex
    },
    {
      path: '/projectViewPanel',
      name: 'projectViewPanel',
      component: projectViewPanel
    },
    {
      path: '/knowledgeViewData',
      name: 'knowledgeViewData',
      component: knowledgeViewData
    },
    {
      path: '/knowledgeBaseIndex',
      name: 'knowledgeBaseIndex',
      component: knowledgeBaseIndex,
      children: [
        {
          path: '',
          name: 'knowledgeTeamIndex',
          component: knowledgeTeamIndex,
          children: [
            {
              path: 'knowledgeViewData',
              name: 'knowledgeViewData',
              component: knowledgeViewData
            }
          ]
        }
      ]
    }
  ]
})
