import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Task from './task.js'
import User from './user.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task>

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>
}
