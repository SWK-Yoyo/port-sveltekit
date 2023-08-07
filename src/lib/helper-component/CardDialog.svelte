<script context="module">
    export let dialog;
</script>

<dialog bind:this={dialog}>
    <slot />
</dialog>

<style>
    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.25);
    }
</style>
