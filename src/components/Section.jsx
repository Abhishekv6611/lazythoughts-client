import { useEffect, useState } from "react";
import PostBox from "./PostBox";
import axios from "axios";
import { URL } from "../store/url";

export default function Section() {
  const[post,setPost]=useState([])
   
  const fetchPost=async()=>{
    try {
       const response=await axios.get(`${URL}/getAllpostDetails`)
       const data=response.data.data
       console.log(data);
       
       setPost(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchPost()
  },[])

  return (
    <div className="flex justify-center pt-2 w-full ">
       
      <div className="w-full md:w-4/5 h-full max-h-screen  rounded bg-[#2C3930] p-4 ">
      <div className="space-y-4 px-10 ">
          {post&&
           post.length>0?(
           post?.map((post, index) => (
             <PostBox key={index} post={post}/>
           ))
          ):(
              <p className="text-center text-gray-400">No post yet</p>
            )
          }
          </div>
        
      </div>
    </div>
  );
}
