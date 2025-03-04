import type { HttpContext } from '@adonisjs/core/http'
import Task from '../models/task.js'
import Project from '#models/project'

export default class TasksController {
  public async index({ response }: HttpContext) {
    const tasks = await Task.all()
    return response.json(tasks)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only([
      'title',
      'description',
      'responsible',
      'dueDate',
      'priority',
      'projectId',
    ])
    const task = await Task.create(data)
    return response.status(201).json(task)
  }

  public async show({ params, response }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    console.log('Task:', task)
    return response.json(task)
  }

  public async update({ params, request, response }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    task.merge(request.only(['title', 'description', 'responsible', 'dueDate', 'priority']))
    await task.save()
    return response.json(task)
  }

  public async destroy({ params, response }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    await task.delete()
    return response.status(204)
  }

  public async addProject({ params, request, response }: HttpContext) {
    const task = await Task.find(params.id)
    if (!task) {
      return response.notFound({ message: 'task not found' })
    }
    console.log('Current dueDate:', task)

    const { projectId } = request.only(['projectId'])

    const project = await Project.find(projectId)
    if (!project) {
      return response.notFound({ message: 'project not found' })
    }

    task.projectId = projectId
    await task.save()
    return response.json(task)
  }

  public async myTasks({ auth, response }: HttpContext) {
    const user = auth.user!
    if (!user) {
      return response.unauthorized()
    }

    const projects = await user.related('projects').query().preload('tasks')

    return response.json(projects)
  }
}
