import { useEffect } from "react";

import { Row, Col } from "react-bootstrap";

// import axios from "axios";

import Product from "../components/Product";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/productSlice";

import Message from "../components/Message";
import Loader from "../components/Loader";

export default function HomeScreen() {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   async function fetchProducts() {
  //     const { data } = await axios.get("/api/products/")
  //     setProducts(data);
  //   }
  //   fetchProducts();
  // }, []);

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div >
      { products && <h1 className="main_title">Latest Products</h1>}
      
      <Row className="my-3 gy-4 justify-content-center">
        {loading ? (
          <Col>
            < Loader />
          </Col>
        ) : error ? (
          <Col>
            <Message type="danger" >{ error }</ Message>
          </Col>
        ) : products.length > 0 ? (
          products.map((product) => (
            <Col
              key={product.uuid}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className="d-flex justify-content-center"
            >
              <Product product={product} />
            </Col>
          ))
        ) : (
          <p>No products yet...</p>
        )}
      </Row>
    </div>
  );
}
