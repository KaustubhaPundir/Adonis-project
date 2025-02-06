import { HttpContext } from "@adonisjs/core/http";
import User from '../models/user.js'

export default class SubAdminController {
 async dashboard({ view }: HttpContext) {
      const user = { username: "John", userType: "Admin" }
      const all_users = (await User.query().select('*').from('users').whereNot('Usertype','Admin')).map((all_users)=>{
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
    // Only subadmins can create master and user accounts
    if (auth.user.usertype !== 'subadmin') {
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

    // Only allow creating 'master' or 'user' types
    if (userPayload.usertype !== 'master' && userPayload.usertype !== 'user') {
      return response
        .status(400)
        .send({ error: 'Sub-admins can only create master or user accounts' })
    }

    try {
      const user = await User.create(userPayload)
      return response.status(201).send(user)
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }

  // Additional SubAdmin-specific actions
}
