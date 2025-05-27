import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { toast } from "react-toastify"
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from "../slices/productApiSlice"

const ProductEditScreen = () => {
    const { id: productId } = useParams()
    //console.log('Product ID:', productId)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const { data: product, error, isLoading, refetch } = useGetProductDetailsQuery(productId)

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation()

    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation()

    const navigate = useNavigate()

    useEffect(() => {
        if (product) {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [product])

    const submitHandler = async (e) => {
        e.preventDefault()
        const updatedProduct = {
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        }

        //console.log('Product ID 2:', productId)

        const result = await updateProduct(updatedProduct)
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success('Product updated successfully')
            navigate('/admin/productlist')
        }

    }

    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap()
            setImage(res.image)
            toast.success('Image uploaded successfully')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }

    }


  return (
    <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
            { loadingUpdate && <Loader /> }
            { isLoading ? <Loader /> : 
              error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
              <Form onSubmit={ submitHandler }>
                <Form.Group controlId='name' className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter product name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='price' className='mb-3'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter product price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='image' className='mb-3'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter product image URL" 
                        value={image} onChange={(e) => setImage} >
                    </Form.Control>
                    <Form.Control type='file' 
                        label='Choose File' 
                        onChange={uploadFileHandler} >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='brand' className='mb-3'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter product brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='category' className='mb-3'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter product category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='countInStock' className='mb-3'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter count in stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='description' className='mb-3'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter product description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary' className="my-2">
                    Update
                </Button>

                
              </Form>
            )}
        </FormContainer>
    </>
  )
}

export default ProductEditScreen