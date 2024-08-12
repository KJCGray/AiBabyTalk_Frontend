<template lang="pug">
div#app
LoginAndRegist
  router-view
</template>

<script>
import LoginAndRegist from './views/LoginAndRegist.vue'
export default {
    components: {LoginAndRegist}
}
</script>