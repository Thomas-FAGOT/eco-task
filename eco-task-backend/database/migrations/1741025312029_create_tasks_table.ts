import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description').nullable()
      table.string('responsible').notNullable()
      table.timestamp('due_date', { useTz: true }).defaultTo(this.now())
      table.enum('priority', ['low', 'medium', 'high']).notNullable().defaultTo('medium')
      table.float('carbon_footprint').notNullable().defaultTo(0)
      table.boolean('check').notNullable().defaultTo(false)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
