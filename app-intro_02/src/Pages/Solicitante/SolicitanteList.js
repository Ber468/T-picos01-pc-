import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

const template2 = {
  layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
  RowsPerPageDropdown: (options) => {
    const dropdownOptions = [
      { label: 5, value: 5 },
      { label: 10, value: 10 },
      { label: 15, value: 15 },
    ];

    return (
      <React.Fragment>
        <span
          className="mx-1"
          style={{ color: "var(--text-color)", userSelect: "none" }}
        >
          Itens por página:{" "}
        </span>
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      </React.Fragment>
    );
  },
  CurrentPageReport: (options) => {
    return (
      <span
        style={{
          color: "var(--text-color)",
          userSelect: "none",
          width: "120px",
          textAlign: "center",
        }}
      >
        {options.first} - {options.last} de {options.totalRecords}
      </span>
    );
  },
};

const SolicitanteList = (props) => {
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <button type="button" 
        onClick={() => props.editar(rowData._id)} 
        className="btn btn-warning btn-sm">Editar</button>

        <button type="button" 
        onClick={() => props.excluir(rowData._id)} 
        className="btn btn-danger btn-sm">Excluir</button>
      </React.Fragment>
    );
  };
  return (
    <div>
      <div>
        <h4>Listagem de Solicitantes</h4>
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={props.inserir}
        >
          Inserir
        </button>
        <div className="card">
          {/* <DataTable value={customers2} paginator className="p-datatable-customers" rows={10}
                    dataKey="id" filters={filters2} filterDisplay="row" loading={loading2} responsiveLayout="scroll"
                    globalFilterFields={['name', 'country.name', 'representative.name', 'status']} header={header2} emptyMessage="No customers found."> */}
          <DataTable
            value={props.solicitantes}
            responsiveLayout="scroll"
            paginator
            paginatorTemplate={template2}
            rows={5}
            paginatorClassName="justify-content-center"
            className="mt-6"
          >
            <Column field="_id" header="ID" sortable></Column>
            <Column field="nome" header="Nome" sortable filter></Column>
            <Column field="email" header="E-mail" sortable filter></Column>
            <Column header="Operações" body={actionBodyTemplate}></Column>
            {/* <Column field={<button onClick={() => props.editar()} className="btn btn-light btn-sm">Editar</button>}></Column>  */}
          </DataTable>
        </div>
        {/* <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Senha</th>
                    <th>Operações</th>
                </tr>
            </thead>
            <tbody>
                {props.colaboradores.length > 0 ?(
                    props.colaboradores.map((o, index) => (
                        <tr key={index}>
                            <td>{index}</td> 
                            <td>{o.nome}</td>
                            <td>{o.email}</td>
                            <td>{o.senha}</td>
                            <td>
                                <button onClick={() => props.editar(o.id)} className="btn btn-light btn-sm">Editar</button>
                                <button onClick={() => props.excluir(o._id)} className="btn btn-light btn-sm">Excluir</button>
                            </td>
                        </tr>
                    ))
                ):(
                    <tr>
                        <td colSpan={3}>Nenhum Colaborador</td>
                    </tr>
                )}
            </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default SolicitanteList; 