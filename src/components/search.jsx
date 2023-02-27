import axios from 'axios';
import React,{useState} from 'react'
import { useEffect } from 'react';

function Search() {

   
    const [input,setInput]=useState('');
    const [loading,setLoading]=useState(false);
    const [response,setResponse]=useState(false);
    const [error,setError]=useState(false);
    const [data,setData]=useState({});
    const [history,setHistory]=useState([]);
    const [recent,setRecent]=useState([]);

    useEffect(()=>{
        setData(data);
        setHistory(history)
        if(Object.values(data).length!=0)
        {
            setHistory(data.location.name);
           setRecent([history,...recent]);
           
        }
        
       }
       ,[data,history])


       useEffect(()=>{
        console.log(recent);
       },[recent])

    const submitCall= async (e)=>
    {
        e.preventDefault();
        setLoading(true);
        setError(false);
        setResponse(false);
       
        await setData({});
        await axios.get(`http://api.weatherapi.com/v1/current.json?key=924c9471202246ef951113441232702&q=${input}`).catch(e=>{
            setError(true);
            setLoading(false);
        
        }).then(async (res)=>{
            
          setLoading(false);
           
            const resData=await res.data;

            
           if(res!=undefined){

            
            setData(resData);
           }
          setResponse(true);
           

        });
       
    }
    

  return (
    <div className='flex flex-col gap-5  w-[60%] min-h-[60%] justify-center  items-center shadow-md rounded-md bg-[#ebebeb]'>
            <h1 className='pt-5 font-bold text-3xl'>Weather App</h1>
            <form className='w-[80%]' onSubmit={submitCall}>
                <input value={input} onChange={(e)=>{setInput(e.target.value); if(e.target.value===''){setData({}); setResponse(false);}}}  className='placeholder:text-center w-full h-[50px] placeholder:p-0 p-5 ring-1 ring-black' type={"text"} placeholder={"Enter city name"}></input>
            </form>
            <div className='w-full h-full flex justify-center'>
                {loading && <img className='w-[100px] h-[100px] '
                 src={'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif'} alt={'Loading...'}/>}

                 {response && 
                 
                    <div className='relative flex flex-col gap-3 justify-center items-center w-[100%] h[100%] pb-4'>
                            <img className='float-right absolute right-10 w-[80px] h-[80px]' src={data.current.condition.icon}></img>
                            <p  className='bg-[cyan] w-full text-center'>Weather details of city : {data.location.name}</p>
                            <p>Current Temperature : {data.current.temp_c} °C</p>
                            <p>Humidity : {data.current.humidity}</p>
                            <p>Wind Speed : {data.current.wind_kph} k/h</p>

                            <p>Pressure : {data.current.pressure_mb}</p>
                    </div>
                 
                 }

                 { error && 

                 <div className='bg-[red] h-[45px] text-center w-full text-white text-4xl'>
                        Enter Valid City Name
                    </div>

                 }
            </div>
            <div className='flex flex-col gap-5  w-[60%] min-h-[60%] justify-center  items-center shadow-md rounded-md bg-[#ebebeb] mt-10 text-[red] pb-5 mb-3'>

                 <p className='text-center text-1xl'>Last 3 city entries</p>

                <ol>
                    { recent.length!=0 &&
                        recent.map((i,index)=>{
                            
                            if(i!='' && recent.indexOf(i)===index && index*2<=7){
                            return(
                                <li className='list-disc text-black'>{i}</li>
                            )
                            }
                        })
                    }
                </ol>

</div>
            
    </div>
    
  )
}

export default Search