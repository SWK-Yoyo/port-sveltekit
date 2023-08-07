<script context="module">
    import CardDialog, {
        dialog,
    } from "$lib/helper-component/CardDialog.svelte";

    function hideLoginModal() {
        dialog.close();
    }
    export function showLoginModal() {
        dialog.showModal();
    }
</script>

<CardDialog>
    <button on:click={hideLoginModal}>close</button>
    <form action="" method="post">
        <input type="text" name="username" />
        <input type="text" name="password" />
        <button>Submit</button>
    </form>
</CardDialog>
