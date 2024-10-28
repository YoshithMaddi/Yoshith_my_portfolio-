'use client';
import Heading from "./sub/Heading";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [result, setResult] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "724cf3ce-a2b2-4c5c-8739-fa5b73f99f14");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      setNotification({ message: "Form submitted successfully!", type: "success" });
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
      setNotification({ message: "Submission failed. Please try again.", type: "error" });
    }
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  
  return (
    <div id="contact" className="h-screen lg:h-auto lg:py-40 py-20 xs:pb-20">
      <Heading text={'Get in touch'} />
      <div className="w-full h-full my-auto flex lg:flex-col items-center justify-between lg:justify-center gap-x-20 lg:gap-x-0">
        <motion.div initial={{ opacity: 0, y: 150 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
          <Image 
            src={'/contact.gif'} 
            alt="Contact Image"             
            width={400} height={400} 
            className="w-[400px] rounded-md opacity-80"
          />
        </motion.div>
        <motion.form onSubmit={onSubmit} initial={{opacity:0,x:150}} whileInView={{opacity:1,x:0}} transition={{duration: .4}} viewport={{once:true}} className="w-[600px] lg:w-[400px] sm:w-full flex flex-col gap-3">
          <div className="w-full flex lg:flex-col gap-x-3 lg:gap-y-3">
            <input 
              type="text" 
              name="name" // Added name attribute
              className="w-full border border-yellow-500 rounded-md bg-zinc-100 px-4 py-2 text-sm tracking-wider text-gray-500 outline-none" 
              placeholder="Your Name" 
            />
            <input 
              type="email" 
              name="email" // Added name attribute
              className="w-full border border-yellow-500 rounded-md bg-zinc-100 px-4 py-2 text-sm tracking-wider text-gray-500 outline-none" 
              placeholder="Your Email" 
            />
          </div>
          <input 
            type="text" 
            name="subject" // Added name attribute
            className="w-full border border-yellow-500 rounded-md bg-zinc-100 px-4 py-2 text-sm tracking-wider text-gray-500 outline-none" 
            placeholder="Subject" 
          />
          <textarea 
            name="message" // Added name attribute
            className="max-h-[250px] min-h-[150px] w-full border border-yellow-500 rounded-md bg-zinc-100 px-4 py-2 text-sm tracking-wider text-gray-500 outline-none" 
            placeholder="Write me" 
          ></textarea>
          <input 
            type="submit" 
            className="w-full border border-yellow-500 rounded-md bg-yellow-600 px-4 py-2 text-sm tracking-wider text-gray-500 outline-none hover:bg-yellow-500 transition-colors cursor-pointer" 
            value="Send Message" 
          />
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
