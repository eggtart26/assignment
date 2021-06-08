import gql from 'graphql-tag'

export const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
    img: String!
    department: String!
    category: String!
    weight: String
    packagedWeight: String
    price: Float!
  }

  type Query {
    usersRecommendedItems: [Item]!
    item: Item
    hello: String
  }
`
