const {gql} = require('apollo-server-express');

const typeDefs = gql`
type Book{
    _id:ID!
    authors:[String]
    description:String!
    bookId:String!
    image:String!
    link:String!
    title:String!
}
type User{
    _id:ID!
    username:String!    
    email:String!
    password:String!
    savedBooks:[Book]
}
type Mutation{
    createUser(username:String!,email:String!,password:String!) : Auth
    getSingleUser(username:String!,email:String!,password:String!) : Auth
    login(username:String!,email:String!,password:String!) : Auth
    saveBook(authors:[String],description:String!,bookId:String!,image:String!,link:String!,title:String!) : User
    deleteBook(bookId:String!) : User
}
`;

module.exports = typeDefs;