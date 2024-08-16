import { useEffect, useState } from 'react';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';
import './styles/App.scss';
import axios from 'axios';
import { API_BASE_URL } from './app-config';

function App() {
  const [ todoItems, setTodoItems ] = useState([
    // 테스트용 더미데이터 삭제
  ])
  console.log("todoItems >>>> ", todoItems);
  // [백엔드, 프론트 API 연결]
  // - Read API
  useEffect(() => {
    console.log('첫 랜더링 완료 !!!');

    // [env 버전]
    console.log(process.env.REACT_APP_DB_HOST);

    // [app-config.js 버전]
    console.log(`${API_BASE_URL}`);
    
        
    const getTodos = async () => {
      // [env 버전]
      // let res = await axios.get(`${process.env.REACT_APP_DB_HOST}/api/todos`);

      // [app-config.js 버전]
      let res = await axios.get(`${API_BASE_URL}/api/todos`);
      
      console.log("res >>>> " , res);
      setTodoItems(res.data);
    };

    getTodos();
  }, []);

  // AddTodo 컴포넌트는 상위 컴포넌트 items에 접근 불가능.
  // 상위 컴포넌트인 App은 AddTodo에 접근 가능.
  // => App 컴포넌트에 add() 함수를 추가하고 해당 함수를 AddTodo 프로퍼티로 넘겨 AddTodo 이용.
  
  const addItem = async (newItem) => {
    // newItem.id = todoItems.length + 1; // key를 위한 id 추가
    // newItem.done = false; // done 초기화
    // // setTodoItems([...todoItems, newItem]);

    // [백엔드, 프론트 API 연결]
    // - Post API
    let res = await axios.post(`${process.env.REACT_APP_DB_HOST}/api/todo`, newItem);

    // 현재 API 호출 후 응답을 기다리지 않고 바로 상태 업데이트를 진행하면,
    // 네트워크 지연 등으로 인해 예상치 못한 문제가 발생할 수 있음.
    // 따라서 비동기 작업 처리를 제대로 해주는 것이 좋음.
    if(res.status === 200) {
      setTodoItems([...todoItems, res.data]);
    } else {
      console.error('Failed to add item');
    }

    console.log("newItem >>>>" , newItem);
  }

  // [백엔드, 프론트 API 연결]
  // - Patch API

  // update() 함수를 App.js에서 만들지 않았어도 됐음. (프론트단 한정)
  // 하지만 API 이용해 update 하려면
  // (1) Server API를 이용해 서버 데이터를 업데이트 한 후
  // (2) 변경된 내용을 화면에 다시 출력하는 두 가지 작업이 필요.

  const updateItem = async (updatedItem) => {
    console.log("updatedItem >>>> ", updatedItem);

    const res = await axios.patch(`${process.env.REACT_APP_DB_HOST}/api/todo/${updatedItem.id}`, updatedItem);

    if (res.status === 200) {
      // 수정을 성공했을 때 받을 정보등을 입력
    } else {
      console.error('Failed to update item');
    }

  };

  const deleteItem = async (targetItem) => {
    console.log("targetItem >>>> ", targetItem); // {id: 3, title: 'my todo3', done: true}

    // const newTodoItems = todoItems.filter((e) => e.id !== targetItem.id);
    // setTodoItems(newTodoItems);

    // [백엔드, 프론트 API 연결]
    // - Delete API
    const res = await axios.delete(`${process.env.REACT_APP_DB_HOST}/api/todo/${targetItem.id}`);
    
    if(res.status === 200) {
      const newTodoItems = todoItems.filter((e) => e.id !== targetItem.id);
      setTodoItems(newTodoItems);
    } else {
      console.error('Failed to delete item');
    }

  }

  return (
    <div className="App">
      <AddTodo addItem={addItem}/>
      <div className='left-todos'> {todoItems.length} Todos</div>

      {
        todoItems.length > 0 ? 
        (
          todoItems.map((item) => {
          console.log("item >>>>" , item); // {id: 1, title: 'my todo1', done: false}
          return <Todo key={item.id} item={item} deleteItem={deleteItem} updateItem={updateItem} />;
          })
        ) : (
          <p className='empty-todos'>등록된 Todo가 없어요. <br /> Todo를 추가해주세요. </p>
        )
      }
    </div>
  );
}

export default App;
