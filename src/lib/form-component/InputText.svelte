<script>
    export let name;
    export let placeholder;
    export let errorText;
    export let pattern;
    
    let error = false;

    function onInvalid(e) {
        console.log("asd")
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
        {pattern}
        on:invalid={onInvalid}
        on:change={onChange}
    />
</div>

<style>
    div {
        width: 100%;
    }
</style>
