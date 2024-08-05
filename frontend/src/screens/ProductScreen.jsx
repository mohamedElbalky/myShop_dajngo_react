import { useEffect, useState } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";

import Rating from "../components/Rating";

import { getProductDetails } from "../store/productSlice";

import Loader from "../components/Loader";
import Message from "../components/Message";

// import products from "../products";

export default function ProductScreen() {
  const params = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const { productDetails, loading, error } = useSelector(
    (state) => state.products
  );

  // console.log([...Array(5).keys()]) // --> [0, 1, 2, 3, 4, 5]

  useEffect(() => {
    dispatch(getProductDetails(params.uuid));
  }, [dispatch, params.uuid]);

  const addToCardHandler = () => {
    // TODO: handle add product to the card and redirect a user to sopping card
    navigate(`/cart/${params.uuid}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="mt-3">
          <Message type="danger">{error}</Message>
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
                  {productDetails.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Select
                            size="sm"
                            className="mr-auto w-75"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(productDetails.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className="text-center">
                    <Button
                      disabled={productDetails.countInStock === 0}
                      className="btn btn-dark"
                      type="button"
                      onClick={addToCardHandler}
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
