import { useParams, useNavigate } from "react-router-dom"
import { use, useState } from "react"
import { Link } from "react-router-dom"
import { Form, Row, Col, Image, ListGroup, Card, Button} from "react-bootstrap"
import { useDispatch } from "react-redux"
import Rating from "../components/Rating"
import { useGetProductDetailsQuery } from "../slices/productApiSlice"
import { Loader } from "../components/Loader"
import { Message } from "../components/Message"
import { addToCart } from "../slices/cartSlice"
import { useEffect } from "react"
// Axios is used to send an HTTP GET request to the backend API endpoint '/api/products'
// It returns a promise that resolves with the response data (product in this case)
// the api endpoint is defined in the backend/server.js file
//import axios from "axios"

const ProductScreen = () => {
    /** 
    const [product, setProduct] = useState({})
    // get the id from the URL that is passed from the router in index.js
    // and take it into the productId variable
    const { id: productId } = useParams()

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${productId}`)
            setProduct(data)
        }

        fetchProduct()
    }, [productId])
    */

    const { id: productId } = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [qty, setQty] = useState(1)

    const [message, setMessage] = useState('')

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty })) //qty: qty  
        setMessage(`${qty} items added to cart`)
        //const timer = setTimeout(() => navigate('/cart'), 2000)
    }

    const { data: product, error, isLoading } = useGetProductDetailsQuery(productId)


    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {setMessage('')}, 2000)
            return () => clearTimeout(timer)
        }
    }, [message])

  return (
    <>  
        <Link className="btn btn-light my-3" to={-1}>
                Go Back
        </Link>

        {/**<Message variant='danger'>Hello Alert</Message>}*/}
        
        { isLoading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
            <>
                {message && (<Message variant='success'>{message}</Message>)}
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quanty:</Col>
                                            <Col>
                                                <Form.Control
                                                    as='select'
                                                    value={qty}
                                                    onChange={(e) => setQty(Number(e.target.value))}>
                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={ x + 1 } value={ x + 1 }>
                                                                { x + 1 }
                                                            </option>
                                                        ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <Button className="btn-block" 
                                      type="button" 
                                      disabled={product.countInStock === 0}
                                      onClick={addToCartHandler}>
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                    </Col>

                </Row>
            </>)
        }
        
    </>
  )
}

export default ProductScreen