import { Todo } from "./todo.class";

export class TodoList {
    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLocalStorage();        
    }

    eliminarTodo( id ) {
        this.todos = this.todos.filter( elItem => elItem.id != id );
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) {
        for ( const todo of this.todos ) {

            // console.log( todo.id, id );

            if ( todo.id == id ) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();                
                break;
            }            
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter( elItem => !elItem.completado ); 
        this.guardarLocalStorage();               
    }

    // Guardar información en el localStorage
    guardarLocalStorage() {
        localStorage.setItem( 'todo', JSON.stringify( this.todos ) );
    }

    // Cargar información desde el localStorage al programa
    cargarLocalStorage() {
        // Se verifica la existencia del objeto.
        this.todos = ( localStorage.getItem( 'todo' ) 
                        ? JSON.parse( localStorage.getItem( 'todo' ) )
                        : [] );
        // Así...
        // this.todos = this.todos.map( obj => { Todo.fromJson( obj ) });                        

        // ... o así...
        this.todos = this.todos.map( Todo.fromJson );                        
    }
    
}