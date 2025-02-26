import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { httpClient } from "../http/client";
import DataBaseClient  from "../SQLite/client";
import LoginForm from "../components/LoginForm";
function Login() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
    httpClient.get("/api/v1/memos").then((response) => {
      console.log(response);
    });
    DataBaseClient.createTable();
  }

  return (
    <div>
      <h1>dd</h1>
<div className="flex items-center justify-center h-screen bg-gray-100">
      
<LoginForm />
    </div>
    </div>
    
    
  );
}

export default Login;
