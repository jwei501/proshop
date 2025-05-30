//import { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
// Axios is used to send an HTTP GET request to the backend API endpoint '/api/products'
// It returns a promise that resolves with the response data (products in this case)
// the api endpoint is defined in the backend/server.js file
//import axios from 'axios'

import { useGetProductsQuery } from '../slices/productApiSlice'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { Link, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

function HomeScreen() {
  /** 
  // Declare a state variable 'products' and a function 'setProducts' to update it.
  // Initialize 'products' as an empty array
  const [products, setProducts] = useState([])

  // useEffect runs after the component mounts.
  // The empty dependency array [] means this effect runs only once
  useEffect(() => {
    // Define an asynchronous function to fetch product data from the backend API
    const fetchProducts = async () => {
      // Send a GET request to '/api/products' using Axios and store the response data 
      const {data} = await axios.get('/api/products')
      setProducts(data)
    }

    // Call the fetchProducts function to get the product data
    fetchProducts()
  }, [])
  */


 const{ pageNumber, keyword } = useParams()
 const {data, error, isLoading} = useGetProductsQuery({pageNumber, keyword})

  return (
    <>  
        { !keyword ? (<ProductCarousel />) : (<Link to='/' className='btn btn-light mb-4'>Go Back</Link>) }
        { isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <>
            <h1>Latest Products</h1>
            <Row>
                {data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product = {product}></Product>
                </Col>
                ))}
            </Row>
            <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
        </>) }

    </>
  )
}

export default HomeScreen