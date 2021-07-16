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
import Router from 'next/router';

type dataregistro = {
  nomecompleto: string;  
  email: string;
  password: string;
}
export default function Home() {

  const { register, handleSubmit } = useForm();
  function handleSignIn(data:dataregistro){
   try {
      api.post('/register',data)
     .then((response)=>{
        console.log(response) ;
        Router.push('/dashboard');        
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
      <div>
    <Card title="Registrar-se no Sistema" style={{height:"28rem",marginBottom:"15px",display:"flex",justifyContent:"center",width:"50%", marginLeft:"25%", marginTop:"5%"}}>
      <form className="p-fluid" onSubmit={handleSubmit(handleSignIn)}>
      <label htmlFor="nomecompleto">Nome Completo</label><br/>
      <InputText className="p-inputtext-lg p-d-block" id="nomecompleto" {...register("nomecompleto")} type="text"></InputText><br/>
      <label htmlFor="email">Email</label><br/>
      <InputText className="p-inputtext-lg p-d-block" id="email" {...register("email")} type="email"></InputText><br/>
      <label htmlFor="password">Senha:</label><br/>
      <Password toggleMask className="p-inputtext-lg p-d-block" id="password" {...register("password")} type="text"></Password><br/><br/>
      <Button type="submit" label="Enviar" icon="pi pi-check" /><br/>
      </form>
      <Link href="/">Já possuo uma conta</Link>
    </Card>
      </div>

    </div>
  )
}