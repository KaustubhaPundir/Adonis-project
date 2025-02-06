import { HttpContext } from "@adonisjs/core/http";
import User from '../models/user.js'

export default class MasterController {
  async dashboard({ view }: HttpContext) {
        const user = { username: "John", userType: "Admin" }
        const all_users = (await User.query().select('*').from('users').whereNot('Usertype','Admin').whereNot('Usertype','Subadmin')).map((all_users)=>{
          return {
                id: all_users.$extras.Userid,
                username: all_users.$extras.Username,
                usertype: all_users.$extras.Usertype,
                status:all_users.$extras.Islock
                // Add other properties as needed
              }
        })
        console.log(all_users)
        return view.render('dashboard', { user,all_users})
      }
  async createUser({ request, response, auth }) {
    // Only masters can create user accounts
    if (auth.user.usertype !== 'master') {
      return response.status(403).send({ error: 'Unauthorized' })
    }

    const userPayload = request.only([
      'username',
      'usertype',
      'parentID',
      'domain',
      'partner',
      'islock',
      'balance',
    ])

    // Only allow creating 'user' types
    if (userPayload.usertype !== 'user') {
      return response
        .status(400)
        .send({ error: 'Masters can only create user accounts' })
    }

    try {
      const user = await User.create(userPayload)
      return response.status(201).send(user)
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }

  // Additional Master-specific actions
}
