import Head from 'next/head'
import { gql } from "@apollo/client";
// import client from "../apollo-client";
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../apollo/client';
import { useRouter } from 'next/router'

const DataQuery = gql`
  query UsersRecommendedItems($username: String!) {
    usersRecommendedItems(username: $username) {
      id
      name
      img
      department
      category
      weight
      packagedWeight
      price
    }
  }
`

const ItemQuery = gql`
  query Item($id: ID!) {
    item(id: $id) {
      id
      name
      img
      department
      category
      weight
      packagedWeight
      price
    }
  }
`

function Home(props) {
  const router = useRouter()
  const { name, id, username } = router.query
  const data = useQuery(DataQuery, { variables: {username: username ?username : "james"} })
  const item = useQuery(ItemQuery, { variables: {id: id ? id : "0007"} })

  if (data.loading && item.loading) return null;
  if (data.error && item.error) return `Error!`;

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p className="logo">
          <h2>{item.data.item.name}</h2>
        </p>

        <div className="grid">
          <img src={"./images/"+item.data.item.img}/>
        </div>

        <div className="abouttitle">
          <h2>About this item</h2>
        </div>
        <ul className="about">
          <li><h3>Specification</h3></li>
          <li><h4>Weight</h4></li>
          <li><p>{item.data.item.weight}</p></li>
          <li><h4>Department</h4></li>
          <li><p>{item.data.item.department}</p></li>
          <li><h4>Category</h4></li>
          <li><p>{item.data.item.category}</p></li>
        </ul>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 800px;
        }

        img {
          width: 300px;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          min-width: 500px;
          margin-top: 3rem;
        }

        .about {
          list-style: none;
          padding: 0px;
        }

        .about h3 {
          margin-bottom: 25px;
        }

        .about h4 {
          margin: 15px 0;
        }

        .abouttitle h2 {
          margin: 0;
          padding: 10px 0;
          border-bottom: 1px solid #dbdbdb;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
        @media (max-width: 800px) {
          main {
            max-width: 500px;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default withApollo(Home)