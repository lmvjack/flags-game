<script lang="ts">
    import { Router, Link, Route, link } from "svelte-routing";
    import { get } from 'svelte/store';
    import { countriesStore } from '../lib/stores/countries-store';
    import Flag from '../lib/Flag.svelte';

    let allCountries = get(countriesStore);
    let unique = 0;

    const hide = () => {
        unique += 1;
        if (unique % 2) {
            document.getElementById("eye").className = "ph-bold ph-eye-closed";
        } else {
            document.getElementById("eye").className = "ph-bold ph-eye"
        }
    }

    const showSettings = () => {
        document.getElementById("settings").style.display = "block";
    }

    const closeSettings = () => {
        document.getElementById("settings").style.display = "none";
    }
</script>

<div class="container">

    <header>
        <div class="upper-header">
            <Router>
                <a href="/" use:link><i class="ph-bold ph-house"></i></a>
            </Router>
            <h1>Study</h1>
            <button on:click={showSettings}><i class="ph-bold ph-faders"></i></button>
        </div>
        <div class="lower-header">
            <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 0.4em;">
                <h2>Country</h2>
                <button on:click={hide} style="transform: translateY(3px);"><i class="ph-bold ph-eye" id="eye" style="font-size: 1.4em; text-align: center;"></i></button>
            </div>
            <h2>Flag</h2>
        </div>

            
    </header>
    <div class="countries-container">
        {#each allCountries as continent}
            <h2 id="{continent.continent}">{continent.continent}</h2>
            {#each continent.countries as country}
                <Flag country={country} unique={unique} />
            {/each}
        {/each}
    </div>

    <div class="settings" id="settings">
        <div class="settings-header">
            <button on:click={closeSettings}><i class="ph-bold ph-x"></i></button>
        </div>
        <div class="settings-lower">
            {#each allCountries as continent}
                <a href="#{continent.continent}"><h3>{continent.continent}</h3></a>
            {/each}
        </div>
        
    </div>

</div>



<style>
    .container {
        width: 100%;
        min-height: 100vh; 
        display: flex; 
        flex-direction: column; 
        overflow: hidden; 
        align-items: center;
        overflow: clip;
        overflow-clip-margin: 20px;
    }

    header {
        background-color: #181818;
        width: 100%;
        max-width: 500px;
        padding: 1em 1em 0.4em 1em;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }
    .upper-header {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
    }
    .lower-header {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
    }
    h1, h2, h3 {
        margin: 0;
        color: white;
    }
    header i {
        color: #D9D9D9;
        font-size: 1.6em;
    }
    button {
        background-color: transparent;
        padding: 0;
    }

    .countries-container {
        display: flex;
        justify-content: center;
        align-items: left;
        flex-direction: column;
        gap: 2em;
        margin-top: 8em;
    }

    .settings {
        background-color: #5D5D5D;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 35vh;
        max-width: 500px;
        border-radius: 30px 30px 0 0;
        padding: 1.8em;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 2em;
        display: none;
    }
    .settings-header {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .settings-header i {
        color: #D9D9D9;
        font-size: 1.4em;
    }
    .settings-lower {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6em;
    }
    
</style>