import { HttpContext } from "@adonisjs/core/http";
import User from "#models/user";

export default class UserController {
   async dashboard({ view }: HttpContext) {
          const user = { username: "John", userType: "Admin" }
          const all_users = (await User.query().select('*').from('users').whereNot('Usertype','Admin').whereNot('Usertype','Subadmin').whereNot('Usertype','Master')).map((all_users)=>{
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
    
}
