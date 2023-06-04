<script lang="ts">
    import { Router, Link, Route, link } from "svelte-routing";
    import  { category }  from '../lib/stores/selected-category';
    import  { correctUserAnswers, wrongUserAnswers }  from '../lib/stores/user-answers';
    import Question from '../lib/Question.svelte'

    window.addEventListener('popstate', () => {
        console.log("f")
        location.reload()
    })


    let selectedCategory: string;
    category.subscribe(value => {
		selectedCategory = value;
	});

    let correctAnswers: number;
    correctUserAnswers.subscribe(value => {
		correctAnswers = value.length;
	});

    let wrongAnswers: number;
    wrongUserAnswers.subscribe(value => {
		wrongAnswers = value.length;
	});

    const home = () => {
        location.reload();
        window.location.href='/'
    }

</script>

<div class="container">

    <header>
        <div class="upper-header">
                <button on:click={home}><i class="ph-bold ph-house"></i></button>
            <h1 style="transform: translateX(10px)">Quiz</h1>
            <div class="score">
                <p class="score-correct">{correctAnswers}</p>
                <p>|</p>
                <p class="score-wrong">{wrongAnswers}</p>
            </div>
        </div>
        <div class="lower-header">
            <p>Category: {selectedCategory}</p>
        </div> 
    </header>


    <Question category={selectedCategory} />

    
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
        /* gap: 0.4em; */
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
        justify-content: center;
    }
    h1/* , h2, h3 */, p {
        margin: 0;
        color: white;
    }
    header i {
        color: #D9D9D9;
        font-size: 1.6em;
    }
    button {
        background-color: transparent;
        width: fit-content;
        padding: 0;
    }

    .score {
        display: flex;
        flex-direction: row;
        gap: 0.2em;
        font-size: 1.8em;
    }
    .score-correct {
        color: #00FF85;
    }
    .score-wrong {
        color: #FF3F0A;
    }
</style>