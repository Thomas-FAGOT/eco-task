import type { HttpContext } from '@adonisjs/core/http'
import Task from '../models/task.js'
import Project from '#models/project'
import db from '@adonisjs/lucid/services/db'

export default class TasksController {
  public async index({ response }: HttpContext) {
    const taskQuery = db.from('tasks')
    const carbonFootprint = await taskQuery.select('id', 'title as n')

    return response.json(carbonFootprint)
    // const tasks = await Task.all()
    // return response.json(tasks)
  }

  public async indexByProject({ params, response }: HttpContext) {
    if (params.id === undefined) {
      return response.badRequest({ message: 'projectId is required' })
    }
    const tasks = await Task.query().where('projectId', params.id)
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
    if (task) {
      this.updateCarbonHistory(data.projectId)
    }
    return response.status(201).json(task)
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

  public async checkTask({ params, response }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    task.check = !task.check
    await task.save()
    await this.updateCarbonHistory(task.projectId)
    return response.json(task)
  }

  public async getCarbonFootprint({ response }: HttpContext) {
    const taskQuery = db.from('tasks')

    const carbonFootprint = await taskQuery
      .select('project_id')
      .sum('carbon_footprint as total')
      .groupBy('project_id')

    return response.json(carbonFootprint)
  }

  public async getCarbonFootprintHistory({ response, params }: HttpContext) {
    const { projectId } = params

    const history = await db
      .from('carbon_history')
      .where('project_id', projectId)
      .select('recorded_at')
      .sum('carbon_footprint_total as total')
      .groupBy('recorded_at')
      .orderBy('recorded_at', 'asc')

    return response.json(history)
  }

  public async updateCarbonHistory(projectId: number) {
    const taskQuery = db.from('tasks')

    const totalCarbonFootprint = await taskQuery
      .where('project_id', projectId)
      .andWhere('check', false) // Seulement les tâches non terminées
      .sum('carbon_footprint as total')

    await db.table('carbon_history').insert({
      project_id: projectId,
      carbon_footprint_total: totalCarbonFootprint[0].total,
    })
  }
}
