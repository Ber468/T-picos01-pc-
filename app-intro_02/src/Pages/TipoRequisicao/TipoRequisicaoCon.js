import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TipoRequisicaoList from "./TipoRequisicaoList";
import TipoRequisicaoForm from "./TipoRequisicaoForm";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import TipoRequisicaoSrv from "./TipoRequisicaoSrv";

function TipoRequisicaoCon() {
  const [TipoRequisicoes, setTipoRequisicoes] = useState([]);
  const toastRef = useRef();
  const [visible, setVisible] = useState({visible: false});
  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);
  const onClickAtualizar = () => {
    TipoRequisicaoSrv.listar()
      .then((response) => {
        setTipoRequisicoes(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "TipoRequisicoes atualizados",
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
  const initialState = { id: null, descricao: "" };
  const [TipoRequisicao, setTipoRequisicao] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const inserir = () => {
    setTipoRequisicao(initialState);
    setEditando(true);
  };
  const cancelar = () => {
    console.log("Cancelou ...");
    setEditando(false);
  };
  const salvar = () => {
    if (TipoRequisicao._id == null) {
      // inclussão
      TipoRequisicaoSrv.incluir(TipoRequisicao)
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
      TipoRequisicaoSrv.alterar(TipoRequisicao)
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

    setTipoRequisicao(initialState);
    TipoRequisicaoSrv.obterPeloId(id)
    .then((response) => {
      setTipoRequisicao(response.data);
    })

    setEditando(true);

    }
  const excluirConfirm = (_id) => {
    TipoRequisicaoSrv.excluir(_id)
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
        <TipoRequisicaoList
          TipoRequisicoes={TipoRequisicoes}
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
        <TipoRequisicaoForm
          TipoRequisicao={TipoRequisicao}
          setTipoRequisicao={setTipoRequisicao}
          salvar={salvar}
          cancelar={cancelar}
        />
      </div>
    );
  }
}
export default TipoRequisicaoCon; 