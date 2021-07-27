import Head from 'next/head';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/vela-blue/theme.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, { useState, useEffect } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useForm } from 'react-hook-form';
import {api} from './api/api';
import Link from 'next/link';
import Router from 'next/router';
import { setCookie } from 'nookies';

type datalogin = {
  email: string;
  password: string;
}
export default function Home() {
  const [ token, setToken] = useState<string>('')
  const { register, handleSubmit } = useForm();
  function handleSignIn(data:datalogin){
   try {
    api.post('/login',data)
    .then((response)=>{
      setToken(response.data);
      localStorage.setItem("token",token);
      setCookie(undefined,'authtoken',token,{maxAge:60*60})
      console.log(token) ;
      if(!token){
      toast.error('Usuário ou Senha inválidos',{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      }) 
      } else{
      Router.push('/dashboard');          
    }})
   } catch (err) {
     console.log(err);
     toast.error('Erro de Rede',{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })
   }
  }
  return (
    <div >
      <Head>
        <title>Validate Next</title>
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <Card title="Acessar o Sistema" style={{minWidth:"20rem",height:"25rem",marginBottom:"15px",display:"flex",justifyContent:"center",width:"50%", marginLeft:"25%", marginTop:"5%"}}>
      <div>
      <form className="p-fluid" onSubmit={handleSubmit(handleSignIn)}>
      <label htmlFor="name">Email</label><br/>
      <InputText id="email" className="p-inputtext-lg p-d-block" {...register("email")} type="email"></InputText><br/>
      <label htmlFor="password">Senha:</label><br/>
      <Password toggleMask id="password" className="p-inputtext-lg p-d-block" {...register("password")} feedback={false}></Password><br/><br/>
      <Button type="submit" label="Enviar" icon="pi pi-check" /><br/>
      </form>
      <Link href="/registro">Não tenho uma conta</Link>
      </div>    
    </Card>

    </div>
  )
}
