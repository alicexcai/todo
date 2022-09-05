<script>
  // COMMENT: import the necessary modules
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';  
  import { Tasks } from "../api/tasks.js";

  export let key;
  export let task;
  let showPrivateButton;

  // COMMENT: find the current user
  $: currentUser = useTracker(() => Meteor.user());

  // COMMENT: allow the task owner to toggle the privacy of the task
  $: {
    showPrivateButton = false;
    if($currentUser){
      showPrivateButton = task.owner === $currentUser._id;
    }
  }

  // COMMENT: toggle the checked state of the task
  function toggleChecked() {
      // Set the checked property to the opposite of its current value
      Meteor.call("tasks.setChecked", task._id, !task.checked);
  };

  // COMMENT: delete the task
  function deleteThisTask() {
      Meteor.call("tasks.remove", task._id);
  };

  // COMMENT: toggle the private state of the task
  function togglePrivate() {
    Meteor.call("tasks.setPrivate", task._id, !task.private);
  }
  
</script>

<li class:checked="{task.checked}"
    class:private="{task.private}" >
    <!-- COMMENT: delete button -->
  <button class="delete" on:click={deleteThisTask}>
    &times;
  </button>

  <!-- COMMENT: checkbox -->
  <input
    type="checkbox"
    readonly
    checked={!!task.checked}    
    on:click={toggleChecked}
  />

  <!-- COMMENT: conditional render if appropriate to show private button -->
  {#if showPrivateButton}
    <!-- COMMENT: toggle private button -->
    <button className="toggle-private" on:click="{togglePrivate}">
      { task.private ? "Private" : "Public" }
    </button>
  {/if}

  <!-- COMMENT: display task powner and text -->
  <span class="text">
    <strong>{ task.username }</strong>
    : { task.text }
  </span>
</li>
