import { useState, useEffect } from "react";

import { Row, Col } from "react-bootstrap";

import axios from "axios";

import Product from "../components/Product";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    async function fetchProducts() {
      const { data } = await axios.get("/api/products/")
      setProducts(data);
    }

    fetchProducts();
    // axios.get("http://127.0.0.1:8000/api/products").then((response) => {
    //   setProducts(response.data);
    // });
  }, []);

  return (
    <div>
      <h1>Latest Products</h1>
      <Row className="my-3 gy-4 justify-content-center">
        {products.map((product) => (
          <Col
            key={product._id}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            className="d-flex justify-content-center"
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
