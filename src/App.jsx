import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import AdminPanel from "./pages/admin/AdminPanel";
import ManagePosts from "./pages/admin/ManagePosts";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageComments from "./pages/admin/ManageComments";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/create-post" element={
              <ProtectedRoute><CreatePost /></ProtectedRoute>
            } />

            <Route path="/admin" element={
              <ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/posts" replace />} />
              <Route path="posts" element={<ManagePosts />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="comments" element={<ManageComments />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
