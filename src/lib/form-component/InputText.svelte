<script>
    import { regexToPattern } from "../form";

    export let name;
    export let placeholder;
    export let errorText = "Invalid format";
    export let pattern;
    export let value;
    export let required = false;

    let error = false;

    function onInvalid(e) {
        console.log(e)
        // e.preventDefault();
        error = true;
    }
    function onChange(e) {
        error = false;
    }
</script>

<div>
    {#if error}
        <p class="text-danger text-right">{errorText}</p>
    {/if}
    <input
        type="text"
        {name}
        {placeholder}
        pattern={regexToPattern(pattern)}
        on:invalid={onInvalid}
        on:change={onChange}
        bind:value
        {required}
    />
</div>

<style>
    div {
        width: 100%;
    }
</style>
