import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useRef, useEffect } from 'react';
import { Paginator } from 'primereact/paginator';
import {api} from '../pages/api/api';
import { toast } from 'react-toastify';
import { Button} from 'primereact/button';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import {mask,unMask} from '../node_modules/remask';
import React from 'react';
import { Tag } from 'primereact/tag';


interface Transation{
    recebedor: string;
    recebedor_original: string;
    ht_amount: string;
    ht_data: string;
    tipo_pagamento: string;
    cobranca_descricao: string;
    cobranca_id: string;
}
const Transations: React.FC=()=>{
    const [cnpj, setCnpj] = useState<string>('');
    const [fCnpj, setFCnpj] = useState<string>('');
    const [transacoes, setTransacoes] = useState<Transation[]>([]) ;
    const dt = useRef(null);
    const [first,setFirst] = useState(0);

    const Search = async ()=>{
        toast.info('Buscando...',{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        try {
          const {data} = await axios.get(`http://192.168.1.60:3013/alfa/${cnpj}/10/${first}`);
          console.log(cnpj);
          console.log(data);
          setTransacoes(data);
          console.log(transacoes);
          if(!data[0]){          
            setCnpj('');
            setTransacoes(null);
            toast.error('CNPJ não encontrado',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else{
            toast.success('Movimentações Encontradas',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
        }
        } catch (err) {
          console.log(err);
          setCnpj('');
          setTransacoes(null);
          toast.error('Erro de Conexão com o Banco de Dados',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      }
      const Clean=()=>{
          setFCnpj('');
          setCnpj('');
          setTransacoes(null);
          toast.success('Busca Resetada',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      }

      const Mask = (value: string) => {
        const AuxCnpj = mask((value), '99.999.999/9999-99');
        const TCnpj = unMask(AuxCnpj);
        setCnpj(TCnpj);
        setFCnpj(AuxCnpj);
      }
      const handleKeyPress=(event)=>{
          if (event.key === 'Enter') {
              Search();
          }
      }
      const paymentBodyTemplate = (rowData: any) => {
        if(rowData.tipo_pagamento === 'boleto'){
          return (
          <React.Fragment>
            <Tag className="p-mr-2" icon="pi pi-money-bill" severity="success" value="Boleto"></Tag>
          </React.Fragment>)}
          else{
          return (
            <React.Fragment>
            <Tag className="p-mr-2" icon="pi pi-credit-card" severity="info" value="Cartão"></Tag>
          </React.Fragment>)}
          
          } 

    return(
        <div>
            <div style={{padding:"20px 20px 20px 20px",alignItems:"center",justifyContent:"center", textAlign:"center"}}>
            <label form = "fCnpj" ><b>Digite o Nº do CNPJ que deseja buscar: </b></label>
            <InputText value={fCnpj} onKeyPress={handleKeyPress} onChange={(e) => Mask(e.target.value)} placeholder="99.999.999/9999-99" />
            <Button id="search" label="BUSCAR" style={{marginLeft:"10px"}} icon="pi pi-search" onClick={Search}/>
            <Button label="LIMPAR" style={{marginLeft:"10px"}} icon="pi pi-trash" onClick={Clean}/>
            </div>
            <DataTable ref={dt} value={transacoes}
            className="p-datatable-customers" dataKey="cobranca_id" rowHover
            emptyMessage="Nenhuma movimentação financeira encontrada." >
                <Column field="recebedor" sortable header="Recebedor" />
                <Column field="recebedor_original" sortable header="Recebedor Original" />
                <Column field="tipo_pagamento" body={paymentBodyTemplate} sortable header="Tipo de Pagamento"/>
                <Column field="ht_amount" sortable header="Valor da Transação" />
                <Column field="cobranca_descricao" sortable header="Descrição da Cobrança"/>
                <Column field="cobranca_id" sortable header="ID da Cobrança" />
                <Column field="ht_data" sortable header="Data da Transação"/>
            </DataTable>
            <Paginator first={first} rows={10} onPageChange={(e) => setFirst(e.first)}></Paginator>
        </div>
    )

}

export default Transations;