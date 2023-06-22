<script>
    import './style.css'
    import Swal from "sweetalert2";
    import { fly } from "svelte/transition";
    let passwordType = true;
    let params = {
        username: "",
        password: "",
    };
    let validate = {
        user: new RegExp(/^[a-zA-Z0-9!@#$%^&._-]{4,20}$/),
    };
    async function onSubmit(e) {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(params),
        });
        const res = await response.json();
        if (!res.status) {
            const status = await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: res.message,
            });
        }
        localStorage.setItem("token", res.data.token);
    }
</script>

<section>
    <h1>Login</h1>
    <form on:submit|preventDefault={onSubmit}>
        <div class="form-wrapper">
            <label for="username">Username</label>
            {#if params.username.length && !validate.user.test(params.username)}
                <p class="text-red" transition:fly={{ y: 20, duration: 400 }}>
                    Please enter your username with a-z, A-Z, 0-9, !,@, #, $, %,
                    ^, &, ., _, -
                </p>
            {/if}
            <input
                type="text"
                name="username"
                bind:value={params.username}
                id="username"
            />
        </div>
        <div class="form-wrapper">
            <label for="password">Password</label>
            {#if params.password.length && !validate.user.test(params.password)}
                <p class="text-red" transition:fly={{ y: 20, duration: 400 }}>
                    Please enter your password with a-z, A-Z, 0-9, !,@, #, $, %,
                    ^, &, ., _, -
                </p>
            {/if}
            <input
                type="password"
                name="password"
                bind:value={params.password}
                id="password"
            />
            <button
                type="button"
                on:click={() => (passwordType = !passwordType)}
                >{passwordType ? "show password" : "hide password"}</button
            >
        </div>
        <button>Login</button>
    </form>
</section>

<style>
</style>
