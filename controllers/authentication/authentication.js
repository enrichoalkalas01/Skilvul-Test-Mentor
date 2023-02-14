const Bcrypt = require('bcrypt')
const MemberModels = require('../../models/index').members
const JWT = require('../../middleware/Jsonwebtoken')

module.exports = {
    async Register(req, res, next) {
        try {
            const { firstname, lastname, password } = req.body
            if ( !firstname || !lastname || !password || (typeof firstname !== 'string')
            || (typeof lastname !== 'string') || (typeof password !== 'string') ) {
                const error = new Error('Wrong condition of input!')
                error.status = 400
                throw error
            } else {
                let findData = await MemberModels.findAll({ where: { username: firstname + lastname } })
                if ( findData.length > 0 ) {
                    const error = new Error('User has been exist!')
                    error.status = 400
                    throw error
                } else {
                    let hashedPassword = await Bcrypt.hash(password, 10)
                    let createData = {
                        firstName: firstname,
                        lastName: lastname,
                        username: firstname + lastname,
                        password: hashedPassword,
                        type: "free",
                        exp: 0,
                    }

                    await MemberModels.create(createData)

                    res.status(200).json({
                        statusCode: 200,
                        statusText: 'Successfull to register!',
                        message: 'Successfull to register!',
                    })
                }
            }
        } catch (error) {
            next(error)
        }
    },

    async Login(req, res, next) {
        try {
            const { username, password } = req.body
            if ( !username || !password || (typeof username !== 'string') || (typeof password !== 'string') ) {
                const error = new Error('Wrong condition of input!')
                error.status = 400
                throw error
            } else {
                let findData = await MemberModels.findOne({ where: { username: username } })
                if ( !findData ) {
                    const error = new Error('User is not exist!')
                    error.status = 400
                    throw error
                } else {
                    let checkedPassword = await Bcrypt.compare(password, findData.dataValues.password)
                    if ( !checkedPassword ) {
                        const error = new Error('User is not exist!')
                        error.status = 400
                        throw error
                    } else {
                        req.JWTCreateData = {
                            firstname: findData.dataValues.firstName,
                            lastname: findData.dataValues.lastName,
                            username: findData.dataValues.username,
                            type: findData.dataValues.type
                        }

                        JWT.Create(req, res, next)

                        if ( !req.tokenStatus ) {
                            const error = new Error('Failed to auth the token!')
                            error.status = 400
                            throw error
                        } else {

                            res.status(200).json({
                                statusCode: 200,
                                statusText: 'Successfull to login!',
                                message: 'Successfull to login!',
                                data: {
                                    type: findData.dataValues.type,
                                    firstname: findData.dataValues.firstName,
                                    lastname: findData.dataValues.lastName,
                                    username: findData.dataValues.username,
                                    access_token: req.tokenAuth
                                }
                            })
                        }
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }
}