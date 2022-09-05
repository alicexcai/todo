<script>
  // COMMENT: import the necessary modules
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';  
  import { BlazeTemplate } from 'meteor/svelte:blaze-integration';
  import Task from './Task.svelte';
  import { Tasks } from '../api/tasks.js'

  let newTask = "";
  let hideCompleted = false;
  let tasks;
  let currentUser;
  
  // COMMENT: subscribe to the tasks collection
  onMount(async () => {
    Meteor.subscribe('tasks');
  });

  // COMMENT: find the number of incomplete tasks
  $: incompleteCount = useTracker(() => Tasks.find({ checked: { $ne: true } }).count()); 

  // COMMENT: find the current user
  $: currentUser = useTracker(() => Meteor.user());

  // COMMENT: find the tasks and filter as needed
  const taskStore = Tasks.find({}, { sort: { createdAt: -1 } });
  $: {
      tasks = $taskStore;
      if (hideCompleted) {
          tasks = tasks.filter(task => !task.checked);
      }
  };

 // COMMENT: insert a new task on submit
 function handleSubmit(event) {
      Meteor.call("tasks.insert", newTask);

      // Clear form
      newTask = "";
  };

</script>
 
<div class="container">
  <header>
    <!-- COMMENT: Large text indicating number of leftover todos -->
    <h1>Todo List ({ $incompleteCount })</h1>
    <label className="hide-completed">
      <!-- COMMENT: checkbox to toggle hide-completed -->
      <input
        type="checkbox"
        bind:checked={hideCompleted}
      />
      Hide Completed Tasks
    </label>
    
    <!-- COMMENT: display login buttons -->
    <BlazeTemplate template="loginButtons" />

    <!-- COMMENT: conditional render if user is logged in -->
    {#if $currentUser}
    <!-- COMMENT: new task form -->
    <form class="new-task" on:submit|preventDefault={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        bind:value={newTask}
      />
    </form>
    {/if}
  </header>
  <!-- COMMENT: loop through tasks and render each -->
  <ul>
  {#each tasks as task}
    <Task
      key={task._id}
      task={task}
    />
  {/each}
  </ul>
</div>

