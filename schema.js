const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

var models = require('./db/models');
//Hardcoded data
const users = [
    {id: 1, name: "Tenji", email : "ppetit@netmessage.com", age: 36},
    {id: 2, name: "Tenji2", email : "ppetit@netmessage2.com", age: 35},
    {id: 3, name: "Tenji3", email : "ppetit@netmessage3.com", age: 37}
]

//Customer Type
const UserType  = new GraphQLObjectType({
    name : "User",
    fields : () => ({
        id: { type : GraphQLInt},
        first_name : {type: GraphQLString},
        last_name : {type: GraphQLString},
        email : {type: GraphQLString},
        age : {type: GraphQLInt}
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name : "rootQueryType",
    fields : {
        user : {
            type : UserType,
            args : {
                id : {type : GraphQLInt},
                email : {type : GraphQLString}
            },
            resolve(parentValue, args) {
                console.log(parentValue);
                console.log(args);
                // for (let i=0; i < users.length ; i++) {
                //     if (users[i].id === args.id) {
                //         return users[i];
                //     }
                // }
                return models.User.findById(args.id)
            }
        },
        users : {
            type : new GraphQLList(UserType),
            args : {
                id : {type : GraphQLInt},
                email : {type : GraphQLString}
            },
            resolve(parentValue, args) {
                return models.User.findAll({ where : args})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description : 'Function to add User',
    fields() {
        return {
            addUser : {
                type : UserType,
                args: {
                    first_name : {
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    last_name : {
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    email : {
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    age : {
                        type : new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(_ , args) {
                    return models.User.create({
                        first_name : args.first_name,
                        last_name : args.last_name,
                        email : args.email.toLowerCase(),
                        age : args.age
                    })
                }
            },
            deletUser : {
                type : UserType,
                args: {
                    id : {
                        type : new GraphQLNonNull(GraphQLInt)
                    },
                    email : {
                        type : new GraphQLNonNull(GraphQLInt)
                    },
                },
                resolve(_ , args) {
                    return modelscreate.User.destroy({ where :args})
                }
            },
            editUser : {
                type : UserType,
                args: {
                    id : {
                        type : new GraphQLNonNull(GraphQLInt)
                    },
                    first_name : {
                        type : GraphQLString
                    },
                    last_name : {
                        type : GraphQLString
                    },
                    email : {
                        type : GraphQLString
                    },
                    age : {
                        type : GraphQLInt
                    }
                },
                resolve : (_ , args)  => setEditUser(args)
                    // return models.User.update({
                    //     first_name : args.first_name,
                    //     last_name : args.last_name,
                    //     email : args.email,
                    //     age : args.age
                    // }, {
                    //     where: { id: args.id },
                    //     returning: true,
                    //     plain: true 
                    // })
                    // .then(result => {
                    //     models.User.findById(args.id, (user) =>{
                    //         console.log(user);
                    //         return user
                    //     })
                    // })
                    // return models.User.findById(args.id, (user) =>{
                    //     console.log(args);
                        
                    //     return user.updateAttributes({
                    //         first_name : args.first_name,
                    //             last_name : args.last_name,
                    //             email : args.email,
                    //             age : args.age
                    //     }).then(updatedUser => {

                    //         console.warn(updatedUser);
                    //         return;
                    //     })
                    // })
                // }
            },
        }
    }
})
async function setEditUser(args) {
    const queryResult = await models.User.update({
        first_name : args.first_name,
        last_name : args.last_name,
        email : args.email,
        age : args.age
    }, {
        where: { id: args.id },
        returning: true,
        plain: true 
    });
    user = await models.User.findById(args.id);
  
    return user;
}

// async function runQuery(args) {
//     console.warn('runQuery', args)
//     models.User.update({
//         first_name : args.first_name,
//         last_name : args.last_name,
//         email : args.email,
//         age : args.age
//     }, {
//         where: { id: args.id },
//         returning: true,
//         plain: true 
//     })
//     .then(result => {
//         models.User.findById(args.id).then(user =>{
//             console.warn(user.dataValues)
//             return user.dataValues;
//         })
//     })
//   }

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})
