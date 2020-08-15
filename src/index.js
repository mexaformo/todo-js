
import './styles.css';

// import { Todo } from './classes/todo.class.js';
// import { TodoList } from './classes/todo-list.class';

// Hacemos la importación centralizada
import { Todo, TodoList } from './classes'; // cuando hacemos esto trae por omisión a index.js
                                            // del directorio.
import { creatTodoHtml, crearTodoHtml }  from './js/compenentes';
                                            

export const todoList = new TodoList();

console.log( todoList.todos );

// todoList.todos.forEach(todo => {
//     crearTodoHtml(todo);
// });

// En caso de que el argumento se la función sea único, 
// puede obviarse su mención y quedar
// el llamado de la forma siguiente. Por omisión se pasa el argumento 
// al método crearTodoHtml...
todoList.todos.forEach( crearTodoHtml );

const newTodo = new Todo( 'Aprender JavaScript' );
todoList.nuevoTodo( newTodo );

console.log('todos', todoList.todos );

// Para indicar la eliminación de forma automática de la información
// en el local storage.
// setTimeout( () => {
//     localStorage.removeItem('mi-key')
// }, 1500 );


