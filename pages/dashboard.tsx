import { TabMenu } from 'primereact/tabmenu';
import 'primereact/resources/themes/vela-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useEffect, useState } from 'react';
import { api } from './api/api';
import Router  from 'next/router';
import Head from 'next/head';
import App from '../contents/App';
import MovFinanceiras from '../contents/transationstab';
import { toast, ToastContainer } from 'react-toastify';
import { destroyCookie, parseCookies } from 'nookies';

export default function Dashboard(){
  const [activeIndex, setActiveIndex] = useState<any>(false);
  // const [auth,setAuth] = useState('')
  const [sApp, setSApp] = useState(false);
  const [home, setHome] = useState(true);
  const [transations, setTransations] = useState(false);
  const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home', command:()=>{setSApp(false),setHome(true),setTransations(false)}},
        {label: 'Tabelas', icon: 'pi pi-fw pi-table', command:()=>{setSApp(true),setHome(false),setTransations(false)}},
        {label: 'Transações', icon: 'pi pi-fw pi-credit-card', command:()=>{setSApp(false),setHome(false),setTransations(true)}},
        {label: 'Sair', icon: 'pi pi-fw pi-sign-out', command:()=>{ api.get('/logout');destroyCookie(null, 'authtoken');;Router.push('/');}}
    ];
    const AppBoard=()=>{
     if(sApp == true)
     return (<App></App>)
     else return(<div></div>)
    }
    const Home=()=>{
      if (home == true) {
        return (<h1>Bem Vindo</h1>)}
        else return(<div></div>)
      }
    const Movfinanceiras=()=>{
      if (transations == true) {
        return (<MovFinanceiras/>)}
        else return(<div></div>)
    }
    useEffect(()=>{
     const auth = parseCookies();
     console.log(auth);
     if(!auth.authtoken){
      Router.push('/')
     }
     else{
      toast.success('Bem Vindo',{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
     }
    })


    return(
    <div>
      <Head>
        <title>DiretoAdmin</title>
      </Head>
      <div style={{position:"sticky",top:"0",zIndex:2, backgroundColor:"rgb(44, 44, 44)"}} className="p-d-flex">
            <TabMenu style={{width:"100%"}} model={items} />
         </div>
      <div>
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
        <Home></Home>
        <AppBoard></AppBoard>
        <Movfinanceiras/>
      </div>
    </div>
    )
}
