import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import loginIcons from "../assest/signin.gif";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
  })
  };

  const handleUploadPic = async(e) =>{
    const file = e.target.files[0]
    
    const imagePic = await imageTobase64(file)
    
    setData((preve)=>{
      return{
        ...preve,
        profilePic : imagePic
      }
    })

  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(data.password === data.confirmPassword){

      console.log("SummaryApi.signUp.url",SummaryApi.signUP.url)

      const dataResponse = await fetch(SummaryApi.signUP.url,{
        method : SummaryApi.signUP.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const dataApi = await dataResponse.json()


       if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/login")
          }

          if(dataApi.error){
            toast.error(dataApi.message)
          }

      console.log("data",dataApi)
    }else{
      toast.error("Please check password and confirm password")
    }

  };

  console.log("data login", data);
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className=" bg-white p-5  w-full max-w-sm mx-auto ">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="bg-opacity-80 text-xs bg-slate-200 pb-4 pt-2 text-center absolute bottom-0 w-full cursor-pointer">
                  Upload Photo
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic}/>
              </label>
            </form>
          </div>
          <form className="pt-6 flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-100 p-2  ">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  placeholder="Enter your name"
                  required
                  className="w-full h-full outline-none  bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2  ">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder="Enter Email"
                  required
                  className="w-full h-full outline-none  bg-transparent"
                />
              </div>
            </div>

          


           
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2  flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className=" cursor-pointer text-xl "
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>


            <div>
                            <label>Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder='enter confirm password'
                                    value={data.confirmPassword}
                                    name='confirmPassword' 
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>

                                <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
            <button className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 translate-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>
          <p className="my-4">
            Already have account ?
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
