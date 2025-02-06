import User from "#models/user";
import { HttpContext } from "@adonisjs/core/http";
import { schema, rules } from '@adonisjs/validator'

export default class AuthController {

    async login({request,response}:HttpContext){
        const userSchema = schema.create({
            username: schema.string(),
            password: schema.string({}, [
              rules.minLength(6)  // Minimum 8 characters for password
            ])
        })

        const data = await request.validate({
            schema: userSchema,
            messages: {
              'username.required': 'username is required',
              'password.required': 'Password is required',
              'password.minLength': 'Password must be at least 6 characters'
            }
        })
        try{
            
            const user = await User.verifyCredentials(data.username, data.password)
            if(!user) return response.status(404).json({message:'User not found'});

            const token = await User.accessTokens.create(user);
            return response.send(token)
        }catch(err){
          console.log(err);
            return response.status(500).json({message:'Internal Server Error'});
        }
    }

    async register({request,response}:HttpContext){
        const userSchema = schema.create({
            username: schema.string(),
            password: schema.string({}, [
              rules.minLength(6)
            ]),
            usertype: schema.enum(['Admin', 'Subadmin', 'Master', 'User'])
        })

        const data = await request.validate({
            schema: userSchema,
            messages: {
              'username.required': 'username is required',
              'password.required': 'Password is required',
              'password.minLength': 'Password must be at least 6 characters',
              'usertype.required': 'usertype is required'
            }
        })

        try{
           
            const userExist = await User.findBy('Username',data.username);
            if(userExist) return response.status(400).send('<h1>User already registered</h1>');

            const user = new User();
            
            user.Username = data.username;
            user.Usertype= data.usertype;
            user.Password = data.password;

            user.save();

            response.send('<h1>User registration success</h1>')

        }catch(err){
            console.log('errr',err)
            return response.status(500).json({message:'internal server error'})
        }

    }
}