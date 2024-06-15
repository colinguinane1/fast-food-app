"use client";
import { useState } from "react";
import HomePage from "../page";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CareersPage = () => {
  return (
    <main>
      <Navbar cartValue={0} />
      <div className="flex flex-col h-screen items-center mt-[70px]">
        <h2 className="text-white py-10">Current Available Positions:</h2>
        <div className="flex flex-col gap-10">
          <div className="bg-white p-4 rounded-lg shadow-2xl">
            <div className="flex gap-16 items-center justify-between">
              <h1 className="text-xl font-extrabold">Store Manager</h1>
              <h1 className="text-green-500 bg-green-200 px-2 py-1 rounded-lg">
                Currently Hiring
              </h1>
            </div>

            <h2 className="text-gray-400">117-170th ST, Edmonton, AB</h2>
            <p className="text-sm max-w-80">
              As Store Manager you will take on various duties such as: Hiring,
              Managing Schedule, Scheduling Deliveries{" "}
            </p>
            <div className="flex justify-between">
              <div></div>
              <button className="text-white bg-green-500 p-1 rounded-lg px-2">
                Apply Now
              </button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-2xl">
            <div className="flex gap-16 items-center justify-between">
              <h1 className="text-xl font-extrabold">Shift Leader</h1>
              <h1 className="text-green-500 bg-green-200 px-2 py-1 rounded-lg">
                Currently Hiring
              </h1>
            </div>

            <h2 className="text-gray-400">117-170th ST, Edmonton, AB</h2>
            <p className="text-sm max-w-80">
              As Shift Leader you will lead the kitchen and lobby teams and
              ensure the cleanliness of the building.{" "}
            </p>
            <div className="flex justify-between">
              <div></div>
              <button className="text-white bg-green-500 p-1 rounded-lg px-2">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CareersPage;
