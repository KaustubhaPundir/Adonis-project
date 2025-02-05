import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Partnership extends BaseModel {
  @column({ isPrimary: true})
  declare Id: number

  @column()
  declare UserId: string

  @column()
  declare ParentId: string
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}