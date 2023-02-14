const Express = require('express')
const Routes = Express.Router()


// Controllers
const AuthenticationControllers = require('../controllers/authentication/authentication')
const MemberControllers = require('../controllers/members/member')

// Routes
Routes.get('/members', MemberControllers.ListMember)
Routes.delete('/members', MemberControllers.DeleteMembers)
Routes.post('/members/register', AuthenticationControllers.Register)
Routes.post('/members/login', AuthenticationControllers.Login)

Routes.patch('/members/upgrade', MemberControllers.UpgradeMembers)

Routes.patch('/members/exp', MemberControllers.UpdateEXP)
Routes.post('/members/tags', MemberControllers.AddTags)

module.exports = Routes