import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RequisicaoList from "./RequisicaoList";
import RequisicaoForm from "./RequisicaoForm";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import RequisicaoSrv from "./RequisicaoSrv";

function RequisicaoCon() {
  const [requisicoes, setRequisicoes] = useState([]);
  const toastRef = useRef();
  const [visible, setVisible] = useState({visible: false});
  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);
  const onClickAtualizar = () => {
    RequisicaoSrv.listar()
      .then((response) => {
        setRequisicoes(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Requisicoes atualizados",
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
  const initialState = { id: null, titulo: "", descricao: "", dataHoraCriada: "", prazoAtendimento: ""};
  const [requisicao, setRequisicao] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const inserir = () => {
    setRequisicao(initialState);
    setEditando(true);
  };
  const cancelar = () => {
    console.log("Cancelou ...");
    setEditando(false);
  };
  const salvar = () => {
    if (requisicao._id == null) {
      // inclussão
      RequisicaoSrv.incluir(requisicao)
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
      RequisicaoSrv.alterar(requisicao)
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

    setRequisicao(initialState);
    RequisicaoSrv.obterPeloId(id)
    .then((response) => {
      setRequisicao(response.data);
    })

    setEditando(true);

    }
  const excluirConfirm = (_id) => {
    RequisicaoSrv.excluir(_id)
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
        <RequisicaoList
          requisicoes={requisicoes}
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
        <RequisicaoForm
          requisicao={requisicao}
          setRequisicao={setRequisicao}
          salvar={salvar}
          cancelar={cancelar}
        />
      </div>
    );
  }
}
export default RequisicaoCon; 