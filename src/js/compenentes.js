import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias al HTML.
const divTodoList   = document.querySelector( '.todo-list' );

// Referencia a la casa de texto en donde se mete el nombre de la tarea.
const txtInput      = document.querySelector( '.new-todo' );

const btnBorrar     = document.querySelector( '.clear-completed' );

const ulFiltros     = document.querySelector( '.filters' );

const anchorFiltros = document.querySelectorAll( '.filtro' );


export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo.completado ) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked': '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="">
    </li>`;

    const div = document.createElement( 'div' );
    div.innerHTML = htmlTodo;
    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

// Para borrar todos los completados...
btnBorrar.addEventListener( 'click', () => {
    todoList.eliminarCompletados();
    for ( let i = divTodoList.children.length - 1; i >= 0; i-- ) {
        const elemento = divTodoList.children[ i ];
        if ( elemento.classList.contains('completed') ) {
            elemento.innerHTML = "";
            // o
            // divTodoList.removeChild(elemento);
        }

    }

});


// Eventos.
txtInput.addEventListener( 'keyup', ( event ) => {

    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {

        console.log( txtInput.value);
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        const elCheck = crearTodoHtml( nuevoTodo );
        
        txtInput.value = '';


    }

});

divTodoList.addEventListener('click', (event) => {

    // Se guarda una referencia al tipo de control presionado.
    const nombreElemento    = event.target.localName; // label, input, button.

    // Se guarda una referencia al <li> completo.
    const todoElemento      = event.target.parentElement.parentElement;

    // Se extrae el id del elemento.
    const todoId            = todoElemento.getAttribute('data-id');

    if ( nombreElemento.includes('input') ) { // click en el check.
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button') ) {
        todoList.eliminarTodo( todoId );
        
        //todoElemento.innerHTML = '';
        // o 
        divTodoList.removeChild(todoElemento);
    }


});

ulFiltros.addEventListener( 'click', ( event ) => {
    
    const filtro = event.target.text;

    if ( !filtro ) return;

    anchorFiltros.forEach( elem => elem.classList.removeS( 'selected' ));

    // Se pone el cuadrito sobre el texto del anchorTag.
    event.target.classList.add('selected');


    for ( const elemento of divTodoList.children ) {
        elemento.classList.remove( 'hidden' );
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {
            case 'Pendientes':
                if ( completado ) {
                    elemento.classList.add( 'hidden' );
                }
                break;

                case 'Completados':
                    if ( ! completado ) {
                        elemento.classList.add('hidden');
                    }
                    break;
    
            }

    }



} );
