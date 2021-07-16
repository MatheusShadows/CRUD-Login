import React, {useEffect, useState, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import card from '../styles/App.module.css';
import {api} from '../pages/api/api';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber';
import { Tag } from 'primereact/tag';
import { ToastContainer,toast } from 'react-toastify';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import 'react-toastify/dist/ReactToastify.min.css';


interface IContrato{
    id: number;
    nomedevedor: string;
    empresa: string;
    statuscontrato: boolean;
    numerocontrato: number;
  }

const Table = () =>{
    const [contratosLista,setContratosLista] = useState<IContrato[]>([{
        id: 1,
        nomedevedor: 'Jeferson Silva',
        empresa: 'PA',
        statuscontrato: true,
        numerocontrato: 1
      },{
        id: 2,
        nomedevedor: 'Mateus Nascimento',
        empresa: 'PA',
        statuscontrato: false,
        numerocontrato: 2
      },{
        id: 3,
        nomedevedor: 'Jaozin Leite',
        empresa: 'PA',
        statuscontrato: false,
        numerocontrato: 3
      }, {
        id: 4,
        nomedevedor: 'Isaac Asimov',
        empresa: 'AM',
        statuscontrato: true,
        numerocontrato: 4
      },{
        id: 5,
        nomedevedor: 'Franz Kafka',
        empresa: 'AP',
        statuscontrato: true,
        numerocontrato: 5
      }  ]);
    const [contratosTotal, setContratosTotal] = useState<number>(0)
    const [reload, setReload] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [displayAtualizar, setDisplayAtualizar] = useState(false); 
    const [displayDeletar, setDisplayDeletar] = useState(false); 
    const [statuscontrato, setStatuscontrato] = useState<boolean>(false);
    const [empresa, setEmpresa] = useState<string>('');
    const [nomedevedor, setNomedevedor] = useState<string>('');
    const [numerocontrato, setNumerocontrato] = useState<number>(0);
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [iD, setID] = useState(0);
    let page1 = 0;

    const statuses = [{
      name: 'Vigente', value: true},
      {name: 'Não Vigente', value: false}];
    const options = [{
      name: 'Vigente', value: true},
      {name: 'Não Vigente', value: false}];
      
  const onHideA = (name: string) => {
      setDisplayAtualizar(false);
  }
  const onHideDelete = (name: string) => {
    setDisplayDeletar(false);
}
  
  const editProduct = (product:any) => {
    setID(product.id);
    setDisplayAtualizar(true);
}
  const confirmDeleteProduct=(product:any)=>{
    setID(product.id);
    setDisplayDeletar(true);
}

const onPageInputChange = (event:any) => {
  setCurrentPage(event.target.value);
}

    const dt = useRef(null);

  const renderFooter = () =>{
    return (
      <React.Fragment>
      <div className='table-footer'>
        <Button icon="pi pi-angle-left" className="p-button-rounded p-button-info "  onClick={() => PaginatorLeft()} />

        <Button icon="pi pi-angle-right" className="p-button-rounded p-button-info " style={{marginLeft:"70%"}} onClick={() => PaginatorRight()} />
      </div>
      </React.Fragment>
    )
  }
  const template1 = {
    layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
    'PrevPageLink': (options:any) => {
        return (
            <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                <span className="p-p-3">Previous</span>
                <Ripple />
            </button>
        )
    },
    'NextPageLink': (options:any) => {
        return (
            <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                <span className="p-p-3">Next</span>
                <Ripple />
            </button>
        )
    },
    'PageLinks': (options:any) => {
        if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
            const className = classNames(options.className, { 'p-disabled': true });

            return <span className={className} style={{ userSelect: 'none' }}>...</span>;
        }

        return (
            <button type="button" className={options.className} onClick={options.onClick}>
                {options.page + 1}
                <Ripple />
            </button>
        )
    },
    'RowsPerPageDropdown': (options:any) => {
        const dropdownOptions = [
            { label: 10, value: 10 },
            { label: 20, value: 20 },
            { label: 50, value: 50 },
            { label: 'All', value: options.totalRecords }
        ];

        return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} appendTo={document.body} />;
    },
    'CurrentPageReport': (options:any) => {
        return (
            <span className="p-mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                Go to <InputText  className="p-ml-1" value={currentPage}  onChange={onPageInputChange}/>
            </span>
        )
    }
};

  const statusFilter = <Dropdown optionLabel="name" optionValue="value" value={selectedStatus} options={statuses} onChange={(e) => setSelectedStatus(e.value)} placeholder="Select a Status" className="p-column-filter" showClear />;

    const Update=async()=>{
      try {
        await api.put(`/update/${iD}`, {nomedevedor,empresa,statuscontrato,numerocontrato});
        toast.success('Sucesso ao Atualizar',{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        setReload(true)
      } catch (err) {
        console.log(err);
        toast.error('Erro ao Atualizar',{
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
    const Delete=async ()=>{
      try {
        await api.delete(`/delete/${iD}`);
        setReload(true)
        setDisplayDeletar(false);
        toast.success('Sucesso ao Deletar',{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      } catch (err) {
        console.log(err);
        setDisplayDeletar(false)
        toast.error('Erro ao Deletar',{
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
    const PaginatorRight = ()=>{
      if (page1 < 10 ){
         setReload(true);
         page1 = page1+1
         console.log(page1);
      }else{
     
      }
    }
    const PaginatorLeft = ()=>{
      if (page1 > 0 ){
         setReload(true);
          page1 = page1-1
         console.log(page1);
      }else{
    
      }
    }
     
    useEffect(()=>{
      async function getData(){
        try {
          const { data } = await api.get(`/list/5/${page1}`)
          setContratosLista(data.rows);
          setContratosTotal(data.count);
        } catch (err) {
          console.log(err);
        }
      }
      getData()
     }, [reload])
     const actionBodyTemplate = (rowData:any) => {
      return (
          <React.Fragment>
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
          </React.Fragment>
      );
  }
  const deleteProductDialogFooter = (
    <React.Fragment>
        <Button label="Não" icon="pi pi-times" className="p-button-text" onClick= {() => onHideDelete('displayDeletar')} />
        <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={Delete} />
    </React.Fragment>
  );
  const statusBodyTemplate = (rowData: any) => {
      if(rowData.statuscontrato === true){
        return (
        <React.Fragment>
          <Tag className="p-mr-2" icon="pi pi-check" severity="success" value="Vigente"></Tag>
        </React.Fragment>)}
        else{
        return (
          <React.Fragment>
          <Tag className="p-mr-2" icon="pi pi-exclamation-triangle" severity="warning" value="Não Vigente"></Tag>
        </React.Fragment>)}
        
        } 
  const footer = renderFooter();
  
    
    return (
        <div>
               <Dialog className={card.card} visible={displayAtualizar} style={{ width: '50vw' }} header="Atualizar Contrato" onHide={() => onHideA('displayAtualizar')}>
        <div >
          <form className="p-field" action="192.168.1.9:3038" method="put">
          <form className="p-field">
          <label form = "nomedevedor">Nome: </label><br/>
          <InputText value={nomedevedor} onChange={(e) => setNomedevedor(e.target.value)} placeholder={nomedevedor}/><br/>
          <label form = "empresa" >Empresa: </label><br/>
          <InputText value={empresa} onChange={(e) => setEmpresa(e.target.value)} /><br/>
          <label form = "numerocontrato" >Nº do Contrato: </label><br/>
          <InputNumber value={numerocontrato} onChange={(e) => setNumerocontrato(e.value)} /><br/>
          <label>Status do Contrato</label>
          <SelectButton optionLabel="name" value={statuscontrato} options={options} onChange={(e) => setStatuscontrato(e.value)} /><br/>
          <Button label="ENVIAR" onClick={Update}/>
         </form>
        </form>
          </div>
            </Dialog>
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
             <div>
                <DataTable ref={dt} value={contratosLista}
                paginator
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
                    className="p-datatable-customers" dataKey="id" rowHover footer={footer}
                    emptyMessage="Nenhum contrato encontrado.">
                    <Column field="nomedevedor" sortable header="Nome Devedor" filter filterPlaceholder="Buscar por Nome" />
                    <Column field="empresa" sortable filterField="empresa" header="Empresa"  filter filterPlaceholder="Buscar por Empresa"/>
                    <Column field="numerocontrato" filterField="numerocontrato" filter header="Numero Contrato" filterPlaceholder="Buscar por Nº"/>
                    <Column field="statuscontrato" sortable header="Status Contrato" body={statusBodyTemplate}/>
                    <Column header="Editar/Excluir" body={actionBodyTemplate}/>
                    </DataTable>
            </div>
            <Dialog visible={displayDeletar} style={{ width: '450px' }} header="Confirmação" modal footer={deleteProductDialogFooter} onHide={() => onHideDelete('displayDeletar')}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    <span>Tem certeza de que deseja deletar o contrato? <b></b>?</span>
                </div>
            </Dialog>

        </div>
    )
}
export default Table;