function _1(md){return(
md`# Todo App
* This app was forked from [this notebook](https://observablehq.com/@alejandrokennedy/d3-redux-and-redux-undo-todo-list).
* Some styles were changed, but most of the basic structure remains the same.
* New comments added to demonstrate understanding of the code are in the form "COMMENT: ..." to distinguish from the original author's comments.`
)}

function _2(md){return(
md`# Main Script`
)}

function _3(html,d3,store,toggleTodo,VisibilityFilters,setVisibilityFilter,addTodo,ActionCreators)
{
    // COMMENT: this creates an input field, with an undo and redo button underneath, and a div to filter the todo list, as well as one to render the todo list within
    let wrapper = html`<div class="wrapper"> 
      <div>
          <input type="text" class="text" size="10">
      </div>
      <div>
          <input type="button" class="undo" value="undo">
          <input type="button" class="redo" value="redo">
      </div>
      <div class=visibilityFilterBoxDiv></div>
      <br></br>
      <h3>Todo List</h3>
      <div class=todoList></div>
    </div>`
    
    function updateData() {
      
      // update selection
      // COMMENT: this specifies the target element as the element with class name "todoList"
      const item = d3.select('.todoList')
        // COMMENT: this selects all children with class name "item"
        .selectAll('.item')
        // COMMENT: this filters the selection to reflect the selected state of the visibility filter
        .data(store.getState().todos.present.filter(todo => {
          switch (store.getState().visibilityFilter) {
            // COMMENT: if the visibility filter is set to "SHOW_ALL", then all todos are shown
            case 'SHOW_ALL':
              return todo
            // COMMENT: if the visibility filter is set to "SHOW_COMPLETED", then only completed todos are shown
            case 'SHOW_COMPLETED':
              return todo.completed === true
            // COMMENT: if the visibility filter is set to "SHOW_ACTIVE", then only active todos are shown
            case 'SHOW_ACTIVE':
              return todo.completed === false
            default:
              console.warn('Unexpected visibilityFilter state')
              return todo
          }
        }), d => d.index)
      
      
      // update selection checkboxes
      const updateItemBox = item.select('.itemBox')
          
      // enter selection
      // COMMENT: on enter key pressed, the todo is added to the store by creating a component with a div with specific attributes and styles   
      const itemEnter = item.enter()
        .append('div')
        // COMMENT: this specifies the class name of the div
        .attr('class', d => `item ${d.text}`)
        // COMMENT: this aligns the div to the left of the page
        .style('text-align', 'left')
        // COMMENT: this makes the text monospace
        .style('font-family', 'monospace')
  
      // enter selection checkboxes + merge with update checkboxes
      // COMMENT: this adds an input element to the itemEnter component
      const itemBox = itemEnter.append('input')
        // COMMENT: this specifies the class of the input element
        .attr('class', 'itemBox')
        // COMMENT: this specifies the type of the input element
        .attr('type', 'checkbox')
        .merge(updateItemBox)
          .each(function(d){
            if (d.completed) {
              // COMMENT: this sets the checked attribute of the input element to true if the todo is completed
              d3.select(this).attr('checked', true)
            } else {
              // COMMENT: this sets the checked attribute of the input element to null if the todo is not completed
              d3.select(this).attr('checked', null)
            }
          })
          .on('click', d => {
            // COMMENT: this toggles the todo on click
            store.dispatch(toggleTodo(d.index))
            // COMMENT: this updates the data on click
            updateData()
          })
      
      // enter selection text
      // COMMENT: this adds a label element to the itemEnter component
      const itemText = itemEnter.append('label')
        // COMMENT: this specifies the class of the label element
        .attr('class', 'itemText')
        // COMMENT: this specifies the for attribute of the label element
        .attr('for', d => d.text)
        // COMMENT: this specifies the text of the label element
        .text(d => d.text)
  
      // exit selection
      const itemExit = item.exit().remove()
    }
      
    // COMMENT: this creates a visibility filter box
    const visibilityFilterBoxes = d3.select(wrapper)
      .select('.visibilityFilterBoxDiv')
      .selectAll('.visibilityFilters')
      .data(Object.values(VisibilityFilters))
      .join('div')
  
    // COMMENT: this creates a checkbox for each visibility filter
    const visibilityCheckboxes = visibilityFilterBoxes.append('input')
      .attr('class', 'visibilityCheckboxes')
      .attr('type', 'radio')
      .attr('name', 'visibilityCheckboxes')
      .attr('id', d => d)
      .attr('value', d => d)
      .on('click', d => {
        // COMMENT: this sets the visibility filter on click
        store.dispatch(setVisibilityFilter(d))
        // COMMENT: this updates the data on click
        updateData()
      })
      .each(function(d) {
        // COMMENT: this sets the checked attribute of the input element to true if the visibility filter is the same as the selected visibility filter
        if (store.getState().visibilityFilter === d) d3.select(this).attr('checked', true)
      })
    
    // COMMENT: this creates a label for each visibility filter
    const visibilityLabels = visibilityFilterBoxes.append('label')
      .attr('class', 'visibilityLabels')
      .attr('for', d => d)
      .text(d => d.charAt(0) + d.replace('_', ' ').toLowerCase().slice(1))
      .style('font-family', 'Helvetica')
  
    // COMMENT: this applies a rule to all text elements
    d3.select(wrapper).select('.text')
      // COMMENT: this executes the function on change of text elements
      .on('change', function() {
        // COMMENT: this gets the index of the last todo
        const index = store.getState().todos.present.length
        // COMMENT: this adds a todo to the store
        store.dispatch(addTodo(this.value, index))
        // COMMENT: this updates the data
        updateData()
        // COMMENT: this clears the text element
        this.value = ''
      }) 
  
    // COMMENT: this applies a rule to all undo buttons
    const undoButton = d3.select(wrapper).select('.undo')
      // COMMENT: this executes the function on click of undo buttons
      .on('click', () => {
        // COMMENT: this undoes the last action
        store.dispatch(ActionCreators.undo())
        updateData()
      })
  
    // COMMENT: this applies a rule to all redo buttons
    const redoButton = d3.select(wrapper).select('.redo')
      // COMMENT: this executes the function on click of redo buttons
      .on('click', () => {
        // COMMENT: this redoes the last action
        store.dispatch(ActionCreators.redo())
        updateData()
      })
  
    return wrapper
  }


