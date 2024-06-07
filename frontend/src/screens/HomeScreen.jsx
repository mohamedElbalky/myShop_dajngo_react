

import { Row, Col } from 'react-bootstrap'

import products from '../products'

import Product from '../components/Product'



export default function HomeScreen() {
  return (
    <div>
      <h1>Latest Products</h1>
      < Row className='my-3 g-3 justify-content-center'>
        {
          products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='d-flex justify-content-center'>
              < Product product={product} />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

