import React, { useState } from 'react';
import axios from 'axios';
import config from '../../../config/config';
import AlertaErro from '../../Alertas/AlertaErro';
import Alertasucesso from '../../Alertas/AlertaSucesso';

function ModalEditarNomeDespesa({id}) {
    const [nomeDespesa, setNomeDespesa] = useState(0);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertaErro, setAlertaErro] = useState(false);
    const [mensagemError, setMensagemError] = useState();
    const handleNomeDespesaChange = (event) => { setNomeDespesa(event.target.value); }

    function salvar() {
        axios.put(config.URL+'financeiro/nomeDespesa'+id+nomeDespesa)
            .then((response) => {
                if (response.status === 200) {
                    setAlertaErro(false)
                    setAlertVisible(true);
                    setTimeout(() => {
                        setAlertVisible(false);
                        window.location.reload();
                    }, 1000);
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setMensagemError("Erro: " + error.response.status + ". Verifique se todos os campos estão digitados de maneira correta")
                    setAlertaErro(true)
                }
                else {
                    setAlertaErro(true)
                    setMensagemError("Ops ! Aconteceu algum erro interno")
                }
            })
    }

    return (
        <div>
            <button className="" onClick={() => document.getElementById('my_modal_editar_nome_despesa_' + id).showModal()}>Editar Nome da Despesa</button>
            <dialog id={"my_modal_editar_nome_despesa_" + id} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    {alertVisible && <Alertasucesso message="Atualizado com sucesso" />}
                    {alertaErro && <AlertaErro message={mensagemError} />}
                    <br></br>
                    <h3 className="font-bold text-lg">Editar Nome da Despesa</h3>
                    <input type="text" className="input input-bordered" placeholder="Nome de Despesa" value={nomeDespesa} onChange={handleNomeDespesaChange} />
                    <div className="modal-action">
                        <button className="btn btn-success" onClick={salvar}>Salvar</button>
                        <form method="dialog">
                            <button className="btn" onClick={() => setAlertaErro(false)}>Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default ModalEditarNomeDespesa;
