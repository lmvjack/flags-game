<script lang="ts">
    import { Router, Link, Route } from "svelte-routing";
    import  { category }  from '../lib/stores/selected-category';
    import  { correctUserAnswers, wrongUserAnswers }  from '../lib/stores/user-answers';
    import Study from './Study.svelte';
    import Quiz from './Quiz.svelte';

    //Reset quiz answers cache to prevent keeping the score in next sessions
    correctUserAnswers.update(items => []);
    wrongUserAnswers.update(items => []);


    export let url = "";
    let categories = ["All world", "Africa", "America", "Asia", "Europe", "Oceania"]
    let selectedCategory: string;

	category.subscribe(value => {
		selectedCategory = value;
	});

    function selectCategory(selectedCategory: string) {
		category.update(n => selectedCategory);
	}

    let visible = false;
    function toggleSelection() {
        visible = !visible
    }

</script>

<div class="container">

    <header>
        <div class="top-header">
            <h1>Flags quiz</h1>
            <i class="ph-bold ph-info"></i>
        </div>
        <p>Explore and study the flags or test your knowledge with a quiz!</p>
    </header>



    <Router {url}>
        <Link to="/study" style="width: 100%;">
            <div class="study-card">
                <div class="text">
                    <h3>Study</h3>
                    <p>Explore and study flags from all over the world! -></p>
                </div>
                <img style="width: 7em; transform:translate(10%,-15%);" src="src/assets/earth.svg" alt="Earth" />
            </div>
        </Link>
        
        <div>
        <Route path="/study" component={Study} />
        </div>
    </Router>

    <div style="margin-top: 2em; width: 100%; height: 22em; background-image: url(src/assets/flags-background.png); background-size: 100%;"></div>
    <!-- <img style="width: 100%; margin-top: 2em;" src="src/assets/flags-background.png" alt="Flags background" /> -->

    <div class="buttons">
        <button class="select-category" on:click={toggleSelection}>
            Category: {selectedCategory}
        </button>

        {#if visible}
            <div id="select-category-activated" class="select-category-activated">
                {#each categories as category}
                    <button style="padding: 0; background-color: transparent;" on:click={() => selectCategory(category)} on:click={toggleSelection}>{category}</button>
                {/each}
            </div>
        {/if}

        <Router {url}>
            <Link to="/quiz">
                <button class="start-quiz">
                    Start quiz
                </button>
            </Link>

            <div>
                <Route path="/quiz" component={Quiz} />
            </div>
        </Router>
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
        width: 100%;
        margin-top: 1em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;
        gap: 1em;
    }
    .top-header {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        justify-content: space-between;
    }
    .top-header h1 {
        color: #FFFFFF;
        margin: 0;
        font-size: 2.4em;
        font-weight: 700;
    }
    .top-header i {
        color: #D9D9D9;
        font-size: 1.4em;
    }
    header p {
        margin: 0;
        color: #D9D9D9;
        text-align: left;
        font-weight: 400;
    }

    .study-card {
        width: 100%;
        background-color: #5D5D5D;
        color: white;
        margin-top: 2em;
        border-radius: 1em;
        height: 7em;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        overflow: hidden;
    }
    .text {
        padding: 1.4em;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }
    .text h3 {
        margin: 0;
        font-weight: 700;
    }
    .text p {
        margin: 0;
        text-align: left;
        font-size: 1em;
        font-weight: 400;
    }

    .buttons {
        margin: auto 0 1em 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.4em;
    }
    .select-category {
        background-color: #5D5D5D;
        width: 100%;
        height: fit-content;
        padding: 0.8em;
    } .select-category-activated {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
    .start-quiz {
        background-color: #2C5AC8;
        width: 100%;
        height: fit-content;
        padding: 1.2em;
    }
</style>
