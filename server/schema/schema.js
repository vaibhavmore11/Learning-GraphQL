const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, 
       GraphQLString,
       GraphQLSchema,
       GraphQLID,
       GraphQLInt
    } = 
    graphql;

// dummy dataa
 var books = [
     {name: 'Name of the wind', genre: 'Fantasy', id: "1", authorid: "1"},
     {name: 'The Finak Empire', genre: 'Fantasy', id: "2",authorid: "2"},
     {name: 'The Long Earth', genre: 'Sci-Fi', id: "3",authorid: "3"}
     
 ];

 var authors = [
    {name: "Patrick Rothfuss", age: 44, id: '1'},
    {name: "Brandon", age: 42, id: '2'},
    {name: "chetan bhagat", age: 54, id: '3'}
 ];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent,args){
                console.log(parent);
                return _.find(authors,{id: parent.authorid});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //for books
        book: {
            type: BookType,
            args: {id: {type: GraphQLID} },
            resolve(parent,args){
                //code to get data from db and other resoucres
               //console.log(typeof(args.id));
                return _.find(books, {id: args.id});

            }
        },
        //for the author
        author: {
            type: AuthorType,
            args: {id: {type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
