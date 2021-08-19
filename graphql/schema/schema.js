const { buildSchema } = require('graphql');
module.exports = buildSchema(`

type Event {
  _id: ID!
  title: String!
 
  
}

input EventInput {
  title: String!
}

type RootQuery {
  events: [Event!]!
  getEvent(eventId: ID!):Event!
  getEventByTitle(eventTitle: String!):[Event!]!
}
type RootMutation {
    createEvent(eventInput: EventInput): Event
    
    deleteEvent(eventId: ID!): Event!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
