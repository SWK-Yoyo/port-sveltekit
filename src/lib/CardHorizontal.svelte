<script>
    export let image;
    export let title;
    export let placeholder;
    export let tag;
    export let description;
    export let reactions;
    export let link;
    export let buttonText;
    import yoyo from "$lib/default/reactions/smiley-face.svg";
</script>

<div class="card-wrapper">
    <div class="card-iamge-wrapper">
        {#if image}
            <img src={image} alt="alt" />
        {:else}
            <img src="https://placehold.co/150x150.png" alt="default image" />
        {/if}
    </div>
    <div class="text-wrapper">
        <p class="title">{title ?? "default text"}</p>
        <!-- optional -->
        {#if placeholder}
            <p class="placeholder">{placeholder}</p>
        {/if}
        <!-- optional -->
        {#if tag}
            <p>{tag}</p>
        {/if}
        <!-- optional -->
        {#if description}
            <p>{description}</p>
        {/if}
        <div class="bottom-wrapper">
            <!-- optional -->
            {#if Array.isArray(reactions) && reactions.length}
                <div class="reaction-wrapper">
                    {#each reactions as reaction}
                        <div class="reaction-item">
                            <img src={yoyo} />
                            <p>{reaction.count}</p>
                        </div>
                    {/each}
                </div>
            {/if}
            <!-- optional -->
            {#if link}
                <a href={link} target="_blank">
                    <button class="btn btn-primary">
                        {buttonText ?? "default"}
                    </button>
                </a>
            {/if}
        </div>
    </div>
</div>

<style>
    .card-wrapper {
        display: flex;
        overflow: hidden;
        background-color: var(--section-color);
        box-shadow: var(--box-shadow);
        border-radius: 0.7rem;
    }
    .card-iamge-wrapper {
        display: flex;
        min-width: 30%;
    }
    .card-iamge-wrapper img {
        width: 100%;
    }
    .text-wrapper {
        padding: 1rem;
    }
    .title {
        font-weight: 700;
    }
    .placeholder {
        color: var(--secondary-color);
    }

    .bottom-wrapper {
        display: flex;
        justify-content: end;
    }
    .reaction-wrapper {
        display: flex;
    }
    .reaction-item {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
