const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp  = require('express-graphql');
const { buildSchema } = require('graphql')

const app = express();
app.use(bodyParser.json());

const listEvents = ['Romantic Cooking', 'Saling', 'All-Night Coding']

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`

        type RootQuery {
            events : [String!]!
        }

        type RootMutation {
            createEvent(name: String) : String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return listEvents
        },
        createEvent: (args) => {
            listEvents.push(args.name)
            return args.name
        }
    },
    graphiql: true
}))



app.listen(3000)