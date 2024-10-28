'use client'
import { heroIconss } from '@/assets'
import { useMotionTemplate, useMotionValue, motion, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const Hero = () => {
    const [windowoffset, setwindowoffset] = useState({ innerWidth: 0, innerHeight: 0 });
    const [mousemove, setmousemove] = useState(false);
    const [buttonhover, setbuttonhover] = useState(false); // Correct state declaration
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handlemousemove = (e) => {
        const { clientX, clientY } = e;
        x.set(clientX);
        y.set(clientY);
    };

    const handlemouseenter = () => {
        setwindowoffset({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
        setmousemove(true);
    };

    const { innerWidth, innerHeight } = windowoffset;
    const xSpring = useSpring(x, { stiffness: 80, damping: 10 }); // Corrected 'stiffness'
    const ySpring = useSpring(y, { stiffness: 50, damping: 10 });

    const rotatex = useTransform(xSpring, [0, innerWidth], [-30, 30]);
    const rotatey = useTransform(ySpring, [0, innerHeight], [10, -50]);

    useEffect(() => {
        setwindowoffset({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
    }, []);

    return (
        <div id='home' className="h-screen grid place-items-center" onMouseMove={handlemousemove} onMouseEnter={handlemouseenter}>
            <div>
                <motion.div  initial={{opacity:0,y:-100}} animate={{opacity:1,y:0}} transition={{delay:0.5}} className="flex flex-col items-center justify-center gap-y-3 font-light capitalize">
                    <motion.div className="flex items-center justify-center"
                        style={{ rotateX: mousemove ? rotatex : 0, rotateY: mousemove ? rotatey : 0, transition: '0.1s' }}>
                        <Image src={'/person.png'} alt='Person Image' width={400} height={400} priority={true} className="h-auto w-[150px]" />
                        <motion.span className='absolute text-3xl font-semibold text-white'
                            initial={{ scale: 0 }} 
                            animate={{ opacity: buttonhover ? 0 : 1, scale: buttonhover ? 2 : 0, y: buttonhover ? -40 : 0 }}
                            transition={{ opacity: { delay: 0.4 }, scale: { duration: 0.2 } }}  // Corrected transition format
                        >
                            Hi
                        </motion.span>
                    </motion.div>
                    <h1 className='text-center text-3xl font-bold tracking-wider text-gray-500 dark:text-white transtion-colors'>My name is Yoshith Maddi &</h1>
                    <p className='text-lg tracking-wider text-gray-700 sm:text-2xl dark:text-gray-200 transtion-colors'>I like programming 😀</p>
                </motion.div>
                <motion.div initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className='mt-8 flex justify-center gap-x-10 text-3xl text-yellow-600c sm:text-2xl'>
                    {heroIconss.map((item, i) => (
                        <a href={item.link} key={i} className='rounded-lg hover:bg-red-400 hover:text-white transition-colors'>{item.icon}</a>
                    ))}
                </motion.div>
                <motion.a initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:0.7}} href="#" className='mx-auto mt-7 block w-max rounded-lg bg-red-400 px-3 py-1 font-light capitalize tracking-wider text-white hover:bg-red-500 transition-colors'
                   onMouseEnter={() => setbuttonhover(true)} 
                   onMouseLeave={() => setbuttonhover(false)}
                >
                    Talk to me
                </motion.a>
            </div>
        </div>
    );
}

export default Hero;
