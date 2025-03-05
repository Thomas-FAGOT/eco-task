import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  public async index({ response }: HttpContext) {
    const users = await User.query().preload('projects')
    return response.ok(users)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['full_name', 'email', 'password'])
    const user = await User.create(data)
    return response.created(user)
  }

  public async show({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'User not found' })

    await user.load('projects')
    return response.ok(user)
  }

  public async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'User not found' })

    user.merge(request.only(['name', 'email']))
    await user.save()

    return response.ok(user)
  }

  public async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'User not found test' })

    await user.delete()
    return response.noContent()
  }
}
