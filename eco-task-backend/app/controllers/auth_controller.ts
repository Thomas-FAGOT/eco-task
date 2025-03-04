import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    const { email, password, fullName } = request.only(['email', 'password', 'fullName'])

    const userExists = await User.findBy('email', email)
    if (userExists) {
      return response.conflict({ message: 'Email déjà utilisé' })
    }

    const user = await User.create({ email, password, fullName })
    return response.created({ message: 'Utilisateur créé avec succès', user })
  }

  public async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)
    if (!user) {
      return response.unauthorized({ message: 'Email ou mot de passe incorrect' })
    }

    // Vérifier si le mot de passe est correct
    const passwordValid = await hash.verify(user.password, password)
    if (!passwordValid) {
      return response.unauthorized({ message: 'Email ou mot de passe incorrect' })
    }

    // Connecter l'utilisateur via le système de session
    await auth.use('web').login(user)

    return response.ok({ message: 'Connexion réussie' })
  }

  public async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.ok({ message: 'Déconnexion réussie' })
  }

  public async me({ response, auth }: HttpContext) {
    console.log('Réponse du backend :', auth.user)
    if (!auth.user) {
      return response.unauthorized({ message: 'Non connecté' })
    }
    return response.ok({ user: auth.user })
  }
}
