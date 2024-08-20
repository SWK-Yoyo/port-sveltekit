<script>
    import { regexToPattern } from "../form";

    export let name;
    export let placeholder;
    export let errorText = "Invalid format";
    export let pattern;
    export let value;
    export let required = false;
    export let type = "text";

    let error = false;

    function onInvalid(e) {
        e.preventDefault();
        error = true;
    }
    function onChange(e) {
        error = false;
    }

    $: console.log("pattern", pattern);
</script>

<div>
    {#if error}
        <p class="text-danger text-right">{errorText}</p>
    {/if}
    {#if type === "text"}
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
    {:else if type === "password"}
        <input
            type="password"
            {name}
            {placeholder}
            pattern={regexToPattern(pattern)}
            on:invalid={onInvalid}
            on:change={onChange}
            bind:value
            {required}
        />
    {/if}
</div>

<style>
    div {
        width: 100%;
    }
</style>
