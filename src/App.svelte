<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from './routes/Home.svelte';
  import Study from './routes/Study.svelte';
  import Quiz from './routes/Quiz.svelte';
</script>

<Router >
  <div>
    <Route path="/"><Home /></Route>
    <Route path="/study"><Study /></Route>
    <Route path="/quiz"><Quiz /></Route>
  </div>
</Router>