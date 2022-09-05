<script>
    // COMMENT: import necessary modules
    import TodoItem from './TodoItem.svelte';
    import { db } from './firebase';
    import { collectionData } from 'rxfire/firestore';
    import { map, startWith } from 'rxjs/operators';
import { pipe } from 'rxjs';

    // COMMENT: declare input variable
    export let uid;

    let text = 'enter task';

    // COMMENT: get todos from the database
    const query = db.collection('todos').where('uid', '==', uid).orderBy('created');
    // NEW CODE: original code broken, fixed by specifying idField
    const todos = collectionData(query, {idField: 'id'}).pipe(startWith([]));

    // COMMENT: define add function to add a todo to the database
    function add() {
        db.collection('todos').add({ uid, text, complete: false, created: Date.now() });
        text = '';
    }

    // COMMENT: define the updateStatus function to update the status of a todo
    function updateStatus(event) {
        const { id, newStatus } = event.detail;
        db.collection('todos').doc(id).update({ complete: newStatus });
    }

    // COMMENT: define the remove function to remove a todo from the database
    function removeItem(event) {
        const { id } = event.detail;
        db.collection('todos').doc(id).delete();
    }
</script>

<!-- COMMENT: declare some input styles -->
<style>
    input { display: block }
</style>

<!-- COMMENT: render an unordered list -->
<ul>
    <!-- COMMENT: match each todo onto a TodoItem component -->
	{#each $todos as todo}

        <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
        
	{/each}
</ul>

<input bind:value={text}>

<hr>

<!-- COMMENT: render the task text -->
<p>Your task: <strong>{ text }</strong></p>

<!-- COMMENT: render an add task button -->
<button class="button is-info" on:click={add}>Add Task</button>