const { Todo } = require('../models'); // ../models/index에서 index는 생략가능함
const { Op } = require('sequelize');

// show all todos (READ)
exports.readTodos = async (_, res) => { // '_' 는 쓰지 않는 인자를 뜻함
    try {
        let todos = await Todo.findAll();
        res.send(todos);
    } catch(error) {
        res.send(error);
    }
};

// create a new todo (CREATE)
exports.createTodo = async (req, res) => {
    console.log('req.body >>>>', req.body);

    try {
        let newTodo = await Todo.create({
            title: req.body.title,
            done: false
            // todoItem 추가 시 false가 기본 값
        });

        console.log('newTodo >>>>> ', newTodo);

        res.send(newTodo);

    } catch (error) {
        res.send(error);
    }
};

// edit a specific todo (UPDATE)
exports.updateTodo = async (req, res) => {
    console.log('req.body >>>>', req.body);

    try {
        // 배열 구조 분해
        // update() - 업데이트 된 행(row)의 수를 나타내는 값을 반환.
        // 그 반환 값은 배열 형태로 제공.
        // 배열 구조 분해 할당을 통해 배열의 첫 번째 요소를 변수에 할당할 수 있음.
        // [isUpdated] = [ 0 ] or [ 1 ]
        let [isUpdated] = await Todo.update(
            {
                title: req.body.title, // 요청 본문에서 'title' 값을 가져와서 업데이트
                done: req.body.done // 요청 본문에서 'done' 값을 가져와서 업데이트
            },
            {
                where: {
                    id: { [Op.eq]: req.params.todoId } // 경로 파라미터에서 'todoId'를 사용하여 특정 Todo 항목을 찾음
                    // Op.eq는 Sequelize의 연산자로, "equals"(같음) 라는 뜻.
                }   
            }
        )
        console.log("isUpdated >>>", isUpdated);
        // 수정 실패
        if(isUpdated === 0) { 
            // 업데이트 된 항목이 없으면 'false'를 반환
            return res.send(false);

        }
        // 수정 성공
        res.send(true);
        // 업데이트가 성공적으로 이루어지면 'true'를 반환.

    } catch (error) {
        res.send(error);
    }
};

// remove a specific todo (DELETE)
exports.deleteTodo = async (req, res) => {
    try {
        let isDeleted = await Todo.destroy({
            where: {
                id: { [Op.eq]: req.params.todoId }
            }
        });
        
        // 삭제 실패
        if (!isDeleted) {
            return res.send(false);
        }
        // 삭제 성공
        res.send(true);

    } catch (error) {
        res.send(error);
    }
}