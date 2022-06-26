import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import {useState, useEffect} from 'react'
import Rating from '../Components/Rating'
import axios from 'axios'

const ProductScreen = ({match}) => {
    const params = useParams();
    const [product, setProduct] = useState({})
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`/product/${params.id}`)
          setProduct(res.data)
        } catch (error) {
          console.log(error);
        }
      }
      fetchProduct()
    }, [])
    console.log(product)
  return (
    <>
      <Link className='btn btn-dark ' to={'/'}>
        Go Back
      </Link>
       <Row>
         <Col md={6}>
         <Image src={product.image} alt={product.name} fluid />
         </Col>
       
         <Col md={3}>
         <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
            </ListGroup>
         </Col>
      
         <Col md={3}>
            <Card>
             <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>
                          Price:
                        </Col>
                        <Col>
                        <strong>$ {product.price}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>
                          Status:
                        </Col>
                        <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock' }
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <div className="d-grid gap-2">
                    <Button className='btn-block' type='button' disabled={product.countInStock==0}>Add To Cart</Button>
                </div>
                </ListGroup.Item>
             </ListGroup>
            </Card>
         </Col>
       </Row>
    </>
  )
}

export default ProductScreen