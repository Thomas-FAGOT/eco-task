import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare responsible: string

  @column.dateTime()
  declare dueDate: DateTime

  @column()
  declare priority: 'low' | 'medium' | 'high'

  @column()
  declare carbonFootprint: number

  @column()
  declare projectId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async calculateCarbonFootprint(task: Task) {
    // Calculate the carbon footprint
    task.carbonFootprint = task.priority === 'high' ? 10 : task.priority === 'medium' ? 5 : 2
  }
}
