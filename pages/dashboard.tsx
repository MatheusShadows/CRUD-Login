import { TabMenu } from 'primereact/tabmenu';
import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useState } from 'react';
import { api } from './api/api';
import Router  from 'next/router';
import Head from 'next/head';
import App from './App';

export default function Dashboard(){
  const [activeIndex, setActiveIndex] = useState<any>(false);  
  const [sApp, setSApp] = useState(false);
  const [home, setHome] = useState(true);
  const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home', command:()=>{setSApp(false),setHome(true)}},
        {label: 'Tabelas', icon: 'pi pi-fw pi-table', command:()=>{setSApp(true),setHome(false)}},
        {label: 'Perfil', icon: 'pi pi-fw pi-user'},
        {label: 'Sair', icon: 'pi pi-fw pi-sign-out', command:()=>{ api.post('/logout');Router.push('/');}}
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
    

    return(
    <div>
      <Head>
        <title>DiretoAdmin</title>
      </Head>
      <div style={{position:"sticky",top:"0",zIndex:2, backgroundColor:"rgb(44, 44, 44)"}} className="p-d-flex">
            <TabMenu model={items} />
         </div>
      <div>
        <Home></Home>
        <AppBoard></AppBoard>
      </div>
    </div>
    )
}
