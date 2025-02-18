import { Link } from 'react-router-dom'
import Video from '../assets/loginVideo.mp4'
export default function LoginPage() {
  

  return (
  
    <div className="text-white lg:flex lg:justify-evenly relative w-screen h-screen">
       <video 
    autoPlay 
    loop 
    muted 
    playsInline
    style={{ 
      position: "absolute", 
      top: 0, 
      left: 0, 
      width: "100%", 
      height: "100%", 
      objectFit: "cover",
      zIndex: -1 
    }}
  >
    <source src={Video} type="video/mp4" />
   
  </video>
        {/* <img className='hidden lg:block' src={Tone} alt="tone" /> */}
         <div className="flex flex-col items-center  justify-center  py-[40vh]  ">
        <span className="lg:flex  gap-1 text-4xl  mb-2">Weolcome to <p className="text-yellow-400 font-bold "> Lazy thoughts</p></span>
        <Link to={'/signin'} className='mt-1 ml-28'>
        <button className=" lg:text-center   bg-yellow-400 w-24 sm:w-32 md:w-48 lg:w-50 lg:ml-24 py-2 rounded-full text-black font-semibold hover:bg-yellow-500">Login</button>
        </Link>
        </div>
    </div>
   
  )
}
