import { HttpContext } from "@adonisjs/core/http";
import User from "#models/user";

export default class AdminController {
  public async dashboard({ view }: HttpContext) {
    const user = { username: "John", userType: "Admin" }
    const all_users = (await User.all()).map((all_users)=>{
      return {
            id: all_users.$extras.Userid,
            username: all_users.$extras.Username,
            usertype: all_users.$extras.Usertype,
            status:all_users.$extras.Islock
            // Add other properties as needed
          }
    })
    return view.render('dashboard', { user,all_users})
  }
  public async createUser({ request, response }:HttpContext) {
    const userPayload = request.only([
      'username',
      'usertype',
      'password',
      'domain',
      'ParentID',
      'partner',
      'islock',
    ])
    console.log(request)
    try {
      const user = await User.create(userPayload)
      return response.status(201).redirect('/dashboardadmin')
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }

  // Additional Admin-specific actions (e.g., manage global settings)
}




