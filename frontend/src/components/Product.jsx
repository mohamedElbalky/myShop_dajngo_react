/* eslint-disable jsx-a11y/anchor-has-content */
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import Rating from './Rating';

export default function Product({ product }) {
  return (
    <Card style={{ width: '18rem' }} className='p-3'>
      <Link to={`/products/${product.uuid}`} style={{ textDecoration: "none" }}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/products/${product.uuid}`} style={{ textDecoration: "none" }}>
          <Card.Title as="div">
            <strong className='product-title'>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className='my-3'>
            < Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"} />
          </div>
        </Card.Text>
        
        < Card.Text as="h3">
          ${product.price}
        </Card.Text>

      </Card.Body>
    </Card>
  );
}
