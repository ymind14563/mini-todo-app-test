import React, { useState } from 'react'
import '../styles/AddTodo.scss'

export default function AddTodo( { addItem }) {
    const [ todoItem, setTodoItem ] = useState({
        title: '' // 초기값
    }); // 사용자 입력을 저장할 객체 (id, title, done 에 대한 정보를 저장해야하므로) - id 자동, done 기본값, title만 받음

    const onButtonClick = () => {
        addItem(todoItem); // add 함수 사용.
        setTodoItem({
            title: '' // 상태 초기화
        })
    }

    const enterKeyEventHandler = (e) => {
        if(e.key === 'Enter') {
            onButtonClick();
            // addItem(todoItem); // add 함수 사용.
            // setTodoItem({
            //     title: '' // 상태 초기화
            // })
            // 참고: 한글 마지막 글자 남는 문제 - https://buly.kr/H6g9xSc
        }
    }

  return (
    <div className='AddTodo'>
        <input 
            type="text" 
            placeholder='Add your new Todo !!'
            value={todoItem.title}  
            onChange={(e) => setTodoItem({ title: e.target.value})}
            onKeyDown={enterKeyEventHandler}
        />

        <button onClick={onButtonClick}>ADD</button>
    </div>
  )
}
