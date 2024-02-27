import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "./redux/loading/loadingSlice";
import { setUser } from "./redux/user/userSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);
  // const isLoading = useSelector((state) => state.loading.isLoading);
  // return (
  //   <div>
  //     <h1>{user}</h1>
  //     <input
  //       type="text"
  //       onChange={(e) => {
  //         dispatch(setUser(e.target.value));
  //         dispatch(setLoading());
  //       }}
  //     />
  //     {isLoading && <h2>Loading...</h2>}
  //   </div>
  // );
  if (window.location.pathname === "/") window.location.pathname = "/login";
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route Component={ProtectedRoute}>
          <Route path="/dashboard" Component={DashboardPage} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
