import React, { useCallback, useState } from 'react'
import '../styles/Todo.scss'

export default function Todo({ item, deleteItem, updateItem }) {
    console.log('item >>>>', item); // {id: 1, title: 'my todo1', done: false}

    const [ todoItem, setTodoItem ] = useState(item);
    const [ readOnly, setReadOnly ] = useState(true);

    const onDeleteButtonClick = useCallback(() => {
        deleteItem(todoItem);
    }, [deleteItem]);

    // title 클릭 시 실행될 함수 : readOnly를 false로 변경
    const offReadOnlyMode = useCallback(() => {
        setReadOnly(false);
    }, []);

    // readOnly true: enter키 누르면 readOnly를 true로 변경
    const enterKeyEventHandler = (e) => {
        if(e.key === 'Enter') {
            setReadOnly(true);
            
            updateItem(todoItem); // [백엔드, 프론트 API 연결] 수정 1 - 엔터 누르면 저장
        }
    }

    // 커서가 깜박인다고 수정 가능한 것은 아님.
    // 사용자가 키보드 입력할 때마다 item 새 값으로 변경.
    const editEventHandler = (e) => {
        // rest: id, done 정보
        const { title, ...rest } = todoItem;
        // setTodoItem({
        //     title: e.target.value,
        //     ...rest
        // });
        const updatedItem = {
            title: e.target.value,
            ...rest
        }
        setTodoItem(updatedItem);
        updateItem(updatedItem);
    }

    // checkbox 업데이트
    const checkboxEventHandler = (e) => {
        // rest: id, title 
        const { done, ...rest } = todoItem;
        const updatedItem = {
            done: e.target.checked,
            ...rest
        }
        setTodoItem(updatedItem);
        updateItem(updatedItem); // [백엔드, 프론트 API 연결] 수정 2 - 체크 박스 변경 시 저장
    }

  return (
    <div className='Todo'>
        <input 
            type='checkbox'
            id={`todo${todoItem.id}`} 
            name={`todo${todoItem.id}`} 
            value={`todo${todoItem.id}`} 
            defaultChecked={todoItem.done} // true = checked, false = unchecked
            onChange={checkboxEventHandler}
        />
        {/* <label htmlFor="todo0">{item.title}</label> */}
        <input 
            type="text" 
            value={todoItem.title} 
            readOnly={readOnly} 
            onClick={offReadOnlyMode}
            onChange={editEventHandler}
            onKeyDown={enterKeyEventHandler}
        />
        <button onClick={onDeleteButtonClick}>DELETE</button>
    </div>
  );
}
