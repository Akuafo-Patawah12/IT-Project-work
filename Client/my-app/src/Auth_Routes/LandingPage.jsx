import React,{useState,useRef,useEffect,useMemo} from 'react'
import {motion,transform,useAnimation} from "framer-motion"
import{ ReactComponent as Truck } from "../icons/Truck.svg"
import{ ReactComponent as Anchor } from "../icons/Anchor.svg"
import{ ReactComponent as Container } from "../icons/Container.svg"

import{ ReactComponent as CargoShip } from "../icons/CargoShip.svg"
import{ ReactComponent as CargoPlane } from "../icons/CargoPlane.svg"
import{ ReactComponent as RMBrate } from "../icons/RMBrate.svg"
import{ ReactComponent as Star } from "../icons/Star.svg"
import "./LandingPage.css"
import "../Components/AnimatedBubbles.css"
import io from "socket.io-client"

import {Link} from "react-router-dom"
import {LazyLoadImage} from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css'; 

import {  PlayCircleFilled} from '@ant-design/icons'

import EndUsersIcon from '../icons/EndUsersIcon'

import ServicesComponent from '../Components/ServicesComponent'
const LandingPage = ({setIsVideo}) => {
  const socket= useMemo(() => io("http://localhost:4040",{
    transports: ["websocket","polling"],
    withCredentials: true,
    secure: true
  }),[])

  
useEffect(()=>{
  socket.emit("greet", "hello world")
  console.log(socket)
},[socket])


  useEffect(()=>{
    socket.on("connection",()=>{
      console.log("connected to the default namespace")
    })


    
    socket.on("disconnect",(reasons)=>{
        console.log(reasons)
    })
    
   
    return()=>{
       socket.off("connection")
       socket.off("disconnect")
    }
 },[socket])
  



  const parentRef = useRef(null);

  const childRef1 = useRef(null);
  const childRef2 = useRef(null);
  const childRef3 = useRef(null);
  const childRef4 = useRef(null);
  

  const [index,setIndex]= useState(0)

 



  useEffect(()=>{
    
    const auto_slider=setInterval(()=>{
      setIndex(prev => prev + 1)
    },5000)

    const parent= parentRef.current
    const child= [
      childRef1.current,
      childRef2.current,
      childRef3.current,
      childRef4.current,
      ""
    ]
     
    
    index >= child.length-1 ? setIndex(0): setIndex(index);
    
    const childLeft = child[index].offsetLeft;
    parent.scrollTo({
      left: childLeft,
      behavior: "smooth" // Add smooth scrolling
    });

    return()=>{
       clearInterval(auto_slider)
    }
  },[index])

  function setindex(char){
    
  
    if(char==="+"){
        setIndex(prev=> prev + 1)
    }else{
      setIndex(prev=> prev - 1);
    }
    
  }


  
  






 


const [divWidth, setDivWidth] = useState(0);

useEffect(() => {
  const handleResize = () => {
    if (parentRef.current) { 
      setDivWidth(parentRef.current.offsetWidth);
    }
  };

  window.addEventListener('resize', handleResize);

  // Initial measurement
  handleResize();

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [divWidth]);






const image= ["Air.jpg","Sea.jpg","Slider2.jpg","Slider3.jpg"] 
  const [fadeIn, setFadeIn] = useState(false);
const[index1,setIndex1]= useState(0)
useEffect(()=>{
  
  const timer= setInterval(()=>{
     setIndex1(prev => prev + 1)
     setFadeIn(false)
  },4000)
    
    if(index >= image.length - 2){
      setIndex1(0)
    }
  return()=>{
    clearInterval(timer)
  }
},[index1])


const [value, setValue] = useState(0);  // State to hold the value
  const controls = useAnimation();  // Controls for the animation
  const divRef = useRef(null);  // Ref for the div

  let timer;
  function name() {
    if (timer) return; // Prevent multiple intervals from being set
    timer = setInterval(() => {
      setValue((prev) => {
        if (prev >= 6000) {
          clearInterval(timer);  // Clear interval when value reaches 200
          return prev;
        }
        return prev + 20;
      });
    },500);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          // Call the function when 50% of the div is in the viewport
          name();
          controls.start({ opacity: 1 });
        }
      },
      { threshold: [0.5] } // 50% threshold for intersection
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, [controls,value]);

  const pageVariants = {
    initial: { opacity: 0, x: "-100vw" },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: "100vw", transition: { duration: 0.5 } },
  };


  const testimonials = [
    {
      name: 'Linda Asare',
      role: 'Operations Manager at DEF Enterprises',
      text: 'The real-time tracking feature is invaluable. It gives us the peace of mind of knowing exactly where our goods are at all times.',
      image: 'https://via.placeholder.com/100',
    },
    {
      name: 'Kwame Mensah',
      role: 'CEO of ABC Trading',
      text: 'SF Ghana Logistics has become an indispensable part of our supply chain. Their dedication to efficiency and reliability is unparalleled.',
      image: 'https://via.placeholder.com/100',
    },
    {
      name: 'Michael Osei',
      role: 'Owner of GHI Retailers',
      text: 'Exceptional service and timely deliveries! SFGL truly lives up to its motto, "Whatever the load, we carry it."',
      image: 'https://via.placeholder.com/100',
    },
  ];

  return (
    
    <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
     style={{overflow:"hidden",background:"#fff"}} className='Home '>
        
        <div
        style={{
          width: "100%",
          position:"relative",
          borderBottom:"4px solid var(--purple)"
        }}
        >
        <div className='Image_Text '>
          
          
          <section style={{display:"flex",gap:"1rem"}}>
            <Link to={"/Orders"}><button className='btn'>Get A Quote</button></Link>
            <button onClick={()=> setIsVideo(true)} style={{border: "var(--green)",background:"transparent",isolation:"isolate" ,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{color:"#5cbbf1",fontSize:"x-large"}}><PlayCircleFilled /> </span><span className="btn1" style={{color:"white",background:"#A7C756",padding:"10px",borderRadius:"5px",marginLeft:"20px",fontSize:"18px"}}>How It Works?</span></button>
          </section>
          </div>
      <div
        ref={parentRef}
        className="slide-show"
        style={{
          width: "100%",
          height: "450px",
          
        }}
      >
        
       
        <div ref={childRef1} style={{position:"relative"}}>
          <div className="cover">
            
          <motion.div
       
        initial={{ opacity: 0, x: -100 }} // Start off-screen to the left (-200px)
              whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
              exit={{ opacity: 0, x: -100 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} // Adjust the duration and easing
              viewport={{ once: true, amount: 0.2 }}
            >
            
            <p style={{color:"white",fontSize:"30px",fontWeight:"500"}} className='slideheader'>Reliable Shipping Services Between China and Ghana. </p>
   
            </motion.div>
          </div>
          <LazyLoadImage
          
          
      
       src='../images/slider1.jpg' width={divWidth} effect='blur' style={{objectFit: "cover", height: '450px' }}  />
       </div>

       <div ref={childRef2} style={{position:"relative"}}>
        <div className="cover">
        <motion.div
       
       initial={{ opacity: 0, x:-100 }} // Start off-screen to the left (-200px)
             whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
             exit={{ opacity: 0, x: -100 }} 
             transition={{ duration: 0.8, ease: "easeOut" }} // Adjust the duration and easing
             viewport={{ once: true, amount: 0.2 }}
           >
            
          <p style={{color:"white",fontSize:"30px",fontWeight:"500"}} className='slideheader'>Track your shipment in real-time! With SF Ghana Logistics, know exactly where your cargo is at every moment.</p>
       </motion.div>
        </div>
       <LazyLoadImage src='../images/Slide_Plane.jpg' width={divWidth} effect='blur' style={{ objectFit: "cover", height: '450px'}}  />
       </div>
         
         <div ref={childRef3} style={{position:"relative"}} >
          <div className="cover">
          <motion.div
       
       initial={{ opacity: 0, x: -100 }} // Start off-screen to the left (-200px)
             whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
             exit={{ opacity: 0, x: -100 }} 
             transition={{ duration: 0.8, ease: "easeOut" }} // Adjust the duration and easing
             viewport={{ once: true, amount: 0.2 }}
           >
           
           <p style={{color:"white",fontSize:"30px",fontWeight:"500"}} className='slideheader'>Reliable logistics, no matter the load.</p>
           </motion.div>
          </div>
          <LazyLoadImage src='../images/Seaport.jpg' width={divWidth} effect='blur' style={{objectFit: "cover", height: '450px' }}  />
          </div>

          <div ref={childRef4} style={{position:"relative"}} >
          <div className="cover">
          <motion.div
       
       initial={{ opacity: 0, x: -100 }} // Start off-screen to the left (-200px)
             whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
             exit={{ opacity: 0, x: -100 }} 
             transition={{ duration: 0.8, ease: "easeOut" }} // Adjust the duration and easing
             viewport={{ once: true, amount: 0.2 }}
            >

             <p style={{color:"white",fontSize:"30px",fontWeight:"500"}} className='slideheader'>Experience top-notch logistics with SF Ghana Logistics.</p>
             
          </motion.div>
        </div>
            <LazyLoadImage src='../images/Ware.jpg' width={divWidth} effect='blur' style={{objectFit: "cover", height: '450px' }} /> 
          </div>
          
        
      </div>
      </div>

      <p className='Description' style={{position:"relative",isolation:"isolate"}}>We're fast, efficient, cost-effective, and reliable in all areas of shipping, freight forwarding, free procurement and sourcing training, container clearance, and groupage services.  
         <Truck style={{position:"absolute",zIndex:"-1",bottom:"0",left:"-20px"}}/> <Anchor style={{position:"absolute",top:"-35px",left:"48%",zIndex:"-1",rotate:"45deg"}}/> <Container style={{zIndex:"-1",position:"absolute",right:"10px",rotate:"45deg"}}/>
      </p>
      
      <section className='welcome_hero' >

            
   
      <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }} 
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.5 }} // Trigger when 50% in view
          className='welcome_container' >
            <section style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"10px"}}>
                <div className="flexbox_1" style={{height:"80px",width:"95%",marginInline:"auto",borderRadius:"5px"}}><div> <p style={{color:"white"}}>Join us for <br/> seamless logistics.</p><Link to={"/SignUp"}><button>Sign up</button></Link></div> </div>
                <div  className="flexbox_1"style={{height:"80px",width:"95%",marginInline:"auto",borderRadius:"5px"}}><div> <p className="p-info" style={{color:"white"}}>Track your shipment. <br/> in realtime </p><Link to={"/Track_order"}><button>Track</button></Link></div> </div>
            </section>
           <h3 style={{marginLeft:"2.5%"}}>Welcome to SF Ghana Logistics.</h3>
          <p style={{textAlign:"justify",marginInline:"auto",width:"95%"}}>
            Your trusted partner in providing seamless and reliable shipping solutions between Ghana and 
            China. Whether you require air cargo services, groupage shipping, or door-to-door delivery. Discover our comprehensive range of services designed to meet your logistics needs 
            and experience the SFGL difference. 
          </p>
          <Link to={"/Auth"} className='welcome_button'><button className='welcome_butt'><span>GET STARTED</span>
          <div className='liquid'></div></button></Link>
         </motion.div>


         <div className='welcome_image'>
             <div></div>
         </div>

      </section>


      <div style={{marginInline:"auto",width:"290px",}}>
      <h3 style={{color:"#1C1818",marginLeft:"0",display:"flex",gap:"10px",width:"fit-content",textAlign:"center",marginTop:"20px",fontSize:"25px"}}>OUR MAJOR
          <div className="content">
              <h3>SERVICES.</h3>
              <h3>SERVICES.</h3>
          </div>
      </h3>
      </div>
      
      <div style={{width:"100px",height:"2px",background:"#1C1818",marginInline:"auto",marginTop:"4px"}}></div>

      <p className="Service-title">Fast and Affordable Services.</p>
       <p style={{marginInline:"auto",width:"90%",marginBlock:"10px 30px",textAlign:"center",fontWeight:"600"}}>We offer a complete range of logistical solutions to suit importers and shippers worldwide.</p>
             <ServicesComponent />

       

       <Link to={"/Services"} style={{display:"flex",textDecoration:"none",alignItems:"center",justifyContent: "flex-start",height:"60px" ,background:"#a0c444",paddingBlock:"2px 20px"}}><button  style={{marginInline:"auto",background:"transparent",transition:"all 0.3s",border:"2px solid #222",borderRadius:"5px",fontSize:"16px" ,padding:"10px",fontWeight:"500"}}>SEE ALL OUR SERVICES</button></Link>
      

       
      <div className="image-container">
        <div className="scrolling-content">
        
          <h2 className="animator"></h2>
          <h2 className="assist">assistance?</h2>
          <p>
            We’re here to provide you with the support and information you 
            need to make your logistics experience seamless and efficient.

          </p>
          

          <Link to={"/Contact_us"}><button className="scroll-content-btn">Contact Us</button></Link>
        </div>
        </div>
    
        <h3 style={{color:"#1C1818",marginInline:"auto",width:"fit-content",marginTop:"30px"}} className='testimonial_head'>Clients Testimonals</h3>

        <div className="testimonial-container">
        <div className='bubbles'>
        <div className="bubbles-container">
      {Array.from({ length: 20 }).map((_, index) => (
        
         <Star  className="bubble" key={index}/>
      ))}
    </div>
    </div>
      {testimonials.map((testimonial, index) => (
        <div className="testimonial" key={index}>
          <img className="testimonial-image" src={testimonial.image} alt={testimonial.name} />
          <div className="testimonial-content">
            <p className="testimonial-text">"{testimonial.text}"</p>
            <p className="testimonial-name">{testimonial.name}</p>
            <p className="testimonial-role">{testimonial.role}</p>
          </div>
        </div>
      ))}
    </div>

        
       
       
       <p id="why_choose_us" style={{marginInline:"auto" ,width:"fit-content",marginBlock:"20px",fontSize:"30px" ,fontWeight:"500"}}>WHY CHOOSE US?</p>
       <p style={{width:"90%",background:"#eee",color:"#444",fontSize:"15px",fontWeight:"500",padding:"20px 10px", textAlign:"justify",marginInline:"auto"}}>
          At SF Ghana Logistics (SFGL), we are committed to delivering exceptional logistics 
          solutions tailored to your specific needs. Here's why we stand out in the industry:
       </p>
       <div style={{display:"flex",alignItems:"center",justifyContent: "flex-start",height:"60px" ,background:"#A7C756"}}></div>

       <div className='why'>
       <motion.div
        ref={divRef}
        animate={controls}
        initial={{ opacity: 0, x: -100 }} // Start off-screen to the left (-200px)
              whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
              exit={{ opacity: 0, x: -100 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} // Adjust the duration and easing
              viewport={{ once: true, amount: 0.2 }}

       >

       <div className='scattered'>
        <section>
        
            <p style={{marginInline:"auto",width:"fit-content"}}> </p>
              <h4 style={{marginInline:"auto",width:"fit-content"}}>Competitive Pricing</h4>
              
          
        </section>
        <section>
        
            <div style={{marginInline:"auto",width:"max-content"}}></div>
           <h4 style={{marginInline:"auto",width:"fit-content"}}>Expert Handling</h4>
              
           
        </section>
        <section>
        
            <div style={{marginInline:"auto",width:"fit-content"}}></div>
           <h4 style={{marginInline:"auto",width:"fit-content"}}>Timely Delivery</h4>
              
        </section>
        <div className="bar"></div>


        </div>

        <div className='rate'>
           <div style={{borderRight:"2px solid #222"}}><CargoShip style={{transform:"translateX(3px)"}}/> <br/><span style={{fontSize:"14px"}}>SEA FREIGHT</span><br/><span style={{fontSize:"14px",fontWeight:"500"}}> $220 PER CBM</span></div>
           <div style={{borderRight:"2px solid #222"}}><CargoPlane style={{transform:"translateX(3px)"}}/><br/><span style={{fontSize:"14px"}}>AIR FREIGHT</span> <br/><span style={{fontSize:"14px",fontWeight:"500"}}>$18 PER KILO</span></div>
           <div><RMBrate style={{transform:"translateX(1px)"}}/><br/><span style={{fontSize:"14px"}}>RMB RATE</span><br/><span style={{fontSize:"14px",fontWeight:"500"}}>0.425</span></div>
        </div>

      </motion.div>


      
      <div className='Why_choose_slider'>
      <div style={{ marginTop:"50px",border:"3px solid #a0c444",paddingBottom: "5px",width:"100%"}} >
       <div className='fade-image'>
          <img src={`./images/${image[index1]}`} alt="image"  className={fadeIn ? "":"fade_in"}/>
       </div>
       


       <motion.div
        ref={divRef}
        animate={controls}
        initial={{ opacity: 0, x: 100 }} // Start off-screen to the left (-200px)
              whileInView={{ opacity: 1, x: 0 }} // Animate to the original position (x: 0)
              exit={{ opacity: 0, x: 100 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} // Adjust the duration and easing
              viewport={{ once: true, amount: 0.5 }}

        style={{textAlign:"center",paddingBlock:"20px",width:"98%",marginInline:"auto", backgroundColor: '#a0c444', fontSize:"22px",fontWeight:"bold"}}
      >
       <EndUsersIcon /> <p><span style={{fontSize:"30px"}}>{value}+ </span> <br/> Satisfied customers</p>
      </motion.div>
        </div>
      </div>
      </div>
       <div style={{display:"flex",alignItems:"center",justifyContent: "flex-start",height:"60px" ,background:"#a0c444"}}></div>
      

        
    </motion.div>
  )
}

export default LandingPage