import React from 'react'
import {Row, Col, Container} from 'react-bootstrap'
import axios from 'axios'
import Product from '../Components/Product'
import { useEffect, useState } from 'react'


const HomeScreen = () => {
  const [products, setProducts] = useState([]) 
   
  useEffect(() => {
    console.log('useEffect hook');
    const fetchProduct = async () => {
      try {
        const res = await axios.get('/api/products')
        setProducts(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct()
  }, []);
  return (
    <> 
    <h3>Latest Products</h3>  
     <Row>
       {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product}/>
        </Col>
       ))}
     </Row>
    </>
  )
}

export default HomeScreen