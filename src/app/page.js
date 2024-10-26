'use client'
import About from "@/components/About";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero"
import Achievements from "@/components/sub/Achievements";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import  Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import Toggle from "@/components/sub/Toggle";
import Loader from "@/components/sub/Loader";
export default function Home() {
  const [id,setId] =useState(0)
  const compsRef =useRef(null) 
  useEffect(()=>{
    const observer =new IntersectionObserver(
      (enteries)=>(
        enteries.forEach((entry)=>{
          const intersecting =entry.isIntersecting
          if(intersecting){
            setId(entry.target.id)
          }
        })
      ),{threshold:0.38},
    )
    const compsArr =Array.from(compsRef.current.children)
    compsArr.forEach((comp)=>{
      observer.observe(comp)
    })
  },[])
  return (
    <>
    <Loader/>
      <Toggle>
          <Navbar id={id}/>
            {/* <div className="w-min" ref={compsRef} > */}
            <div  ref={compsRef} >
              <Hero/>
              <About/>
              <Achievements></Achievements>
              <Experience></Experience>
              <Skills/>
              <Projects/>
              <Contact/>
              
            </div>
      </Toggle>
    </>

  );
}
