import Head from 'next/head'
import { gql } from "@apollo/client";
// import client from "../apollo-client";
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../../../apollo/client';
import { useRouter } from 'next/router'
import Carousel from 'react-elastic-carousel'

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
        <h2>{item.data.item.name}</h2>

        <div className="grid">
          <img src={"/images/"+item.data.item.img}/>
        </div>

        <div className="abouttitle">
          <h2>About this item</h2>
        </div>
        <ul className="about">
          <li><h3>Specification</h3></li>
          <li><h4>
            {  item.data.item.department === "grocery"?
              "Weight" :
              "Shipping Weight"
            }
          </h4></li>
          <li><p>{item.data.item.weight}</p></li>
          <li><h4>Department</h4></li>
          <li><p>{item.data.item.department}</p></li>
          <li><h4>Category</h4></li>
          <li><p>{item.data.item.category}</p></li>
        </ul>

        <div className="carouseltitle">
          {data.data.usersRecommendedItems.length > 0 ?
            (<h2>Products You May Also Like</h2>):
            (<h2>You don't have like Products</h2>)
          } 
        </div>
        {data.data.usersRecommendedItems.length > 0 ? (
          <Carousel
            isRTL={false}
            pagination={false}
            itemsToShow = {5}
          >
            {data.data.usersRecommendedItems.map((product) => (
              <div className="card">
                <div style={{display: "table", margin: "0 auto"}}>
                  <img src={"/images/"+product.img}/>
                </div>
                <p><a href={"/ip/"+product.name+"/"+product.id+"?username="+username}>{product.name}</a></p>
                <h3>${product.price}</h3>
              </div>
            ))}
          </Carousel>
        ) : null}
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
          width: 1000px;
          border: 2px solid black;
          padding: 15px
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

        .carouseltitle h2 {
          margin: 0;
          padding: 10px 0;
          margin-bottom: 60px;
        }

        .rec-carousel-wrapper {
          margin-top: 60px;
        }

        .card {
          width: 95%;
          padding: 10px;
          border: 1px solid #dbdbdb;
        }

        .card img{
          width: 120px;
          height: 120px;
        }

        .card p{
          height: 40px;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
        @media (max-width: 825px) {
          main {
            max-width: 580px;
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