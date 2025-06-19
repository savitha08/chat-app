
// import './App.css'

import { useEffect, useRef, useState } from "react";

function App() {

  const [messages,setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const wsRef=useRef();
  useEffect(()=>{
      const ws = new WebSocket("http://localhost:8080");
      ws.onmessage=(e)=>{
        setMessages(m=> [...m,e.data]
        )
      }
      wsRef.current =ws;

      ws.onopen=()=>{
        ws.send(JSON.stringify({
          type:"join",
          payload:{
            roomId:"red"
          }
        }))
      }

      return ()=>{
        ws.close();
      }
  },[]);
  return (

    <div>
      <div className="min-h-screen  bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-950 shadow-xl rounded-lg overflow-hidden">
      <div className="bg-red-400 text-white px-4 py-2 text-lg font-semibold">
          Chat Room: Red
        </div>
        <div className="h-80 overflow-y-auto p-4 space-y-2 bg-orange-100" >
          {messages.map((message,index) =>(<div key={index}  className="bg-white px-3 py-2 rounded shadow-sm text-gray-800 max-w-xs"  > <span className="text-sm text-gray-500 mr-2">{index+1}</span><span>{message}</span></div>)
          )}
        </div>
      </div>
      <div className="flex items-center p-4 border-t  bg-white"> 
        <input className="flex-1 px-3 py-2 rounded-l-md border-none " value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Message..." ></input>

        <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-r-md"
        // onClick={()=>{
        //   const message =document.getElementById("message")?.value;
        //   wsRef.current.send(JSON.stringify({
        //     type:"chat",
        //     payload:{
        //       message:message
        //     }
        //   }))
        // }} 

        onClick={() => {
          wsRef.current.send(
            JSON.stringify({
              type: "chat",
              payload: {
                message: inputMessage,
              },
            })
          );
          setInputMessage("");
        }}
        >send</button>
      </div>
      </div>
    </div>
  );
}

export default App
