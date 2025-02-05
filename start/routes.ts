/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
// import AuthController from '#controllers/auth_controller'

router.on('/').redirectToPath('/login')

router.on('/login').render('login')

router.on('/register').render('register')
