<script>
    // COMMENT: import transitions from svelte
    import { fade, fly } from 'svelte/transition';
    // COMMENT: import event dispatcher creator
    import { createEventDispatcher } from 'svelte';
    // COMMENt: create event dispatcher instance
    const dispatch = createEventDispatcher();
    
    // COMMENT: define remove function to dispatch remove event
    function remove() {
		dispatch('remove', { id });
	}

    // COMMENT: define toggle function to dispatch toggle event
	function toggleStatus() {
        let newStatus = !complete;
		dispatch('toggle', {
            id,
            newStatus
        });
    }
    
    export let id; // document ID
    export let text;
    export let complete;
</script>

<!-- COMMENT: declare some styles -->
<style>
    /* COMMENT: is-complete elements are green with strikethroughs */
    .is-complete {
        text-decoration: line-through;
        color: green;
    }

    li {
        display: flex;
        font-size: 1.2em;
        font-weight: bold;
    }

    span {
        margin-right: auto;
    }
</style>

<!-- COMMENT: defines fly in and fade out transition for the list element -->
<li in:fly="{{ x: 900, duration: 500 }}" out:fade>

<!-- COMMENT: conditionally renders the text and button -->
{#if complete}
    <span class="is-complete">
        { text }
    </span>
    <!-- COMMENT: makes a checkmark button when the task is complete -->
	<button class="is-button" on:click={toggleStatus}>
		✔️
	</button>
{:else}
    <span>
        { text }
    </span>
    <!-- COMMENT: makes an x button when the task is incomplete -->
	<button class="is-button" on:click={toggleStatus}>
		❌
	</button>
{/if}
<!-- COMMENT: renders a trashcan button -->
<button class="is-button" on:click={remove}>
    🗑️
</button>

</li>