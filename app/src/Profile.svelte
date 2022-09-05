<script>
    export let displayName;
    export let photoURL;
    export let uid;
</script>

<!-- COMMENT: render hello text -->
<h3>Hi { displayName }!</h3>

<!-- COMMENT: render user photo -->
<img src={ photoURL } width="100" alt="user avatar">
<!-- COMMENt: display user id -->
<p>Your userID is { uid }</p>
