import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Footer, Header, TodoCollection, TodoInput } from 'components';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(dummyTodos);
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
      <TodoCollection todos={todos} onToggleDone={handleToggleDone} />
      <Footer />
    </div>
  );
};

export default TodoPage;
