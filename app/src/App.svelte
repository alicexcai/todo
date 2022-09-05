<script>
	export let name;
	// COMMENT: import the login component
	import Login from "./Login.svelte";
</script>

<!-- COMMENT: add an external stylesheet -->
<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css" />
</svelte:head>

<!-- COMMENT: delcare some styles -->
<style>
	h1 {
	  color: purple;
	}
	main {
	  margin: 20px;
	}
</style>

<main class="content">

	<!-- COMMENT: create large welcome text -->
	<h1>test</h1>
	<h1>Welcome to {name}</h1>
	<!-- COMMENT: render login component -->
	<Login />

</main>