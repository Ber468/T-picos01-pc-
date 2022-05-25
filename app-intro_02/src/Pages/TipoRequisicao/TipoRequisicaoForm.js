import React from "react";
const TipoRequisicaoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setTipoRequisicao({ ...props.TipoRequisicao, [name]: value });
  };

  return (
    <form>
      <div class="form-group">
        <label>Descricao</label>
        <input class="form-control" type="text" name="descricao"
          value={props.TipoRequisicao.descricao} onChange={handleInputChange}/>
      </div>
      <div class="form-group">
        <button type="button" onClick={() => props.salvar(props.TipoRequisicao)}
          className="btn btn-primary btn-sm">Salvar</button>
        <button type="button" onClick={props.cancelar}
          className="btn btn-primary btn-sm">Cancelar</button>
      </div>
    </form>
  );
};
export default TipoRequisicaoForm; 