import './App.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import Table from './componets/Table';
import Form from './componets/Form';

function App() {

  const [list, setList] = useState([])
  const [auditoria, setAuditoria] = useState({})

  const listar = async () => {
    try {
      const response = await Axios({
        url: "http://localhost:8080/auditoria",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      setList(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    listar();
  }, [setList]);

  const guardar = (body)=> async (e)=>{
    e.preventDefault();
    if (body.id) {
        try {
          const res = await Axios({
            url:`http://localhost:8080/auditoria`,
            method: "PATCH",
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
            data: body
          });
          setAuditoria({
            id: null,
            auditor:"",
            ente_control:"",
          })
          listar();
          res.data ? alert('Datos actualizados'): alert('Ocurrio un error al actualizar');
        } catch (e) {
          console.log(e);
        }
    } else {
      try {
        body.fecha_inicio = new Date().toISOString().split('T')[0];
        await Axios({
          url:`http://localhost:8080/auditoria`,
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          data: body
        });
        setAuditoria({
          id: null,
          auditor:"",
          ente_control:"",
          fecha_inicio: ""
        })
        listar();
        alert('Datos guardardos');
      } catch (e) {
          console.log(e);
      }
    }
    
  }

  const editar = (id) => async (e) => {
    const index = list.findIndex(item => item.id == id)
    setAuditoria(list[index])
  };

  const estadoEdit = (body) => async (e) => {
    try {
      body.fecha_fin = new Date().toISOString().split('T')[0];
      body.estado = 1;
      await Axios({
        url:`http://localhost:8080/auditoria-estado`,
        method: 'PATCH',
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        data: body 
      });
      listar();
      setAuditoria({
        id: null,
        auditor:"",
        ente_control:"",
        fecha_inicio: "",
      })
      alert('Se ha finalizado con exito la auditoria')
  
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App container-fluid">
      <h2>CRUD Prueba</h2>

      <Form auditoria={auditoria} setAuditoria={setAuditoria} guardar={guardar}/> 
      <br/>

      <Table 
        list={list} 
        editar={editar} 
        estadoEdit={estadoEdit} 
      />
    </div>
  );
}

export default App;
