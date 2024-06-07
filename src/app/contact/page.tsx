"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { motion, spring } from "framer-motion";
const Page = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true when form is being submitted
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "1e2e32a1-7b64-4030-a532-7d2515ebe939",
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        message: e.target.message.value,
      }),
    });
    const result = await response.json();
    if (result.success) {
      setIsSubmitted(true);
    }
    setIsSubmitting(false); // Reset submitting state after form submission
  }

  return (
    <>
      <Navbar />
      <motion.div className="no_transition z-[0]">
        <div className="flex items-center h-fit dark:bg-transparent">
          <div className="container mx-auto my-auto mt-32">
            <div className="mx-auto pb-[40%] rounded-md shadow-sm">
              <div className="text-center ">
                <h1 className="my-3 text-3xl font-semibold text-white ">
                  Contact
                </h1>
              </div>
              <div className="m-7">
                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    name="access_key"
                    value="1e2e32a1-7b64-4030-a532-7d2515ebe939"
                  />
                  <input
                    type="hidden"
                    name="subject"
                    value="New Submission from Web3Forms"
                  />
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="block mb-2 font-medium text-sm text-white"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Subject "
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-green-300 focus:border-indigo-500   dark:placeholder-gray-500  "
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 font-medium text-sm text-white"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="you@company.com"
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-green-300 focus:border-indigo-500  dark:placeholder-gray-500  "
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="phone"
                      id="phone"
                      className="text-sm mb-2 font-medium text-white"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="+1 (555) 1234-567"
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-green-300 focus:border-indigo-500  dark:placeholder-gray-500  "
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 font-medium text-sm text-white"
                    >
                      Your Message *
                    </label>

                    <textarea
                      name="message"
                      id="message"
                      placeholder="Your Message"
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-green-300 focus:border-indigo-500   dark:placeholder-gray-500  "
                      required
                    ></textarea>
                  </div>
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="flex items-center justify-center text-center bg-white p-2 rounded-lg shadow-2xl border w-full"
                    >
                      Send Message{" "}
                      {isSubmitting &&
                        !isSubmitted && ( // Conditionally render loading SVG if submitting and not yet submitted
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="animate-spin h-5 w-5 stroke-white ml-2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="#2c3e50"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 12h1m1.28-5.903l.719.718m3.841.765l.836-.836M12 3v1m5.903 1.28l-.718.719m-.765 3.841l.836.836M21 12h-1m-1.28 5.903l-.719-.718m-3.841-.765l-.836.836M12 21v-1m-5.903-1.28l.718-.719m.765-3.841l-.836-.836"
                            ></path>
                          </svg>
                        )}
                      {isSubmitted && ( // Conditionally render check SVG if form is successfully submitted
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-circle-check stroke-green-500 -mt-[1px] ml-2"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 12l5 5l10 -10" />
                        </svg>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Page;
