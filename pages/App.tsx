import React, { useState } from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import card from '../styles/App.module.css';
import {api} from './api/api';
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import DiretoLogo from './images/img-1.png';
import Table from '../contents/table';


const App: React.FC = () => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [statuscontrato, setStatuscontrato] = useState<boolean>(false);
  const [empresa, setEmpresa] = useState<string>('');
  const [nomedevedor, setNomedevedor] = useState('');
  const [numerocontrato, setNumerocontrato] = useState<number>(0);
  const options = [{
    name: 'Vigente', value: true},
    {name: 'Não Vigente', value: false}];


  const onClick = (name: string) => {
      setDisplayBasic(true);
  }
  const onHide = (name: string) => {
      setDisplayBasic(false);
  }

 const Create = async() =>{
  try {
     await api.post('/create', {numerocontrato,empresa,nomedevedor,statuscontrato})

   } catch (err) {
     console.log(err);
   }
 }

  return (
    <div >

      {/* <img src={DiretoLogo} style={{margin:"0 25% 0 25%",width:"50%",clear:"both"}}/> */}
      <div>
            <Dialog className={card.card} visible={displayBasic} style={{ width: '50vw' }} header="Criar Novo Contrato" onHide={() => onHide('displayBasic')}>
        <div >
        <form className="p-field">
          <label form = "nomedevedor">Nome: </label><br/>
          <InputText value={nomedevedor} onChange={(e) => setNomedevedor(e.target.value)} /><br/>
          <label form = "empresa" >Empresa: </label><br/>
          <InputText value={empresa} onChange={(e) => setEmpresa(e.target.value)} /><br/>
          <label>Nº do Contrato</label><br/>
          <InputNumber value={numerocontrato} onChange={(e) => setNumerocontrato(e.value)} /><br/>
          <label>Status do Contrato</label>
          <SelectButton optionLabel="name" value={statuscontrato} options={options} onChange={(e) => setStatuscontrato(e.value)} /><br/>
          <Button label="ENVIAR" onClick={Create}/>
         </form>
          </div>
            </Dialog>
      </div>
          <h1 style={{textAlign:"center"}}>Contratos</h1>
      <ul>
          <Button label="Criar Novo Contrato" style={{marginLeft: "70%",zIndex:1,position:"absolute",top:"12.5rem"}}  onClick={() => onClick('displayBasic')} />
      <Table/>
      </ul>
    </div>
  );
}

export default App;