function _4(md){return(
md`### Declare variables
COMMENT: this section declares variables`
)}

function _ADD_TODO(){return(
'ADD_TODO'
)}

function _TOGGLE_TODO(){return(
'TOGGLE_TODO'
)}

function _SET_VISIBILITY_FILTER(){return(
'SET_VISIBILITY_FILTER'
)}

function _VisibilityFilters()
{
  return {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
  }
}


function _9(md){return(
md`### Define action creators
COMMENT: this section defines the inputs of the action functions`
)}

function _addTodo(ADD_TODO){return(
function addTodo(text, index) {
    return { type: ADD_TODO, text, index }
}
)}

function _toggleTodo(TOGGLE_TODO){return(
function toggleTodo(index) {
    return { type: TOGGLE_TODO, index }
}
)}

function _setVisibilityFilter(SET_VISIBILITY_FILTER){return(
function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}
)}

function _13(md){return(
md`### Define reducers and store creation
COMMENT: this section defines the data stores and returns`
)}

function _initialState(VisibilityFilters)
{
  return {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
  }
}


function _todos(ADD_TODO,TOGGLE_TODO){return(
function todos(state = [], action) {
    switch (action.type) {
        // COMMENT: if the action is ADD_TODO, add a new todo to the state
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false,
                    index: action.index
                }
            ]
        // COMMENT: if the action is TOGGLE_TODO, toggle the completed attribute of the todo at the given index to 
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo
            })
        default:
            return state
    }
}
)}

function _undoableTodos(undoable,todos){return(
undoable(todos)
)}

function _visibilityFilter(VisibilityFilters,SET_VISIBILITY_FILTER){return(
function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}
)}

function _todoApp(initialState,visibilityFilter,undoableTodos){return(
function todoApp(state = initialState, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: undoableTodos(state.todos, action),
    }
}
)}

function _store(redux,todoApp){return(
redux.createStore(todoApp)
)}

function _20(md){return(
md`### Define required libraries
COMMENT: this section declares the required libraries`
)}

function _d3(require){return(
require('d3@5')
)}

function _redux(require){return(
require('redux@4')
)}

async function _reduxUndo(require){return(
await require('https://cdn.jsdelivr.net/npm/redux-undo@1.0.0-beta9-9-7/dist/redux-undo.js')
)}

function _24(md){return(
md`Assign Redux-Undo functions to variables`
)}

function _undoable(reduxUndo){return(
reduxUndo.default
)}

function _ActionCreators(reduxUndo){return(
reduxUndo.ActionCreators
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["html","d3","store","toggleTodo","VisibilityFilters","setVisibilityFilter","addTodo","ActionCreators"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("ADD_TODO")).define("ADD_TODO", _ADD_TODO);
  main.variable(observer("TOGGLE_TODO")).define("TOGGLE_TODO", _TOGGLE_TODO);
  main.variable(observer("SET_VISIBILITY_FILTER")).define("SET_VISIBILITY_FILTER", _SET_VISIBILITY_FILTER);
  main.variable(observer("VisibilityFilters")).define("VisibilityFilters", _VisibilityFilters);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("addTodo")).define("addTodo", ["ADD_TODO"], _addTodo);
  main.variable(observer("toggleTodo")).define("toggleTodo", ["TOGGLE_TODO"], _toggleTodo);
  main.variable(observer("setVisibilityFilter")).define("setVisibilityFilter", ["SET_VISIBILITY_FILTER"], _setVisibilityFilter);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("initialState")).define("initialState", ["VisibilityFilters"], _initialState);
  main.variable(observer("todos")).define("todos", ["ADD_TODO","TOGGLE_TODO"], _todos);
  main.variable(observer("undoableTodos")).define("undoableTodos", ["undoable","todos"], _undoableTodos);
  main.variable(observer("visibilityFilter")).define("visibilityFilter", ["VisibilityFilters","SET_VISIBILITY_FILTER"], _visibilityFilter);
  main.variable(observer("todoApp")).define("todoApp", ["initialState","visibilityFilter","undoableTodos"], _todoApp);
  main.variable(observer("store")).define("store", ["redux","todoApp"], _store);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("redux")).define("redux", ["require"], _redux);
  main.variable(observer("reduxUndo")).define("reduxUndo", ["require"], _reduxUndo);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("undoable")).define("undoable", ["reduxUndo"], _undoable);
  main.variable(observer("ActionCreators")).define("ActionCreators", ["reduxUndo"], _ActionCreators);
  return main;
}
