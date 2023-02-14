const MemberModels = require('../../models/index').members
const RelMemberTags = require('../../models/index').rel_membertags
const TagsModels = require('../../models/index').tags

const JWT = require('../../middleware/Jsonwebtoken')

module.exports = {
    async ListMember(req, res, next) {
        try {
            let getData = await MemberModels.findAll({
                attributes: ['id', 'firstName', 'lastName', 'username', 'type', 'exp'],
                include: [
                    {
                        model: RelMemberTags,
                        as: 'member_tags',
                        attributes: ['tags_id'],
                        include: [
                            {
                                model: TagsModels,
                                as: 'tags_data',
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            })

            let newArrData = []
            getData.forEach(element => {
                newArrData.push({
                    id: element.dataValues.id,
                    username: element.dataValues.username,
                    fullname: element.dataValues.firstName + element.dataValues.lastName,
                    age: element.dataValues.age ? element.dataValues.age : 0,
                    type: element.dataValues.type,
                    exp: element.dataValues.exp,
                    level:  element.dataValues.exp > 1000 ? 2 : 
                            element.dataValues.exp > 1500 ? 3 :
                            element.dataValues.exp > 2000 ? 4 :
                            element.dataValues.exp > 3000 ? 5 : 1,
                    member_tags: element.dataValues.member_tags
                })
            })

            res.status(200).json({
                statusCode: 200,
                statusText: 'Successfull to get data!',
                message: 'Successfull to get data!',
                data: newArrData,
                total_data: newArrData.length
            })
        } catch (error) {
            next(error)
        }
    },

    async UpdateEXP(req, res, next) {
        try {
            JWT.Verify(req, res, next)
            if ( !req.tokenStatus ) {
                const error = new Error('Unauthorized!')
                error.status = 401
                throw error
            } else {
                let getDataUser = await MemberModels.findOne({ where: { username: req.tokenData.username } })
                if ( !getDataUser ) {
                    const error = new Error('Members Not Found!')
                    error.status = 400
                    throw error
                } else {
                    if ( getDataUser.dataValues.exp >= 3000 ) {
                        const error = new Error('Maximum limit exp!')
                        error.status = 400
                        throw error
                    } else {
                        let updateExp = await MemberModels.update({ exp: getDataUser.dataValues.exp + 250 }, { where: { username: req.tokenData.username } })
                        if ( updateExp[0] !== 1 ) {
                            const error = new Error('Failed to update exp!')
                            error.status = 400
                            throw error
                        } else {
                            res.status(200).json({
                                statusCode: 200,
                                statusText: 'Successfull to add exp!',
                                message: 'Successfull to add exp!',
                            })
                        }
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    },

    async AddTags(req, res, next) {
        try {
            JWT.Verify(req, res, next)
            if ( !req.tokenStatus ) {
                const error = new Error('Unauthorized!')
                error.status = 401
                throw error
            } else {
                const { member_tag_name } = req.body
                if ( !member_tag_name || (typeof member_tag_name !== 'string') ) {
                    const error = new Error('Wrong input member tags!')
                    error.status = 400
                    throw error
                } else {
                    let getDataUser = await MemberModels.findOne({
                        where: { username: req.tokenData.username },
                        attributes: ['id', 'firstName', 'lastName', 'username', 'type', 'exp'],
                        include: [
                            {
                                model: RelMemberTags,
                                as: 'member_tags',
                                attributes: ['tags_id'],
                                include: [
                                    {
                                        model: TagsModels,
                                        as: 'tags_data',
                                        attributes: ['name']
                                    }
                                ]
                            }
                        ]
                    })
    
                    if ( !getDataUser ) {
                        const error = new Error('Members Not Found!')
                        error.status = 400
                        throw error
                    } else {
                        if ( getDataUser.dataValues.member_tags.length >= 3 ) {
                            const error = new Error('Maximum limit from add users tags!')
                            error.status = 400
                            throw error
                        } else {
                            let createTags = await TagsModels.create({ name:  member_tag_name  })
                            let createRelations = await RelMemberTags.create({
                                members_id: getDataUser.dataValues.id,
                                tags_id: createTags.dataValues.id,
                                memberId: getDataUser.dataValues.id
                            })

                            await TagsModels.update(
                                { tags_id:  createRelations.dataValues.id  },
                                { where: { id: createTags.dataValues.id } }
                            )
                            res.status(200).json({
                                statusCode: 200,
                                statusText: 'Successfull to create tags member!',
                                message: 'Successfull to create tags member!',
                            })
                        }
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    },

    async UpgradeMembers(req, res, next) {
        try {
            JWT.Verify(req, res, next)
            if ( !req.tokenStatus ) {
                const error = new Error('Unauthorized!')
                error.status = 401
                throw error
            } else {
                let getDataUser = await MemberModels.findOne({ where: { username: req.tokenData.username } })

                if ( !getDataUser ) {
                    const error = new Error('Members Not Found!')
                    error.status = 400
                    throw error
                } else {
                    if ( getDataUser.dataValues.type !== 'free' || getDataUser.dataValues.exp <= 1000 ) {
                        const error = new Error('Cant upgrade members!')
                        error.status = 400
                        throw error
                    } else {
                        let updateTypeMember = await MemberModels.update({ type: 'gold' }, { where: { username: req.tokenData.username } })
                        if ( updateTypeMember[0] !== 1 ) {
                            const error = new Error('Failed to upgrade members!')
                            error.status = 400
                            throw error
                        } else {
                            res.status(200).json({
                                statusCode: 200,
                                statusText: 'Successfull to upgrade members!',
                                message: 'Successfull to upgrade members!',
                            })
                        }
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    },

    async DeleteMembers(req, res, next) {
        try {
            JWT.Verify(req, res, next)
            if ( !req.tokenStatus ) {
                const error = new Error('Unauthorized!')
                error.status = 401
                throw error
            } else {
                let getDataUser = await MemberModels.findOne({
                    where: { username: req.tokenData.username },
                    attributes: ['id', 'firstName', 'lastName', 'username', 'type', 'exp'],
                    include: [
                        {
                            model: RelMemberTags,
                            as: 'member_tags',
                            attributes: ['id', 'tags_id'],
                            include: [
                                {
                                    model: TagsModels,
                                    as: 'tags_data',
                                    attributes: ['name']
                                }
                            ]
                        }
                    ]
                })

                if ( !getDataUser ) {
                    const error = new Error('Members Not Found!')
                    error.status = 400
                    throw error
                } else {
                    if ( getDataUser.dataValues.member_tags.length > 0 ) {
                        getDataUser.dataValues.member_tags.map(async e => {
                            await TagsModels.destroy({ where: { id: e.tags_id } })
                            await RelMemberTags.destroy({ where: { id: e.id } })
                        })
                    }

                    let deleteMembers = await MemberModels.destroy({ where: { id: getDataUser.dataValues.id } })

                    if ( deleteMembers !== 1 ) {
                        const error = new Error('Failed to delete members!')
                        error.status = 400
                        throw error
                    } else {
                        res.status(200).json({
                            statusCode: 200,
                            statusText: 'Successfull to delete members!',
                            message: 'Successfull to delete members!',
                        })
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }
}