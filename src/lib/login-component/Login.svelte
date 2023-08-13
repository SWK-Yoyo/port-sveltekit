<script context="module">
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import CardDialog, {
        dialog,
    } from "$lib/helper-component/CardDialog.svelte";

    function hideLoginModal() {
        dialog.close();
    }
    export function showLoginModal() {
        dialog.showModal();
    }
    export let data;
</script>

<CardDialog>
    <button on:click={hideLoginModal}>close</button>
    <!-- <p class="error-message">{$page.error?.message ?? ""}</p> -->
    <form action="/login" method="post" use:enhance>
        <input type="text" name="username" required />
        <input type="text" name="password" required />
        <button>Submit</button>
    </form>
</CardDialog>
