import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Form, Button, Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { Message } from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from "../slices/cartSlice"


const CartScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    // const cartItems = cart.cartItems;
    const { cartItems, itemsPrice } = cart

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty })) //qty: qty  
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id)) //qty: qty  
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }

  return (
    <>
    <Link className="btn btn-light my-3" to={-1}>
                    Go Back
            </Link>
    <Row>
        <Col md={8}>
            <h1 style={{marginBottom: '20px'}}>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message>
                    Your cart is empty.
                </Message>
            ) : (
                <ListGroup variant="flush">
                    { cartItems.map((item) => (
                        <ListGroup.Item key={item._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>${item.price}</Col>
                                <Col md={2}>
                                    <Form.Control
                                        as="select"
                                        value={item.qty}
                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))} //qty: Number(e.target.value)
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button
                                        type="button"
                                        variant="light"
                                        onClick={() => removeFromCartHandler(item._id)}>
                                        <FaTrash />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                    )) }
                </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                        </h2>
                        $
                        {itemsPrice}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                            type="button"
                            className="btn-block"
                            disabled={cartItems.length === 0}
                            onClick={() => navigate('/login?redirect=/shipping')}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
        
    </Row>
    </>
  )
}

export default CartScreen