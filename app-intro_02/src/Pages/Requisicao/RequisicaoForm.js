import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import TipoRequisicaoSrv from "../TipoRequisicao/TipoRequisicaoSrv";
import SolicitanteSrv from "../Solicitante/SolicitanteSrv";
const RequisicaoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setRequisicao({ ...props.requisicao, [name]: value });
  };

  const [TipoRequisicoes, setTipoRequisicoes] = useState([]);
  const [Solicitantes, setSolicitantes] = useState([]);
  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);
  const onClickAtualizar = () => {
    TipoRequisicaoSrv.listar()
      .then((response) => {
        setTipoRequisicoes(response.data);
      })
      SolicitanteSrv.listar()
      .then((response) => {
        setSolicitantes(response.data);
      })     
  };
  return (
    <form>
      <div class="form-group">
        <label>Titulo</label>
        <input class="form-control" type="text" name="titulo"
          value={props.requisicao.titulo} onChange={handleInputChange}/>
      </div>
      <div class="form-group">
        <label>Descricao</label>
        <input class="form-control" type="text" name="descricao"
          value={props.requisicao.descricao} onChange={handleInputChange}/>
      </div>
      <div class="form-group">
        <label>DataHoraCriada</label>
        <input class="form-control" type="Date" name="dataHoraCriada"
          value={props.requisicao.dataHoraCriada} onChange={handleInputChange}/>
      </div>
      <div class="form-group">
        <label>Status</label>
        <input class="form-control" type="text" name="status"
          value={props.requisicao.status} onChange={handleInputChange}/>
      </div>
      <div class="form-group">
        <label>PrazoAtendimento</label>
        <input class="form-control" type="Date" name="prazoAtendimento"
          value={props.requisicao.prazoAtendimento} onChange={handleInputChange}/>
      </div>
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Tipo de requisição</label>
          <Dropdown
            value={props.requisicao?.tipoRequisicao?._id}
            options={TipoRequisicoes}
            optionValue="_id"
            optionLabel="descricao"
            onChange={(e) => {
              const tipo = TipoRequisicoes.find((tipoRequisicao) => tipoRequisicao._id === e.value);
              props.setRequisicao((current) => ({ ...current, tipoRequisicao: tipo }));
            }}
            placeholder="Seleciona uma requisição"
          />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Solicitante</label>
          <Dropdown
            value={props.requisicao?.solicitante?._id}
            options={Solicitantes}
            optionValue="_id"
            optionLabel="nome"
            onChange={(e) => {
              const solicitante = Solicitantes.find((solicitante) => solicitante._id === e.value);
              props.setRequisicao((current) => ({ ...current, solicitante: solicitante }));
            }}
            placeholder="Seleciona um solicitante"
          />
        </div>
      <div class="form-group">
        <button type="button" onClick={() => props.salvar(props.requisicao)}
          className="btn btn-primary btn-sm">Salvar</button>
        <button type="button" onClick={props.cancelar}
          className="btn btn-primary btn-sm">Cancelar</button>
      </div>
    </form>
  );
};
export default RequisicaoForm;