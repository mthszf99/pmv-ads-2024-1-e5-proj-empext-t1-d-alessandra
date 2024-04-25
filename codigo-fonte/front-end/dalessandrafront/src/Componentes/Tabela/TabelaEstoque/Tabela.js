import React from 'react';
import SubMenuEstoque from '../../SubMenu/subMenuEstoque';
import ModalExcluir from "../../Modal/ModiasEstoque/modalExcluir";
import CardAlertaItemNaoEncontrado from '../../Card/CardAlertaItemNaoEncontrado';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';


function Tabela({dados,filtro}){

    return (
        <DataTable value={dados} size={"large"}  tableStyle={{ minWidth: '70rem',justifyContent:"center", fontSize:'small'}}>
            <Column field="codProduto" header="Cod.Produto"/>
            <Column field="nomeProduto" header="Nome Produto"/>
            <Column field='marca' header='Marca'/>
            <Column field='cor' header='Cor'/>
            <Column field='tamanho' header='Tamanho'/>
            <Column field='tipo' header='Tipo'/>
            <Column field='qtdAtual' header='Qtd'/>
            <Column field='valorComprado' header='Valor de compra'body={(rowData)=>(<span>R$ {rowData.valorComprado}</span>)}/>
            <Column field='valorVenda' header='Valor de venda'body={(rowData)=>(<span>R$ {rowData.valorVenda}</span>)}/>
            <Column field='valorTotalEmEstoque' header='Valor de estoque'body={(rowData)=>(<span>R$ {rowData.valorTotalEmEstoque}</span>)}/>        
            <Column field="status" header="Status"
                body={(rowData) => {
                    if (rowData.status === 'bom') {
                        return <Tag severity="success" value={rowData.status}></Tag>;
                    } 
                    else if(rowData.status=="Em falta"){
                        return <Tag severity="danger" value={rowData.status}></Tag>;
                    }
                    else if(rowData.status=="Nivel Critico"){
                        return <Tag severity="warning" value={rowData.status}></Tag>;
                    }
                }}
            />
            <Column body={(rowData) => (<ModalExcluir id={rowData.codProduto}/>)} />
            <Column body={(rowData) => (<SubMenuEstoque id={rowData.codProduto}/>)} />
        </DataTable>
    )
}

export default Tabela;