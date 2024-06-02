"use client";
import { useState } from "react";
import HomePage from "../page";
import Navbar from "../components/Navbar";

const ContactPage = () => {
  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center mt-[60px]">
        <h1 className="font-extrabold text-7xl text-white">Contact</h1>
      </div>
    </main>
  );
};

export default ContactPage;
