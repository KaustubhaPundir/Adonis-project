import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('Userid').notNullable()
      table.string('Username').notNullable()
      table.string('Usertype').notNullable
      table.string('ParentID')
      table.string('Domain')
      table.string('Partner')
      table.string('Islock').notNullable()
      table.bigInteger('Balance')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}