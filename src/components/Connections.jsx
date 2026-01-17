import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch=useDispatch();
    const connections= useSelector((store)=> store.connections);

    const fetchConnections= async()=>{
        const res = await axios.get(BASE_URL+"/user/connections", {withCredentials:true});
        dispatch(addConnections(res?.data?.data));
    }

    useEffect(()=>{
        fetchConnections();
    }, [])

    if(!connections) return;

    if(connections.length===0) return <h1 className='font-bold text-white'>No Connections Found</h1>
    
  return (
    <div className='text-center my-10'>
        <h1 className='text-3xl '>Connections</h1>
        {connections.map((connection)=>{
            const {firstName, lastName, photoURL, age, gender}= connection;
            return (
                <div className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
                    <div>
                        <img className='w-20 h-20 rounded-full' src={photoURL} alt="Photo" />
                    </div>
                    <div className='text-left mx-4'>
                        <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                        {age && gender && <p>{age + ", " + gender}</p>}
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Connections