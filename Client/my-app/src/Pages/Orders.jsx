import React,{useState,useMemo,useEffect} from 'react'
import {Link} from "react-router-dom"
import "./Pages.css"
import {DeleteOutlined, MessageOutlined,CopyOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'  
import {jwtDecode} from "jwt-decode"
import {motion} from "framer-motion"
import io from "socket.io-client"
import OrderMessagePopup from './OrderMessagePopup'
const Orders = () => {

    const accesstoken=localStorage.getItem("accesstoken")
    const decode=jwtDecode(accesstoken)
  const socket = useMemo(() =>io("http://localhost:5000/orderList",{
    transports: ['websocket'],
  }),[])
  const messageSocket=  useMemo(() =>io("http://localhost:5000/message",{
      transports: ["websocket"]
  }),[])
  const navigate= useNavigate()
 const[orders,setOrders]=useState([])
  useEffect(()=>{
    socket.emit("joinRoom",{id:decode.id})
  },[socket])

  useEffect(()=>{
     socket.emit("clientOrders")
  },[])
  useEffect(()=>{
        messageSocket.on("connection",()=>{
            console.log("connected to the message namespace")
        })
        messageSocket.on("disconnect",(reason)=>{
            console.log(reason)
        })
        return()=>{
            messageSocket.off("connection")
        }
    },[messageSocket])

    const[hasFetched,setHasFetched]= useState(false)
 
  useEffect(()=>{
    socket.on('connect',()=>{
        console.log("Connected to server")
        
    });
    
   socket.on("joined",(data)=>{
       console.log(data)
   }) 
   socket.on("getAllOrders",async(data)=>{
    try{
    console.log(data)
    const newData= data.length
    if(!hasFetched)
    for(let i = 0;i < newData;i++){
      setOrders(prevData=>[...prevData,data[i]])
      await new Promise(resolve=> setTimeout(resolve,200))
    }
     setHasFetched(true)  

    }catch(error){
      console.error(error)
    }
   })
    socket.on('receivedOrder',(data)=>{
      
      setOrders(prev => [data,...prev])
      console.log("order data",data)
    })

    
    socket.on("orderDeleted",(data)=>{
      const rowElement = document.getElementById(`row-${data}`);
      if (rowElement) {
        rowElement.classList.add("fade-out");

         // Wait for the transition to complete before updating state
         setTimeout(() => {
      setOrders(prevOrders=>{
         const updatedOrders = prevOrders.filter(order => order._id !== data);
        
         // Return the updated array
         return updatedOrders;
     })
    }, 500); // Ensure it matches CSS transition duration
    }
    })
    socket.on("Deleted",(data)=>{
      console.log(data)
      const rowElement = document.getElementById(`row-${data}`);
      if (rowElement) {
        rowElement.classList.add("fade-out");
        
        // Wait for the transition to complete before updating state
        setTimeout(() => {
      setOrders(prevOrders=>{

        // remove the deleted order from the orders array
        const orderReturned= prevOrders.filter(order=> order._id !==data )

        return orderReturned
      })
      }, 500); // Ensure it matches CSS transition duration
    }
       
 })
    socket.on("SendShippment",(data)=>{
       console.log(data)
       setOrders(prevOrders=>{

        const orderReturned = prevOrders.map(order => 
          order._id === data.order_id 
              ? { ...order, Status: data.status }  // Update the matching object
              : order                          // Keep other objects unchanged
      );
      
      return orderReturned;
       })
    })
    socket.on('disconnect',(reasons)=>{
        console.log(reasons)
      })
     
    
    return()=>{
        socket.off('connect');
        socket.off("receivedOrder")
        socket.off("orderDeleted")
        socket.off("SendShippment")
        socket.off('disconnect');
        socket.off("getAllOrders")    
    }
},[navigate])

const[checked,setChecked]= useState([
  {id:""}
])




function deleteOrder(order_id,customer_id){  //function to delete an order
    socket.emit("deleteOrder",{order_id,customer_id})  
}
const [inputValue, setInputValue] = useState('');
    // Predefined options for the datalist
    const Options = [
        "#All",
        "#Delivered",
        "#In Transit",
        "#Pending"
    ];

    // Handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const [msgPop, setMsgPop]= useState(false)
   const [receipient,setReceipient]= useState("")
    function sendMessage(e,message){
      e.preventDefault()
       messageSocket.emit("sendMessage",{Sender_id:decode.id,receipient_id:receipient,message:message})
       console.log({Sender_id:decode.id,receipient_id:receipient,message:message})
    }
    function messagePop(receipient_id){
      setMsgPop(!msgPop)
      setReceipient(receipient_id)
    }
    function copy(id){
      navigator.clipboard.writeText(id)
    }

const style={color:" #57534e", fontSize: "0.875rem", lineHeight: "1.25rem",border:"2px solid  #e7e5e4",paddingBock:"10px"}
  return (
    <motion.div
    initial={{ opacity: 0, perspective: 1000, rotateY: -90 ,y:100}}
         animate={{ opacity: 1, perspective: 1000, rotateY: 0,y:0 }}
         exit={{ opacity: 0,y:-100}}
    className='w-full bg-stone-100 pt-24 lg:w-[80%] ml-auto'
    >
      
      <button className="ml-[5%] font-medium">#Orders</button>
     <section className=" ml-[5%] pt-4 flex gap-3">
       <form >
           <input 
              type="text"
               placeholder='Filter orders'
               autoComplete={false}
               className='h-10 border-2 border-stone-200'
               ></input>
       </form>
       <input
                id="activity"
                list="activities"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Filter by activity"
                style={{
                    width: '110px',
                    padding: '6px',
                    border: '2px solid #e7e5e4',
                    borderRadius: '5px',
                    fontSize: '16px',
                    color: '#333'
                }}
            />
            <datalist id="activities" className='bg-[#333]'>
                {Options.map((Option, index) => (
                    <option key={index} value={Option} />
                ))}
            </datalist>
     </section>
     <div className='rounded-xl border-[1px] overflow-x-auto mx-auto bg-white w-[90%] shadow-md rounded-lg p-6'>
     <table className="w-[95%] bg-white mt-3  overflow-hidden rounded-2xl">
        <thead>  {/*Table head */}
            <tr className='bg-gray-100 '>
                <th className="border border-gray-300 px-4 py-2 text-left"><input type="checkbox" ></input></th>
                <th className="border border-gray-300 px-4 py-2 text-left">#Order ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">#Client</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Arrival time</th>
            </tr>
        </thead>
        <tbody className="transition-all">
            {orders.map((order,index)=>(
              <tr key={order._id} id={`row-${order._id}`} className='border-b-[1px] border-stone-200 h-[35px]  relative'>
                <td className="border border-gray-300 px-4 py-2">
                  <input 
                   type="checkbox"
                   value={checked}
                   onCheck={()=>{setChecked(order._id)}}
                   className='my-auto'
                   ></input>
                  </td>
                <td className="border border-gray-300 px-4 py-2" style={{cursor:"pointer",scrollbarWidth:"none",overflowX:"auto",maxWidth:"80px",fontSize: '15px', color:"#57534e"}}>
                <Link to={`/Orders/View_Order/${order.customer_id}`}>{order._id}</Link> {/* Adding the customer id into the URL*/}<span onClick={()=>copy(order._id)}  className='absolute bg-white left-[20%] z-1 top-1'><CopyOutlined /></span>
                </td>
                <td className="border border-gray-300 px-4 py-2">{order.customerName} <span onClick={()=>{messagePop(order.customer_id)}}><MessageOutlined /></span></td>
                <td className="border border-gray-300 px-4 py-2"></td>
                <td onClick={() => deleteOrder(order._id,order.customer_id)}><span className='absolute right-2 top-2'><DeleteOutlined /></span> </td>
                
                <td className="border border-gray-300 px-4 py-2">
                  {order.Status}  
                </td> 
                <td className="border border-gray-300 px-4 py-2">
                <OrderMessagePopup msgPop={msgPop} sendMessage={sendMessage}/>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
     
    </div>
    </motion.div>
  )
}

export default Orders