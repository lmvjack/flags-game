<script lang="ts">
    import { get } from 'svelte/store';
    import { onMount } from 'svelte';
    import { countriesStore, africaOptions, americaOptions, asiaOptions, europeOptions, oceaniaOptions } from '../lib/stores/countries-store';
    import  { correctUserAnswers, wrongUserAnswers }  from '../lib/stores/user-answers';

    export let category: string;
    let allCountries = get(countriesStore);
    let continetsIndex = {"Africa": 0, "America": 1, "Asia": 2, "Europe": 3, "Oceania": 4}
    let flagCode: string = "";
    let fullName: string = "";
    let unique: number = 0;


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function generateRightOption() {

        if (category === "All world") {
            let continentIndex = getRandomInt(allCountries.length);
            let continent = allCountries[continentIndex];

            let countryIndex = getRandomInt(continent.countries.length);
            let country = continent.countries[countryIndex];
            flagCode = country.code;
            fullName = country.fullName;

            //Remove asked country from country array
            continent.countries.splice(countryIndex, 1);

            //Remove continent if there are no more countries, both from full list and from continents index list
            if (!(continent.countries.length)) {
                allCountries.splice(continentIndex, 1);
                delete continetsIndex[continent.continent];
            }

            return [flagCode, fullName]
        } else {
            let continent = allCountries[continetsIndex[category]];

            let countryIndex = getRandomInt(continent.countries.length);
            let country = continent.countries[countryIndex];
            flagCode = country.code;
            fullName = country.fullName;

            continent.countries.splice(countryIndex, 1);

            return [flagCode, fullName]
        }

    }



    let optionsCategories = [get(africaOptions), get(americaOptions), get(asiaOptions), get(europeOptions), get(oceaniaOptions)];
    let optionsCache: string[] = []; //To avoid options being the same
    function generateRandomOption() {
        if (category === "All world") {
            let continent = optionsCategories[getRandomInt(optionsCategories.length)];
            let country = continent[getRandomInt(continent.length)];

            if (country != fullName && !(optionsCache.includes(country))) {
                optionsCache.push(country);

                return country;
            } else { 
                return generateRandomOption()
            }

        } else {
            let continent = optionsCategories[continetsIndex[category]];
            let country = continent[getRandomInt(continent.length)];

            if (country != fullName && !(optionsCache.includes(country))) {
                optionsCache.push(country);

                return country;
            } else { 
                return generateRandomOption()
            }
        }
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    
    let rightOption: string[] = generateRightOption();
    let shuffled: any = shuffle([rightOption[1], generateRandomOption(), generateRandomOption(), generateRandomOption()]);
    function checkAnswer(answer: string, id: string): any {

        //Make buttons unclickable to prevent user from clicking again
        for (let button of document.getElementsByClassName("option")) {
            (button as HTMLButtonElement).disabled = true;
        }

        let selectedButton = document.getElementById(id);

        //Check the answer and update CSS
        if (answer === rightOption[1]){
            selectedButton.style.background = "#00FF85";
            selectedButton.style.border = "#00FF85";
            selectedButton.style.color = "#000";

            //Insert the right answer in user right answers cache
            correctUserAnswers.update(items => [...items, rightOption[1]])

            //Remove all other wrong options
            for (let i = 0; i < 4; i++) {
                if(i.toString() != id) {
                    document.getElementById(i.toString()).remove();
                }
            }
        } else {
            selectedButton.style.background = "#FF3F0A";
            selectedButton.style.border = "#FF3F0A";

            //Insert the wrong answer in user wrong answers cache
            wrongUserAnswers.update(items => [...items, rightOption[1]])

            for (let i = 0; i < 4; i++) {

                if(i.toString() != id && document.getElementById(i.toString()).innerText === rightOption[1]) {
                    document.getElementById(i.toString()).style.background = "#00FF85";
                    document.getElementById(i.toString()).style.border = "#00FF85";
                    document.getElementById(i.toString()).style.color = "#000";
                } else if (i.toString() != id && document.getElementById(i.toString()).innerText != rightOption[1]) {
                    document.getElementById(i.toString()).remove();
            }

            } 
        }

        
        setTimeout(() => { 
            try {
                rightOption = generateRightOption();
                optionsCache = [];
                shuffled = shuffle([rightOption[1], generateRandomOption(), generateRandomOption(), generateRandomOption()]);
                unique += 1;
            } 
            catch(e) {
                document.getElementById("dialog").style.display = "flex";
            }
        }, 2000);
        
        
    }

    /* window.addEventListener("beforeunload", (event) => {
        // set a truthy value to property returnValue
        event.returnValue = true;
    }); */

    const home = () => {
        location.reload();
        window.location.href='/'
    }

</script>

{#key unique}
<div class="container">
    <img src="https://flagcdn.com/h240/{rightOption[0]}.png" style="width: 60%;" alt="Flag"/>

    <div class="options">
        {#each shuffled as country, i}
            <button id="{i.toString()}" class="option" on:click={() => checkAnswer(country, i.toString())}>{country}</button>
        {/each}
    </div>

    
</div>
{/key}

<div class="dialog" id="dialog">
    <h1 style="font-size: 2.2em;">Congratulations!</h1>
    <div style="width: 100%; margin-top: auto;">
        <img src="src/assets/earth.svg" alt="Earth" />
        <p>No more countries available for this category.</p>
        <button on:click={home}>Home</button>
    </div>
    
</div>

<style>
    .container {
        width: 100%; 
        height: 100vh; 
        color: white; 
        margin-top: 8em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6em;
    }

    .options {
        width: 100%;
        height: 100%; 
        display: flex;
        flex-direction: column;
        gap: 0.8em;
    }
    .option {
        background-color: transparent;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        border: 2px solid #FFFFFF;
        border-radius: 30px;
        /* Inside auto layout */
        flex: none;
        order: 0;
        flex-grow: 0;
    }

    .dialog {
        background-color: black;
        color: white;
        padding: 1em;
        box-sizing: border-box;
        height: 50%;
        width: 100%;
        position: absolute;
        bottom: 0;
        border-radius: 30px;
        display: none;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .dialog button {
        background-color: #181818;
        padding: 1.4em;
        box-sizing: border-box;
        width: 100%;
        border-radius: 15px;
    }
    @media (min-width: 500px) {
        .dialog {
            width: 500px;
            margin: auto;
        }
}
</style>
