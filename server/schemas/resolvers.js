const {AuthenticationError} = require('apollo-server-express');
const{User} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {

    Query:{
        me:async(parent,args,context)=>{
            return User.findOne({_id:context.user._id});
        }
    },
    Mutation:{
        login:async(parent,{email,password})=>{
            const user = await User.findOne({email});
            if(!user){
                throw new AuthenticationError('Incorrect credentials');

            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return {token,user};
        },
        addUser:async(parent,args)=>{
            const user = await User.create(args);
            const token = signToken(user);
            return {token,user};
        },
        removeBook:async(parent,args,context)=>{
            if(context.user){
                return User.findOneAndDelete({_id:context.user._id},{$pull:{savedBooks:{bookId:args.bookId}}},{new:true});
            }
        }

    }
}

module.exports = resolvers;