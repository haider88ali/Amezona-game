import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
    {
        key: 'register',
        path: `${AUTH_PREFIX_PATH}/register`,
        component: React.lazy(() => import('views/auth-views/authentication/register')),
    },
    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
    }
]

export const protectedRoutes = [
    {
        key: 'dashboard.default',
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        component: React.lazy(() => import('views/app-views/dashboards/default')),
    },
    {
        key: 'tasks',
        path: `${APP_PREFIX_PATH}/taskmanagements/tasks`,
        component: React.lazy(() => import('views/app-views/taskmanagements/tasks')),
    },
    {
        key: 'add-tasks',
        path: `${APP_PREFIX_PATH}/taskmanagements/add-task`,
        component: React.lazy(() => import('views/app-views/taskmanagements/add-task')),
    },
    {
        key: 'apps.taskmanagements.edit-task',
        path: `${APP_PREFIX_PATH}/taskmanagements/edit-task/:id`,
        component: React.lazy(() => import('views/app-views/taskmanagements/edit-task')),
    },
    {
        key: 'links',
        path: `${APP_PREFIX_PATH}/joinsociallinks/links`,
        component: React.lazy(() => import('views/app-views/joinsociallinks/links')),
    },
    {
        key: 'add-link',
        path: `${APP_PREFIX_PATH}/joinsociallinks/add-link`,
        component: React.lazy(() => import('views/app-views/joinsociallinks/add-link')),
    },
    {
        key: 'apps.joinsociallinks.edit-link',
        path: `${APP_PREFIX_PATH}/joinsociallinks/edit-link/:id`,
        component: React.lazy(() => import('views/app-views/joinsociallinks/edit-link')),
    },
    {
        key: 'users',
        path: `${APP_PREFIX_PATH}/usermanagement/users`,
        component: React.lazy(() => import('views/app-views/usermanagement/users')),
    },
    {
        key: 'add-user',
        path: `${APP_PREFIX_PATH}/usermanagement/add-user`,
        component: React.lazy(() => import('views/app-views/usermanagement/add-user')),
    },
    {
        key: 'apps.usermanagement.edit-user',
        path: `${APP_PREFIX_PATH}/usermanagement/edit-user/:id`,
        component: React.lazy(() => import('views/app-views/usermanagement/edit-user')),
    },
    {
        key: 'add-charge',
        path: `${APP_PREFIX_PATH}/chargemodule/create-charge`,
        component: React.lazy(() => import('views/app-views/chargemodule/create-charge')),
    }
]