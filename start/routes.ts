/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import AdminController from '#controllers/admin_controller'
import SubAdminController from '#controllers/subadmins_controller'
import MasterController from '#controllers/masters_controller'

router.on('/').redirectToPath('/login')

router.on('/login').render('login')
router.post('/login',[AuthController,'login'])

router.on('/register').render('register')
router.post('/register',[AuthController,'register'])

router.get('/dashboardadmin',[AdminController,'dashboard'])
router.get('/dashboardsubadmin',[SubAdminController,'dashboard'])
router.get('/dashboardmaster',[MasterController,'dashboard'])
router.post('/adminadduser',[AdminController,'createUser'])