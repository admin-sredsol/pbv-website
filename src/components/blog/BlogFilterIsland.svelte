<script lang="ts">
    import { getBackgroundColor, getTextColor } from "../../utils/styleUtils";
    export let posts = [];
    export let background: "base" | "light" | "dark" = "light";

    let tag = "";
    let year = "";
    let featured = false;
    let search = "";

    $: cardBg = getBackgroundColor(background);
    $: cardText = getTextColor(background);

    $: allTags = Array.from(
        new Set(posts.flatMap((post) => post.tags || [])),
    ).sort();
    $: allYears = Array.from(
        new Set(posts.map((post) => new Date(post.pubDate).getFullYear())),
    ).sort((a, b) => b - a);

    $: filtered = posts.filter(
        (post) =>
            (!tag || (post.tags || []).includes(tag)) &&
            (!year || new Date(post.pubDate).getFullYear() == year) &&
            (!featured || post.featured) &&
            (!search ||
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.description.toLowerCase().includes(search.toLowerCase()) ||
                (post.tags || []).some((t) =>
                    t.toLowerCase().includes(search.toLowerCase()),
                )),
    );
</script>

<div class="flex flex-wrap gap-2 items-center mb-8">
    <button
        on:click={() => (tag = "")}
        class={`px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-primary hover:text-white transition${!tag ? " selected" : ""}`}
    >
        All
    </button>
    {#each allTags as t}
        <button
            on:click={() => (tag = t)}
            class={`px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-primary hover:text-white transition${tag === t ? " selected" : ""}`}
        >
            {t}
        </button>
    {/each}
    <button
        on:click={() => (featured = !featured)}
        class={`px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-primary hover:text-white transition${featured ? " selected" : ""}`}
    >
        Featured
    </button>
    <select
        bind:value={year}
        class="ml-4 px-2 py-1 rounded border border-gray-300 text-sm"
    >
        <option value="">All Years</option>
        {#each allYears as y}
            <option value={y}>{y}</option>
        {/each}
    </select>
    <input
        type="search"
        bind:value={search}
        placeholder="Search..."
        class="ml-4 px-3 py-1 rounded border border-gray-300 text-sm"
    />
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
    {#each filtered as post}
        <a
            href={"/blog/" + post.slug}
            class={`group block rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200 overflow-hidden border border-gray-100 hover:border-primary ${cardBg} ${cardText}`}
        >
            {#if post.cover}
                <img
                    src={post.cover}
                    alt={post.title}
                    class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                />
            {/if}
            <div class="p-6 flex flex-col h-full">
                <span
                    class="mb-2 uppercase text-xs font-semibold tracking-wider text-primary"
                    >{post.tags?.[0] || "News"}</span
                >
                <h2
                    class="text-xl font-bold mb-2 group-hover:text-primary transition-colors"
                >
                    {post.title}
                </h2>
                <p class="mb-3 flex-1">{post.description}</p>
                <div class="flex items-center text-xs text-gray-400 mb-2">
                    <span>{new Date(post.pubDate).toLocaleDateString()}</span>
                    {#if post.author}
                        <span class="ml-2">by {post.author}</span>
                    {/if}
                </div>
                {#if post.tags?.length}
                    <div class="flex flex-wrap gap-2 mb-2">
                        {#each post.tags as tag}
                            <span
                                class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                                >{tag}</span
                            >
                        {/each}
                    </div>
                {/if}
                <span
                    class="inline-block mt-auto text-primary font-semibold group-hover:underline"
                    >Read More →</span
                >
            </div>
        </a>
    {/each}
</div>

<style>
    button.selected {
        background: var(--color-primary, #2563eb);
        color: white;
    }
</style>
