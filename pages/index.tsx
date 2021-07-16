import Head from 'next/head';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {api} from './api/api';
import Link from 'next/link';

type datalogin = {
  email: string;
  password: string;
}
export default function Home() {

  const { register, handleSubmit } = useForm();
  function handleSignIn(data:datalogin){
   try {
    api.post('/login',data)
    .then((response)=>{
       console.log(response) ;        
      })
   } catch (err) {
     console.log(err)
   }
  }
  return (
    <div >
      <Head>
        <title>Validate Next</title>
      </Head>
    <Card title="Acessar o Sistema" style={{minWidth:"20rem",height:"25rem",marginBottom:"15px",display:"flex",justifyContent:"center",width:"50%", marginLeft:"25%", marginTop:"5%"}}>
      <div>
      <form className="p-fluid" onSubmit={handleSubmit(handleSignIn)}>
      <label htmlFor="name">Email</label><br/>
      <InputText id="email" className="p-inputtext-lg p-d-block" {...register("email")} type="email"></InputText><br/>
      <label htmlFor="password">Senha:</label><br/>
      <Password id="password" className="p-inputtext-lg p-d-block" {...register("password")} feedback={false}></Password><br/><br/>
      <Button type="submit" label="Enviar" icon="pi pi-check" /><br/>
      </form>
      <Link href="/registro">Não tenho uma conta</Link>
      </div>    
    </Card>

    </div>
  )
}
