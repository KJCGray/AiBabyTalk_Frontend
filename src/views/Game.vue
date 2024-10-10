<template lang="pug">
  div(class="w-screen h-screen bg-[#FFFDD0]")
    topBar
    div(
      ref='gameContainer'
      class='flex items-center w-auto h-[91%] justify-around select-none'
    )
</template>

<script setup>
import topBar from "../components/topbar.vue";
import Phaser from "phaser";
import { onMounted, ref } from "vue";
import startScene from "@/gameScenes/startScene";
import rabbitForCarrot from "@/gameScenes/game1";

// 將 Phaser 實體綁定至此
const gameContainer = ref(null);
const game = ref(null);

onMounted(() => {
  const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scene: [startScene, rabbitForCarrot],  // 使用場景陣列
    parent: gameContainer.value,
    fps: {
      target: 60,
      forceSetTimeOut: true,
    },
  };

  game.value = new Phaser.Game(config);
});
</script>
