import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SolicitanteList from "./SolicitanteList";
import SolicitanteForm from "./SolicitanteForm";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import SolicitanteSrv from "./SolicitanteSrv";

function SolicitanteCon() {
  const [solicitantes, setSolicitantes] = useState([]);
  const toastRef = useRef();
  const [visible, setVisible] = useState({visible: false});
  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);
  const onClickAtualizar = () => {
    SolicitanteSrv.listar()
      .then((response) => {
        setSolicitantes(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Solicitantes atualizados",
          life: 3000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 3000,
        });
      });
  };

  // operação inserir
  const initialState = { id: null, nome: "", email: "", senha: "" };
  const [solicitante, setSolicitante] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const inserir = () => {
    setSolicitante(initialState);
    setEditando(true);
  };
  const cancelar = () => {
    console.log("Cancelou ...");
    setEditando(false);
  };
  const salvar = () => {
    if (solicitante._id == null) {
      // inclussão
      SolicitanteSrv.incluir(solicitante)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    } else {
      // alteração
      SolicitanteSrv.alterar(solicitante)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    }
  };
  const editar = (id) => {

    setSolicitante(initialState);
    SolicitanteSrv.obterPeloId(id)
    .then((response) => {
      setSolicitante(response.data);
    })

    setEditando(true);

    }
  const excluirConfirm = (_id) => {
    SolicitanteSrv.excluir(_id)
      .then((response) => {
        onClickAtualizar();
        toastRef.current.show({
          severity: "success",
          summary: "Excluído",
          life: 2000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 4000,
        });
      });
  };

  const excluir = (_id) => {
    setVisible({visible: true, _id});
  };

  if (!editando) {
    return (
      <div className="App">
        <Toast ref={toastRef} />
        <ConfirmDialog
          visible={visible.visible}
          onHide={() => setVisible({visible: false})}
          message= "Confirma a exclusão?"
          header= "Confirmação"
          icon= "pi pi-question"
          accept= {() => excluirConfirm(visible._id)}

        />
        <SolicitanteList
          solicitantes={solicitantes}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Toast ref={toastRef} />
        <SolicitanteForm
          solicitante={solicitante}
          setSolicitante={setSolicitante}
          salvar={salvar}
          cancelar={cancelar}
        />
      </div>
    );
  }
}
export default SolicitanteCon; 