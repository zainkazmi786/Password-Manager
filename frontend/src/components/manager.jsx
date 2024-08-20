import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import locks from '/assets/lock.svg'
import locksa from '/assets/unlock.svg'

import close from '/assets/close.svg'
import copyi from '/assets/copy.svg'
import del from '/assets/del.svg'
import edit from '/assets/edit.svg'
// import unlock from '/assets/unlock.svg'

// import FaviconFetcher from './favicon';
const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "", id: "" });
  const [passwordarray, setpasswordarray] = useState([])
  const [selectedId, setSelectedId] = useState(null);
  // const [faviconUrl, setFaviconUrl] = useState('');

  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()


    setpasswordarray(passwords)



  }

  useEffect(() => {

    getpasswords()


  }, [])


  const handlesubmit = async () => {
    const newEntry = { ...form, id: uuidv4() };

    let res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry)
    });
    if (res) {
      setpasswordarray([...passwordarray, newEntry]);
      toast("Password Saved")

    }

    setform({ site: "", username: "", password: "", id: "" });

  };
  const handlechange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  const deletepassword = async (id) => {
    const updatedArray = passwordarray.filter(item => item.id !== id);

    // Update state and local storage
    let res = await fetch("http://localhost:3000/", { method: "DELETE", body: JSON.stringify({ ...form, id }) })
    if (res) {

      setpasswordarray(updatedArray);
      setSelectedId(null)
      toast("Deleted Successfully")
    }



  }
  const editpassword = async (id) => {
    setform(passwordarray.filter(item => item.id === id)[0]);
    const updatedArray = passwordarray.filter(item => item.id !== id);
    let res = await fetch("http://localhost:3000/", { method: "DELETE", body: JSON.stringify({ ...form, id }) })
    if (res) {
      setpasswordarray(updatedArray);
      setSelectedId(null)
      // toast("Edited Successfully")
    }

  }
  const extractSiteName = (input) => {
    try {
      // Add a default protocol if it's missing
      const normalizedInput = input.startsWith('http://') || input.startsWith('https://')
        ? input
        : `http://${input}`;

      // Create a URL object
      const url = new URL(normalizedInput);
      // Extract the hostname from the URL
      const hostname = url.hostname;
      // Split the hostname and get the second-to-last part (usually the site name)
      const siteParts = hostname.split('.');
      // Return the site name
      return siteParts.length > 1 ? siteParts[siteParts.length - 2] : hostname;
    } catch {
      // If it's not a URL, return the input as is
      return input;
    }
  };
  const copy = (e) => {
    navigator.clipboard.writeText(e)
    console.log(e)
  }

  const [imageSrc, setImageSrc] = useState(locksa);
  const hoverSrc = locks;
  const defaultSrc = locksa;
  const [hoveredId, setHoveredId] = useState(null);

  const changeimage = (id) => {

    setHoveredId(id);
  }


  return (
    <div className="md:flex justify-between w-11/12 mx-auto">
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <div className='header   flex flex-col  justify-evenly items-center md:w-[45%] w-full h-screen'>
        <div className="header flex-col flex gap-10">
          <div class=" text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-green-300 from-sky-200">LockMate</div>
          <div class=" text-4xl font-semibold text-sky-400">Your Passwords are safe with us !</div>

        </div>

        {/* <motion.img
          src={lock}
          alt="Rotating Image"
          className="image h-11/12 w-64 "
          animate={{ rotateY: [0, 180, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        /> */}
      </div>


      <div className="h-screen md:w-[45%] w-full flex flex-col justify-around items-center">



        <div className="form h-2/5 relative z-10 flex flex-col w-full cursor-pointer items-center overflow-hidden rounded-xl  p-[4px]">
          <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#86eb34_20deg,transparent_120deg)]"></div>
          <div className="bg-white relative z-20 flex flex-col w-full h-full rounded-xl border-2 border-blue-200">

            <div className="bg-sky-500 rounded-lg px-6 py-2 w-full h-full flex flex-col justify-around shadow-lg">
              <div class="text-2xl font-bold text-emerald-900 w-fit mx-auto">Enter Password Information</div>
              <div className="">
                <label htmlFor="site" className="block text-xl font-bold text-blue-900 mb-2">Enter Site URL "</label>
                <input value={form.site} onChange={handlechange} className='rounded-md p-2 w-full bg-sky-400 text-white border-green-800 placeholder-green-800 placeholder-bold' type="text" name="site" id="site" placeholder="e.g., example.com" />
              </div>
              <div className='md:flex w-full justify-between'>
                <div className="md:w-[48%]">
                  <label htmlFor="username" className="block text-xl font-bold text-blue-900 mb-2">Enter UserName / Email </label>
                  <input value={form.username} onChange={handlechange} className='rounded-md p-2 w-full bg-sky-400 text-white border-green-800 placeholder-green-800 placeholder-bold' type="text" name="username" id="username" placeholder="Username" />
                </div>
                <div className="md:w-[48%]">
                  <label htmlFor="password" className="block text-xl font-bold text-blue-900 mb-2">Enter Password</label>
                  <input value={form.password} onChange={handlechange} className='rounded-md p-2 w-full bg-sky-400 text-white border-green-800 placeholder-green-800 placeholder-bold' type="password" name="password" id="password" placeholder="Password" />
                </div>
              </div>

              <div className="flex justify-center" >
                <button type="button" onClick={handlesubmit} className="w-24 hover:scale-110 text-white bg-gradient-to-br from-green-800 to-sky-800 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
              </div>
            </div>
          </div>
        </div>


        <div class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-green-300 from-sky-200">Saved Passwords</div>
        <div className="list flex justify-center items-center flex-wrap h-2/5 w-full gap-10 relative rounded-xl  bg-[#000d03] shadow-md shadow-white overflow-auto p-10">
          {passwordarray.length > 0 ? (
            passwordarray.map((item, index) => (
              <div className="relative flex flex-col cursor-pointer items-center overflow-hidden rounded-xl h-[100px] w-[100px]" key={index}>
                <div className="animate-rotate inset-0 rounded-xl bg-[conic-gradient(#86eb34_20deg,transparent_120deg)] h-full w-full absolute"></div>
                <motion.div
                  className="absolute top-[2px] right-[2px] h-[96px] w-[96px] bg-gradient-to-tr from-green-950 via-green-900 to-green-950 flex flex-col justify-evenly items-center cursor-pointer rounded-xl z-10"
                  layoutId={item.id}
                  onClick={() => setSelectedId(item.id)}
                  onMouseEnter={() => changeimage(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div>
                    <img className="w-[50px]" src={hoveredId === item.id ? hoverSrc : defaultSrc} alt="" />
                  </motion.div>
                  <motion.h2 className="text-lg text-sky-100 font-semibold">{extractSiteName(item.site)}</motion.h2>
                </motion.div>
              </div>
            ))
          ) : (
            <div className="relative flex flex-col cursor-pointer items-center overflow-hidden rounded-xl h-[120px] w-[150px]">
              <div className="animate-rotate inset-0 rounded-xl bg-[conic-gradient(#86eb34_20deg,transparent_120deg)] h-full w-full absolute"></div>
              <div className="text-center text-white absolute top-[2px] right-[2px] left-[2px] h-[116px] bg-gradient-to-tr from-green-950 via-green-900 to-green-950 flex flex-col justify-evenly items-center cursor-pointer rounded-xl z-10">
                <div className='text-lg text-sky-100 font-bold'>NO SAVED PASSWORDS</div>

              </div>
            </div>

          )}

          <AnimatePresence>
            {selectedId && (
              <motion.div
                className="absolute z-10 inset-0 w-full h-full bg-black rounded-xl flex flex-col justify-evenly md:items-center transform scale-100 shadow-lg p-10"
                layoutId={selectedId}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}

              >
                <div className="md:flex md:w-2/3 justify-between items-center">

                  <motion.div className="text-xl text-green-500 font-bold">
                    URL :
                  </motion.div>
                  <motion.div className='flex w-2/3 justify-between  items-center'>
                    <motion.h2 className="text-2xl underline italic text-sky-300 ">
                      <a className="md:font-normal text-sm">{passwordarray.length > 0 && passwordarray.find(item => item.id === selectedId).site}</a>
                    </motion.h2>
                    <motion.div >
                      <img className='cursor-pointer hover:scale-110' src={copyi} alt="" onClick={() => { copy(passwordarray.length > 0 && passwordarray.find(item => item.id === selectedId).site) }} />
                    </motion.div>
                  </motion.div>
                </div>
                <div className="md:flex md:w-2/3 justify-between items-center">

                  <motion.div className="text-xl text-green-500 font-bold">
                    Username/Email :
                  </motion.div>
                  <motion.div className='flex w-1/2  justify-between items-center'>
                    <motion.h5 className="text-xl font-semibold text-sky-300 ">
                      <span className="font-normal">{passwordarray.length > 0 && passwordarray.find(item => item.id === selectedId).username}</span>
                    </motion.h5>
                    <motion.div>
                      <img className='cursor-pointer hover:scale-110' onClick={() => { copy(passwordarray.length > 0 && passwordarray.find(item => item.id === selectedId).username) }} src={copyi} alt="" />
                    </motion.div>
                  </motion.div>
                </div>
                <div className="md:flex md:w-2/3 justify-between items-center">

                  <motion.div className="text-xl text-green-500 font-bold">
                    Password :
                  </motion.div>
                  <motion.div className='flex w-1/2  justify-between  items-center'>
                    <motion.h5 className="text-xl font-semibold text-sky-300 ">
                      <span className="font-normal">{passwordarray.length > 0 && passwordarray.find(item => item.id === selectedId).password}</span>
                    </motion.h5>
                    <motion.div >
                      <img className='cursor-pointer hover:scale-110' src={copyi} alt="" onClick={() => { copy(passwordarray.length > 0 && passwordarray.find(item => item.id === selectedId).password) }} />
                    </motion.div>
                  </motion.div>
                </div>
                <motion.button
                  className="absolute top-3 right-3 px-4 py-2 bg-white text-white rounded-full font-bold"
                  onClick={() => setSelectedId(null)}
                >
                  <img className="w-fit" src={close} alt="" />
                </motion.button>
                <motion.button
                  className="absolute bottom-3 left-3 px-4 py-2 bg-yellow-500 text-white rounded-full font-bold"
                  onClick={() => editpassword(selectedId)}
                >
                  <img src={edit} alt="" />
                </motion.button>
                <motion.button
                  className="absolute bottom-3 right-3 px-4 py-2 bg-red-800 text-white rounded-full font-bold h-18 w-18"
                  onClick={() => deletepassword(selectedId)}
                >
                  <img className="h-full w-full" src={del} alt="" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>






      </div>
    </div>
  );
};

export default Manager;
