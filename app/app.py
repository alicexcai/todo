# COMMENT: import the necessary modules
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

# COMMENT: instantiate the app
app = Flask(__name__)

# COMMENT: configure the app
# /// = relative path, //// = absolute path
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# COMMENT: create the Todo class with properties id, title, and complete
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    complete = db.Column(db.Boolean)

# COMMENT: define the index route
@app.route("/")
def home():
    # COMMENT: query the database for all todos
    todo_list = Todo.query.all()
    # COMMENT: render the index template with the todo_list
    return render_template("base.html", todo_list=todo_list)

# COMMENT: define the add route
@app.route("/add", methods=["POST"])
def add():
    # COMMENT: get the title from the post request
    title = request.form.get("title")
    # COMMENT: create a new todo with the title
    new_todo = Todo(title=title, complete=False)
    # COMMENT: add the new todo to the database
    db.session.add(new_todo)
    db.session.commit()
    # COMMENT: redirect the user to the home route
    return redirect(url_for("home"))

# COMMENT: define the route for updating a specific todo id
@app.route("/update/<int:todo_id>")
def update(todo_id):
    # COMMENT: query the database for the todo with the id
    todo = Todo.query.filter_by(id=todo_id).first()
    # COMMENT: update the complete property of the todo
    todo.complete = not todo.complete
    db.session.commit()
    # COMMENT: redirect the user to the home route
    return redirect(url_for("home"))

# COMMENT: define the route for deleting a specific todo id
@app.route("/delete/<int:todo_id>")
def delete(todo_id):
    # COMMENT: query the database for the todo with the id
    todo = Todo.query.filter_by(id=todo_id).first()
    # COMMENT: delete the todo from the database
    db.session.delete(todo)
    db.session.commit()
    # COMMENT: redirect the user to the home route
    return redirect(url_for("home"))

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
