// COMMENT: this imports material dart as a package
import 'package:flutter/material.dart';

// COMMENT: this defines the Todo class
class Todo {
  Todo({required this.name, required this.checked});
  // COMMENT: this defines the name attribute
  final String name;
  // COMMENT: this defines the checked attribute
  bool checked;
}

// COMMENT: this defines the TodoItem class
class TodoItem extends StatelessWidget {
  TodoItem({
    // COMMENT: this requires a todo object as an attribute
    required this.todo,
    // COMMENT: this requires a change function as an attribute
    required this.onTodoChanged,
  }) : super(key: ObjectKey(todo));

  final Todo todo;
  final onTodoChanged;

  // COMMENT: this returns a strikthrough style if the todo is checked
  TextStyle? _getTextStyle(bool checked) {
    if (!checked) return null;

    return TextStyle(
      color: Colors.black54,
      decoration: TextDecoration.lineThrough,
    );
  }

  // COMMENT: this defines the rendering of the todo widget
  @override
  Widget build(BuildContext context) {
    // COMMENT: this renders a list tile 
    return ListTile(
      // COMMENT: this specifies the function called on tap
      onTap: () {
        onTodoChanged(todo);
      },
      // COMMENT: this renders a circle avatar with the first letter of the todo
      leading: CircleAvatar(
        child: Text(todo.name[0]),
      ),
      // COMMENT: this renders the todo name with the current style based on the todo checked status
      title: Text(todo.name, style: _getTextStyle(todo.checked)),
    );
  }
}

// COMMENT: this defines the TodoList class
class TodoList extends StatefulWidget {
  @override
  _TodoListState createState() => new _TodoListState();
}

// COMMENT: this constructs the TodoListState as a child of the TodoList class
class _TodoListState extends State<TodoList> {
  // COMMENT: this defines the _textFieldController attribute as an empty text field controller
  final TextEditingController _textFieldController = TextEditingController();
  // COMMENT: this defines the _todos attribute as an empty list of todos
  final List<Todo> _todos = <Todo>[];

  // COMMENT: this defines the rendering of the TodoList widget
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      // COMMENT: this renders the app bar at the top of the screen
      appBar: new AppBar(
        title: new Text('Todo list'),
      ),
      // COMMENT:t his renders the body of the app 
      body: ListView(
        // COMMENT: this adds some padding to the list view
        padding: EdgeInsets.symmetric(vertical: 8.0),
        // COMMENT: this renders the list of todos
        children: _todos.map((Todo todo) {
          return TodoItem(
            todo: todo,
            onTodoChanged: _handleTodoChange,
          );
        }).toList(),
      ),
      // COMMENT: this renders the floating add button at the bottom of the screen
      floatingActionButton: FloatingActionButton(
          onPressed: () => _displayDialog(),
          tooltip: 'Add Item',
          child: Icon(Icons.add)),
    );
  }

  // COMMENT: this defines the function called when a todo is changed
  void _handleTodoChange(Todo todo) {
    // COMMENT: this sets the todo checked status to the opposite of its current status
    setState(() {
      todo.checked = !todo.checked;
    });
  }

  // COMMENT: this defines the function called to add a todo
  void _addTodoItem(String name) {
    // COMMENT: this adds a todo to the list of todos
    setState(() {
      _todos.add(Todo(name: name, checked: false));
    });
    // COMMENT: this clears the text field controller
    _textFieldController.clear();
  }

  // COMMENT: this defines the function called to display the dialog
  Future<void> _displayDialog() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        // COMMENT: this defines the dialog to show
        return AlertDialog(
          // COMMENT: this defines teh text on the dialog
          title: const Text('Add a new todo item'),
          // COMMENT: this defines the tedxt input field
          content: TextField(
            // COMMENT: this defines the input controller
            controller: _textFieldController,
            // COMMENT: this defines the placeholder
            decoration: const InputDecoration(hintText: 'Type your new todo'),
          ),
          actions: <Widget>[
            // COMMENT: this creates an add button
            TextButton(
              child: const Text('Add'),
              onPressed: () {
                // COMMENT: this removes the dialog
                Navigator.of(context).pop();
                // COMMENT: this adds the todo
                _addTodoItem(_textFieldController.text);
              },
            ),
          ],
        );
      },
    );
  }
}

// COMMENT: this defines the main function
class TodoApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // COMMENT: this returns the TodoList widget
    return new MaterialApp(
      // COMMENT: this sets the title of the app
      title: 'Todo list',
      // COMMENT: this renders a new TodoList object as the home page
      home: new TodoList(),
    );
  }
}

void main() => runApp(new TodoApp());
