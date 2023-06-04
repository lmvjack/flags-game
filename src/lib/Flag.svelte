<script lang="ts">
    export let country;
    export let unique: number;
</script>

<div class="country">
    {#if unique % 2 == 0}
        <p>{country.fullName}</p>
    {:else}
    <p>••••••••••</p>
    {/if}
    <img src="https://flagcdn.com/h240/{country.code}.png" style="width: 30%;" alt="{country.fullName} flag"/>
</div>

<style>
    .country {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    p {
        color: white;
    }

</style>