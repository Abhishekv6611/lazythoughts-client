import { PiStepsFill } from "react-icons/pi";

export default function PostBox({post}) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
 console.log();
 
  return (
    <div   className="pr-2  pl-10 ">
      <div className=" text-white py-10 lg:mt-7 rounded-lg mt-2">
        <div className="flex justify-start">
          <img
            className="w-10 h-10 lg:w-20 lg:h-20 rounded-full -mt-10 p-1 lg:p-2"
            src={post?.userDetails.profilePic}
            alt="userDp"
          />
          <span className="grid text-[#DCD7C9] ">
          <h2 className="-mt-7 p-1 lg:p-2 font-bebas">{post?.userDetails.fullName}</h2>
          <p className="lg:-mt-7 -mt-3 p-1 lg:p-2 text-xs font-serif mb-1">{post.createdAt?formatter.format(Date.parse(post?.createdAt)):"Invalid date"}</p>
          </span>
        </div>
        {/* Content Section */}
        <div className="px-6 mt-2 lg:px-10 lg:ml-5 ">
          <div className="-mt-4 py-10 bg-[#D2E0FB] border-2 flex justify-start p-2 rounded-lg">
           <p className="text-black lg:text-xl font-serif">{post?.UserThoughts}</p>
          </div>
        </div>
        {/* <h2 className="flex p-1  text-xl max-w-24 pt-1 mt-1 lg:ml-16 bg-[#D2E0FB] text-black px-2 ml-6 font-bebas border-white rounded-md " >
          <PiStepsFill />
          <p className="text-sm pl-1">Build{" "}12</p>
          </h2> */}
      </div>
      
    </div>
  );
}
