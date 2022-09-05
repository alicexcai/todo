// COMMENT: import necessary modules
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}

// COMMENT: define the methods that can be called
Meteor.methods({
    // COMMENT: this method inserts a new task into the database
    'tasks.insert'(text) {
        // COMMENT: check that the inputted text is a string
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        // COMMENT: insert the task into the database
        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    // COMMENT: this method removes a task from the database
    'tasks.remove'(taskId) {
        // COMMENT: check that the taskId is a string
        check(taskId, String);

        // COMMENT: find the task with the given taskId
        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        // COMMENT: remove the task from the database
        Tasks.remove(taskId);
    },
    // COMMENT: this method sets the checked property of a task to the opposite of its current value
    'tasks.setChecked'(taskId, setChecked) {
        // COMMENT: check that the taskId is a string
        check(taskId, String);
        // COMMENT: check that the setChecked is a boolean
        check(setChecked, Boolean);
        // COMMENT: find the task with the given taskId
        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }
        // COMMENT: update the task in the database
        Tasks.update(taskId, { $set: { checked: setChecked } });
    },
    // COMMENT: this method sets the private property of a task to the opposite of its current value
    'tasks.setPrivate'(taskId, setToPrivate) {
        // COMMENT: check that the taskId is a string
        check(taskId, String);
        // COMMENT: check that the setToPrivate is a boolean
        check(setToPrivate, Boolean);
        // COMMENT: find the task with the given taskId
        const task = Tasks.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== this.userId) {
            // COMMENT: throw an error if the user is not the owner
            throw new Meteor.Error('not-authorized');
        }
        // COMMENT: update the task in the database
        Tasks.update(taskId, { $set: { private: setToPrivate } });
    },
});