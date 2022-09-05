<script>
    // COMMENT: import the necessary modules
    import Profile from './Profile.svelte';
    import Todos from './Todos.svelte';
    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    // COMMENT: define login function to log in with Google
    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<!-- COMMENT: declare some styles -->
<style>
    section {
        background: rgb(235, 235, 235);
        padding: 20px;
    }
</style>

<section>
<!-- COMMENT: conditional renders -->
{#if user}
    <!-- COMMENT: render a profile component -->
    <Profile {...user} />
    <!-- COMMENT: render a logout button -->
    <button on:click={ () => auth.signOut() } class="button">Logout</button>
    <hr>
    <!-- COMMENT: render the Todos component -->
    <Todos uid={user.uid} />
{:else}
    <!-- COMMENT: if no user, render login button -->
	<button on:click={login} class="button">
		Signin with Google
	</button>
{/if}
</section>