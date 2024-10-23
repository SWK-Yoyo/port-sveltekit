<script>
    import SvgBox from "$lib/SvgBox.svelte";
    import SliderHorizontal from "$lib/SliderHorizontal.svelte";
    import CardHorizontal from "$lib/CardHorizontal.svelte";
</script>

<section>
    <h1>Siwakorn Kornnanun</h1>
    <h2>Web developer</h2>
    <p class="mt-3">
        Welcome to my site!. This website is for looking my job and test my
        skill. build from css scsdflm
    </p>
</section>

<!-- work section -->
<section>
    <h3>My Work</h3>
    <SliderHorizontal>
        <SvgBox></SvgBox>
        <SvgBox></SvgBox>
        <SvgBox></SvgBox>
    </SliderHorizontal>
</section>

<!-- blog section -->
<section>
    <h3>My Blog</h3>
    <CardHorizontal
        title="Bit คืออะไร เหมือนเกม 8-bit หรือไม่"
        placeholder="ใช้เวลา 4 นาที"
        link="https://www.google.com"
        buttonText="read"
        reactions={[
            { svg: `smiley-face`, count: 20 },
            { svg: `smiley-face`, count: 15 },
            { svg: `smiley-face`, count: 19 },
        ]}
    ></CardHorizontal>
</section>

<style>
    h1,
    h2 {
        font-size: var(--h1);
        font-weight: 400;
    }
    h2 {
        font-size: var(--h2);
    }
    p {
        font-size: var(--h3);
        font-weight: 300;
    }
</style>
