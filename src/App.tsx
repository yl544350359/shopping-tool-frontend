import * as React from 'react';
// import logo from './logo.svg';
// import './App.css';
import TopNavigator from './component/TopNavi';
import { Routes, Route } from "react-router-dom";
import * as page from "./page";
function App() {
  return (
    <>
      <TopNavigator />
      <Routes>
        <Route path="/" element={<page.Calculator />} />
        <Route path="/Calculator" element={<page.Calculator />} />
        <Route path="/ShippingPrice" element={<page.ShippingPrice />} />
        <Route path="/MyHome" element={<page.MyHome />} />
        <Route path="*" element={<page.NotFound />} />
    </Routes>
    </>
  );
}

export default App;
