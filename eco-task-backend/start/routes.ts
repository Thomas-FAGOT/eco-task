/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const TasksController = () => import('#controllers/tasks_controller')
const ProjectsController = () => import('#controllers/projects_controller')
const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')

router.on('/').render('pages/home')
router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
    router.post('/logout', [AuthController, 'logout'])
    router.get('/me', [AuthController, 'me'])

    router.get('/tasks', [TasksController, 'index'])
    router.post('/tasks', [TasksController, 'store'])
    router.get('/tasks/project/:id', [TasksController, 'indexByProject'])
    router.get('/tasks/:id', [TasksController, 'show'])
    router.put('/tasks/:id', [TasksController, 'update'])
    router.put('/checkTasks/:id', [TasksController, 'checkTask'])
    router.delete('/tasks/:id', [TasksController, 'destroy'])
    router.post('/tasks/:id/add-project', [TasksController, 'addProject'])

    router.get('/projects', [ProjectsController, 'index'])
    router.post('/projects', [ProjectsController, 'store'])
    router.get('/projects/:id', [ProjectsController, 'show'])
    router.put('/projects/:id', [ProjectsController, 'update'])
    router.delete('/projects/:id', [ProjectsController, 'destroy'])
    router.post('/projects/:id/add-user', [ProjectsController, 'addUser'])

    router.get('/users', [UsersController, 'index'])
    router.post('/users', [UsersController, 'store'])
    router.get('/users/:id', [UsersController, 'show'])
    router.put('/users/:id', [UsersController, 'update'])
    router.delete('/users/:id', [UsersController, 'destroy'])
  })
  .prefix('/api')
