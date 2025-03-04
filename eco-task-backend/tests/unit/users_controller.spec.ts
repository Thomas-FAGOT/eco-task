import sinon from 'sinon'
import { assert as japaAssert } from '@japa/assert'
import { test } from '@japa/runner'
import { HttpContext } from '@adonisjs/core/http'
import UsersController from '../../app/controllers/users_controller.js'
import User from '#models/user'

// Mock du contexte HTTP
function createFakeContext(overrides: Partial<HttpContext> = {}): HttpContext {
  return {
    request: {
      only: sinon.stub().callsFake((keys: string[]) =>
        keys.reduce<Record<string, unknown>>((acc, key) => {
          acc[key] = `mock_${key}`
          return acc
        }, {})
      ),
    },
    response: {
      ok: sinon.stub(),
      created: sinon.stub(),
      notFound: sinon.stub(),
      noContent: sinon.stub(),
    },
    params: { id: 1 },
    ...overrides,
  } as unknown as HttpContext
}

// Nettoyage des mocks après chaque test
test.group('Users Controller', (group) => {
  group.each.teardown(() => {
    sinon.restore()
  })

  test('index() doit retourner tous les utilisateurs avec leurs projets', async ({ assert }) => {
    const usersMock = [{ id: 1, full_name: 'John Doe', projects: [] }]

    sinon.stub(User, 'query').returns({
      preload: sinon.stub().resolves(usersMock),
    } as any)

    const ctx = createFakeContext()
    const controller = new UsersController()
    console.log("test de la connexion")

    await controller.index(ctx)

    sinon.assert.calledWith(ctx.response.ok as sinon.SinonStub, usersMock)
  })

  test('store() doit créer un nouvel utilisateur', async ({ assert }) => {
    const userMock = { id: 1, full_name: 'John Doe', email: 'john@example.com', password: 'hashed' }

    sinon.stub(User, 'create').resolves(userMock as any)

    const ctx = createFakeContext()
    const controller = new UsersController()

    await controller.store(ctx)

    sinon.assert.calledWith(ctx.response.created as sinon.SinonStub, userMock)
  })

  test('show() doit retourner un utilisateur existant', async ({ assert }) => {
    const userMock = { id: 1, full_name: 'John Doe', load: sinon.stub().resolves(null) }

    sinon.stub(User, 'find').resolves(userMock as any)

    const ctx = createFakeContext()
    const controller = new UsersController()

    await controller.show(ctx)

    sinon.assert.calledWith(ctx.response.ok as sinon.SinonStub, userMock)
  })

  test('show() doit retourner une erreur 404 si l’utilisateur n’existe pas', async ({ assert }) => {
    sinon.stub(User, 'find').resolves(null)

    const ctx = createFakeContext()
    const controller = new UsersController()

    await controller.show(ctx)

    sinon.assert.calledWith(ctx.response.notFound as sinon.SinonStub, { message: 'User not found' })
  })

  test('update() doit modifier un utilisateur existant', async ({ assert }) => {
    const userMock = {
      id: 1,
      full_name: 'John Doe',
      email: 'john@example.com',
      merge: sinon.stub(),
      save: sinon.stub(),
    }

    sinon.stub(User, 'find').resolves(userMock as any)

    const ctx = createFakeContext()
    const controller = new UsersController()

    await controller.update(ctx)

    sinon.assert.called(userMock.merge as sinon.SinonStub)
    sinon.assert.called(userMock.save as sinon.SinonStub)
    sinon.assert.calledWith(ctx.response.ok as sinon.SinonStub, userMock)
  })

  test('update() doit retourner une erreur 404 si l’utilisateur n’existe pas', async ({
    assert,
  }) => {
    sinon.stub(User, 'find').resolves(null)

    const ctx = createFakeContext()
    const controller = new UsersController()

    await controller.update(ctx)

    sinon.assert.calledWith(ctx.response.notFound as sinon.SinonStub, { message: 'User not found' })
  })

  test('destroy() doit supprimer un utilisateur existant', async ({ assert }) => {
    const userMock = { id: 1, delete: sinon.stub() }

    sinon.stub(User, 'find').resolves(userMock as any)

    const ctx = createFakeContext()
    const controller = new UsersController()

    await controller.destroy(ctx)

    sinon.assert.called(userMock.delete as sinon.SinonStub)
    sinon.assert.called(ctx.response.noContent as sinon.SinonStub)
  })

  test('destroy() doit retourner une erreur 404 si l’utilisateur n’existe pas', async ({
    assert,
  }) => {
    sinon.stub(User, 'find').resolves(null)

    const ctx = createFakeContext()
    const controller = new UsersController()

    await controller.destroy(ctx)

    sinon.assert.calledWith(ctx.response.notFound as sinon.SinonStub, { message: 'User not found' })
  })
})
