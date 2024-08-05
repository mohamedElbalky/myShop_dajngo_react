import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { AddToCart, RemoveFromCart } from "../store/cartSlice.js";

export default function CartScreen() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // const qty = location.search? Number(new URLSearchParams(location.search).get('qty')) : 1;
  const qty = location.search ? +location.search.split("=")[1] : 1;


  // const [qtyValue, setQtyValue] = useState(qty);

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!params.uuid) {
      cartItems?.map((item) =>
        dispatch(AddToCart({ uuid: item.product.uuid, qty: item.qty }))
      );
    } else {
      dispatch(AddToCart({ uuid: params.uuid, qty: qty }));
    }
  }, [dispatch, params, qty]);

  // useEffect(() => {
  //   if (params.uuid) {
  //     dispatch(AddToCart({ uuid: params.uuid, qty: qty }));
  //   }
  // }, [dispatch, params, qty]);

  // FIXME: i have problen i delete cart item after add an item
  const removeFromCartHandler = (productUUID) => {
    dispatch(RemoveFromCart(productUUID));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <h1>Sopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message type="info">
              Your cart is empty. <Link to="/">Go back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush" className="my-5">
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={4}>
                      <Link to={`/products/${item.product.uuid}`}>
                        {item.product.name}
                      </Link>
                    </Col>
                    <Col md={2}>Price: ${item.product.price}</Col>
                    <Col md={3}>
                      <Form.Select
                        size="sm"
                        className="mr-auto w-75"
                        value={item.qty}
                        onChange={(e) => {
                          // setQtyValue(e.target.value)
                          dispatch(
                            AddToCart({
                              uuid: item.product.uuid,
                              qty: +e.target.value,
                            })
                          );
                        }}
                      >
                        {[...Array(item.product.countInStock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Select>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product.uuid)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col><h4>Subtotal:</h4></Col>
                  <Col>
                    <h4><strong>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</strong> items.</h4>
                    
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><h4>Total Price:</h4></Col>
                  <Col>
                    <h4><strong>
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.qty * item.product.price,
                          0
                        )
                        .toFixed(2)}
                    </strong></h4>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <Button
                  disabled={cartItems.length === 0}
                  className="btn btn-dark btn-block"
                  onClick={() => checkoutHandler(cartItems)}
                >
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
