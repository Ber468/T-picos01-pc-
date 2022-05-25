import { lazy, Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';
 
import { Menubar } from 'primereact/menubar';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
 
function App() {
  const Colaborador = lazy(() => import('./Pages/Colaborador/ColaboradorCon'));
  const Solicitante = lazy(() => import('./Pages/Solicitante/SolicitanteCon'));
  const TipoRequisicao = lazy(() => import('./Pages/TipoRequisicao/TipoRequisicaoCon'));
  const Requisicao = lazy(() => import('./Pages/Requisicao/RequisicaoCon'));
  const Home = lazy(() => import('./Pages/Home/Home'));
 
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => {
        window.location = '/';
      },
    },
    {
      label: 'Cadastro',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Colaboradores',
          icon: 'pi pi-fw pi-user',
          command: () => {
            window.location = '/Colaborador';
          },
        },
        {
          label: 'Solicitantes',
          icon: 'pi pi-fw pi-user',
          command: () => {
            window.location = '/Solicitante';
          },
        },
        {
          label: 'TipoRequisicoes',
          icon: 'pi pi-fw pi-user',
          command: () => {
            window.location = '/TipoRequisicao';
          },
        },
        {
          label: 'Requisicoes',
          icon: 'pi pi-fw pi-user',
          command: () => {
            window.location = '/Requisicao';
          },
        },
      ],
    },
    {
      label: 'Sair',
      icon: 'pi pi-fw pi-power-off',
    },
  ];
 
  return (
    <BrowserRouter>
    <Menu/>
      <div>
        <Menubar model={items} />
        <Suspense fallback={<div>Carregando</div>}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Colaborador" element={<Colaborador />} />
            <Route path="/Solicitante" element={<Solicitante />} />
            <Route path="/TipoRequisicao" element={<TipoRequisicao />} />
            <Route path="/Requisicao" element={<Requisicao />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

function Menu () {
  
  let navigate = useNavigate();
  
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => {
        window.location = '/';
      },
    },
    {
      label: 'Cadastro',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Colaboradores',
          icon: 'pi pi-fw pi-user',
          command: () => {
            window.location = '/Colaborador';
          },
        },
        {
          label: 'Solicitantes',
          icon: 'pi pi-fw pi-user',
          command: () => {
            window.location = '/Solicitante';
          },
        },
        {
          label: 'TipoRequisicoes',
          icon: 'pi pi-fw pi-user',
          command: () => {
            window.location = '/TipoRequisicao';
          },
        },
        {
          label: 'Requisicoes',
          icon: 'pi pi-fw pi-user',
          command: () => {
            window.location = '/Requisicao';
          },
        },
      ],
    },
    {
      label: 'Sair',
      icon: 'pi pi-fw pi-power-off',
    },
  ];

}
 
export default App;
