import { useEffect, useState } from "react";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import "./Tasks.css";
import {Form, Input, Button, Row, Col, Divider, PageHeader } from "antd";
const endpoint = "http://localhost:3004";

const Tasks = () =>{

  const params = useParams();
  const location = useLocation();
  const [list, setList] = useState([]);
  const [lista, setLista] = useState({});
  const [isOnlyPending, setIsOnlyPending] = useState(false);
  const [isEditing, setIsEditing] = useState("");
  const [isAll, setIsAll] = useState(false);
  const history = useHistory();


  async function getTasks(id){
    const res = await axios.get(`${endpoint}/tasks?list_id=${id}`);
    if(res.status === 200){
      setList(res.data);
    }
  }

  async function getList(id){
    const res = await axios.get(`${endpoint}/lists/${id}`);
    if(res.status === 200){
      setLista(res.data);
    }
  }


  useEffect(()=>{
      console.log(params);
      if (params.id){
        getTasks(params.id);
        getList(params.id);
      }
  },[location]);

  async function onSubmit(values) {
    const task = {
      id:new Date(),
      list_id: params.id,
      name: values.task,
      status: "pendente",
    };

    await axios.post(`${endpoint}/tasks`, task);
    getTasks(params.id);
  }

  async function toggle(item) {
    item.status = item.status === "pendente" ? "feito" : "pendente";
    await axios.put(`${endpoint}/tasks/${item.id}`, item)
    getTasks(params.id);

  }   

  async function filter(){
    setIsAll(true);
    let url =`${endpoint}/tasks`;
    if (!isOnlyPending) {
      url = url + `?status=pendente`;
    }
    const res = await axios.get(url);
    if (res.status === 200) setList(res.data);
    setIsOnlyPending(!isOnlyPending);
    if (isAll){
      history.go(0);  
    }  
  }

  function save(newName, item){
      const newList = list.map((t)=>{
          if(t.id === item.id) t.name = newName;
          return t;
      });
      setList(newList);
      setIsEditing("");
  }

  function onKeyDown(e, item){
      if(e.charCode === 13 || e.keyCode === 13) save(e.target.value, item);
  }

  function onBlur(e, item){
      save(e.target.value, item);
  }

 

  return (
    <div className="dark">
      <div className="App">
      <PageHeader className="header" onBack={() => history.goBack()} title={ !isAll ? lista.name : "Todas as Listas"} subTitle={ !isAll ? `Atividades na lista de ${lista && lista.name}` : " Atividades pendentes em todas as suas listas"} /> 
        <Divider />

      <Form onFinish={onSubmit}>
        <Row>
          <Col sm={20}>
              <Form.Item name="task" rules={[{required: true, message: "Nome do Item é Obrigatório"}]}>
                <Input id="task"/>
              </Form.Item>
            </Col>
            <Col sm={4}>
                <Button htmlType="submit">Adicionar</Button>
            </Col>
          </Row>
      </Form>

      <div>
          <Button type="link" onClick={filter}>
            {isOnlyPending ? "Todos" : "Pendentes"}
          </Button>
        </div>

      <ul>
        {list.map((item, index)=>{
          return (
            <li style={item.status === "feito" ? {textDecoration:"line-through"} : {}} key={index}>
              <span>
                  {isEditing === item.id ? (
                      <input defaultValue={item.name} onBlur={(e)=>onBlur(e, item)} onKeyDown={(e)=>onKeyDown(e, item)} />
                  ) : (
                      <b onClick={()=>setIsEditing(item.id)}>{item.name}</b>
                  )}
              </span>
              <button onClick={()=> toggle(item)}>
                  {item.status ==="feito" ?
                    <FaRegCheckSquare /> : 
                    <FaRegSquare />}
                </button>
            </li>
        );
        })}
      </ul>
      </div>
    </div>
  );
};

export default Tasks;