
import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";


import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <Router >
        <Header />
        <main className="py-3">
          <Container>
            <Routes>

              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/products/:uuid" element={<ProductScreen />} />
              <Route path="/cart/:uuid?" element={<CartScreen />} />
              
            </Routes>
          </Container>
        </main>
        <Footer />
    </Router>
  );
}

export default App;
