import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homescrren/Homescreen";
import Header from "./components/header/Header";
import "./_app.scss";

import LoginScreen from "./screens/loginScreen/LoginScreen";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SubscriptionsScreen from "./screens/subscriptionsScreen/SubscriptionsScreen"
import { useSelector } from "react-redux";
import WatchScreen from "./screens/watchScreen/WatchSreen";
import SearchScreen from "./screens/SearchScreen";

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container ">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app_main ">
          {children}
        </Container>
      </div>
    </>
  );
};

const App = () => {
  const navigate = useNavigate();
  const { accessToken, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/auth");
    }
  }, [accessToken, loading]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomeScreen />
          </Layout>
        }
      />
      <Route path="/auth" element={<LoginScreen />} />
      <Route
        path="/search/:query"
        element={
          <Layout>
            <SearchScreen />
          </Layout>
        }
      />
      <Route
        path="/watch/:id"
        element={
          <Layout>
            <WatchScreen />
          </Layout>
        }
      />
      <Route
        path="/feed/subscriptions"
        element={
          <Layout>
            <SubscriptionsScreen />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
