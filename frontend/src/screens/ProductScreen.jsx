import { useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";

// import axios from "axios";

import Rating from "../components/Rating";

import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../store/productSlice";

import Loader from "../components/Loader";
import Message from "../components/Message";

// import products from "../products";

export default function ProductScreen() {
  let params = useParams();
  // // console.log(params);
  // // const product = products.find((p) => p._id === params.id);

  // const [product, setProduct] = useState({});

  // useEffect(() => {

  //   async function fetchProduct() {
  //     const { data } = await axios.get(`/api/products/${params.uuid}`)
  //     setProduct(data);
  //   }
  //   fetchProduct();

  // }, [params.uuid])

  const dispatch = useDispatch();
  const { productDetails, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProductDetails(params.uuid));
  }, [dispatch, params.uuid]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="mt-3">  
          <Message type="danger" >{error}</ Message>
        </div>
      ) : (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col
              lg={6}
              className="d-flex justify-content-center align-items-center"
            >
              <Image
                src={productDetails.image}
                alt={productDetails.name}
                fluid
              />
            </Col>
            <Col lg={3} className="mt-2">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{productDetails.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={productDetails.rating}
                    text={`${productDetails.numReviews} reviews`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  Description: {productDetails.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col lg={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${productDetails.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {productDetails.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center">
                    <Button
                      disabled={productDetails.countInStock === 0}
                      className="btn btn-dark"
                      type="button"
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* TODO: add review section */}
          <Row className="mt-2 text-danger">REVIEW</Row>
        </>
      )}
    </div>
  );
}
