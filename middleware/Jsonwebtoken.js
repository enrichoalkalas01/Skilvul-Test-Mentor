const JWT = require('jsonwebtoken')

module.exports = {
    async Create(req, res, next) {
        try {
            let token = JWT.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: req.JWTCreateData
            }, process.env.SecretKey)
            
            req.tokenStatus = true
            req.tokenAuth = token
        } catch (error) {
            req.tokenStatus = false
            req.tokenAuth = ''
        }
    },

    async Verify(req, res, next) {
        try {
            if ( !req.headers.authorization ) req.tokenStatus = false
            else {
                let token = req.headers.authorization.split(' ')
                if ( token[0].toLowerCase() !== 'bearer' ) req.tokenStatus = false
                else {
                    let getTokenData = JWT.verify(token[1], process.env.SecretKey)
                    req.tokenStatus = true
                    req.tokenData = getTokenData.data
                }
            }
        } catch (error) {
            req.tokenStatus = false
            req.tokenData = ''
        }
    }
}