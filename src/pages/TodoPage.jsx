import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getTodos } from '../api/todos';
import { Footer, Header, TodoCollection, TodoInput } from 'components';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const todoNums = todos.length;
  const handleAddTodo = () => {
    if (!inputValue) return;

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          title: inputValue,
          inDone: false,
          id: uuidv4(),
        },
      ];
    });

    setInputValue('');
  };
  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleToggleDone = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });
    });
  };

  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return {
          ...todo,
          isEdit: false,
        };
      });
    });
  };

  const handleSave = ({ id, title }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: title,
          };
        }
        return { ...todo };
      });
    });
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);
  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleAddTodo}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer numOfTodos={todoNums} />
    </div>
  );
};

export default TodoPage;
