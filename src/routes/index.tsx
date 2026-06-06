import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Academy from "../pages/Academy";
import Appointments from "../pages/Appointments";
import Shop from "../pages/Shop";
import ResourceHub from "../pages/ResourceHub";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/academy" element={<Academy />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/resources" element={<ResourceHub />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
