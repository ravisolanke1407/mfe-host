import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Home = lazy(() => import("./routes/Home"));
const Users = lazy(() => import("./routes/Users"));
const Orders = lazy(() => import("./routes/Orders"));

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 16, display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/orders">Orders</Link>
      </nav>

      <Suspense fallback={<div style={{ padding: 20 }}>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
