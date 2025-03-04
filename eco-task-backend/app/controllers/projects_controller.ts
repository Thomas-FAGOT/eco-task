import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'

export default class ProjectsController {
  public async index({ response }: HttpContext) {
    const projects = await Project.all()
    return response.ok(projects)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['name'])
    const project = await Project.create(data)
    return response.created(project)
  }

  public async show({ params, response }: HttpContext) {
    const project = await Project.find(params.id)
    if (!project) return response.notFound({ message: 'Project not found' })

    await project.load('users')
    await project.load('tasks')

    return response.ok(project)
  }

  public async update({ params, request, response }: HttpContext) {
    const project = await Project.find(params.id)
    if (!project) return response.notFound({ message: 'Project not found' })

    project.merge(request.only(['name']))
    await project.save()

    return response.ok(project)
  }

  public async destroy({ params, response }: HttpContext) {
    const project = await Project.find(params.id)
    if (!project) return response.notFound({ message: 'Project not found' })

    await project.delete()
    return response.noContent()
  }

  public async addUser({ params, request, response }: HttpContext) {
    const project = await Project.find(params.id)
    if (!project) return response.notFound({ message: 'Project not found' })

    const { userId } = request.only(['userId'])

    await project.related('users').attach([userId])

    return response.ok(project)
  }
}
