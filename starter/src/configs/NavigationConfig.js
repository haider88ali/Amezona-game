import { DashboardOutlined,PlusOutlined,DatabaseFilled,LinkOutlined,UsergroupAddOutlined } from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'


// const dashBoardNavTree = [{
//   key: 'dashboards',
//   path: `${APP_PREFIX_PATH}/dashboards`,
//   title: 'sidenav.dashboard',
//   icon: DashboardOutlined,
//   breadcrumb: false,
//   isGroupTitle: true,
//   submenu: [
//     {
//       key: 'dashboards-default',
//       path: `${APP_PREFIX_PATH}/dashboards/default`,
//       title: 'sidenav.dashboard',
//       icon: DashboardOutlined,
//       breadcrumb: false,
//       submenu: []
//     }
//   ]
// }]
const TaskMangementNavTree = [{
  key: 'taskmanagements',
  path: `${APP_PREFIX_PATH}/taskmanagements`,
  title: 'Task Manager',
  icon: DashboardOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  submenu: [
    {
      key: 'tasks',
      path: `${APP_PREFIX_PATH}/taskmanagements/tasks`,
      title: 'Tasks',
      icon: DatabaseFilled,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'add-tasks',
      path: `${APP_PREFIX_PATH}/taskmanagements/add-task`,
      title: 'Create Task',
      icon: PlusOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]
const JoinSocialLinkNavTree = [{
  key: 'joinsociallink',
  path: `${APP_PREFIX_PATH}/joinsociallink`,
  title: 'Join Social Link',
  icon: DashboardOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  submenu: [
    {
      key: 'links',
      path: `${APP_PREFIX_PATH}/joinsociallinks/links`,
      title: 'Social Link',
      icon: LinkOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'add-social-link',
      path: `${APP_PREFIX_PATH}/joinsociallinks/add-link`,
      title: 'Create Link',
      icon: PlusOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]
const UsersListNavTree = [{
  key: 'usermanagement',
  path: `${APP_PREFIX_PATH}/usermanagement`,
  title: 'User Management',
  icon: UsergroupAddOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  submenu: [
    {
      key: 'users',
      path: `${APP_PREFIX_PATH}/usermanagement/users`,
      title: 'Users',
      icon: UsergroupAddOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'add-user',
      path: `${APP_PREFIX_PATH}/usermanagement/add-user`,
      title: 'Create User',
      icon: PlusOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]
const chargeModuleNavTree = [{
  key: 'chargemodule',
  path: `${APP_PREFIX_PATH}/chargemodule`,
  title: 'Charge Module',
  icon: DashboardOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  submenu: [
    {
      key: 'chargemodule-default',
      path: `${APP_PREFIX_PATH}/chargemodule/create-charge`,
      title: 'Create Charge Module',
      icon: PlusOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]
const navigationConfig = [
  ...UsersListNavTree,
  ...TaskMangementNavTree,
  ...JoinSocialLinkNavTree,
  ...chargeModuleNavTree 
]

export default navigationConfig;
