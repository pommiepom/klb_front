import React from "react";
import "./page.css";
import Navigation from "../components/Navigation.jsx";
import Router from "../routes/Router.jsx";

const Page = () => (
   <div className="page">
      <Navigation />
      <Router />
   </div>
);

export default Page;