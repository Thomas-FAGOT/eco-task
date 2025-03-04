import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'add_project_id_to_tasks'

  async up() {
    this.schema.alterTable('tasks', (table) => {
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable('tasks', (table) => {
      table.dropColumn('project_id')
    })
  }
}
