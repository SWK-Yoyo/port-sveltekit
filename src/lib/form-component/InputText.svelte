<script>
    export let name;
    export let placeholder;
    export let errorText;
    export let pattern;

    let error = false;

    function onError(e) {
        e.preventDefault();
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
        on:error={onError}
        on:change={onChange}
    />
</div>
