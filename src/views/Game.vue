<template lang="pug">
div(
    ref='gameContainer'
    class='flex items-center justify-around w-screen h-screen select-none'
  )
</template>

<script setup>
import topBar from "../components/topbar.vue";
import Phaser from "phaser";
import { onMounted, ref, onBeforeUnmount } from "vue";
import startScene from "@/gameScenes/startScene";
import rabbitForCarrot from "@/gameScenes/game1";
import farm from "@/gameScenes/farm";
import vegetableSelect from "@/gameScenes/littleGame/vegetableSelect";
import balloonColor from "@/gameScenes/littleGame/balloonColor";
import findHouse from "@/gameScenes/littleGame/findHouse";
import whosSound from "@/gameScenes/littleGame/whosSound";
import howManyFruits from "@/gameScenes/littleGame/howManyFruits";
import fruitGuessGame from "@/gameScenes/littleGame/fruitGuessGame";
import shapeMemory from "@/gameScenes/littleGame/shapeMemory";

// 將 Phaser 實體綁定至此
const gameContainer = ref(null);
const game = ref(null);

const resizeGame = () => {
  if (game.value) {
    game.value.scale.resize(window.innerWidth, window.innerHeight);
  }
};

onMounted(() => {
  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth, // 動態寬度
    height: window.innerHeight, // 動態高度
    scene: [startScene, farm, rabbitForCarrot, vegetableSelect, balloonColor, findHouse, whosSound, howManyFruits, fruitGuessGame, shapeMemory],
    parent: gameContainer.value,
    fps: {
      target: 60,
      forceSetTimeOut: true,
    },
    scale: {
      mode: Phaser.Scale.RESIZE, // 自動調整尺寸模式
      autoCenter: Phaser.Scale.CENTER_BOTH, // 居中
    },
  };

  game.value = new Phaser.Game(config);

  window.addEventListener("resize", resizeGame); // 監聽螢幕變化
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeGame);
});
</script>
