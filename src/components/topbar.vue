<template lang="pug">
div(class="w-full h-[8%] bg-white flex items-center border-b-2 border-black")
    div(class="flex items-center justify-center ml-1 rounded-full w-11 h-11 hover:bg-slate-200")
      img(
          :src="imgPath"
          alt="list" 
          :class="['transition-transform duration-500', onOpenSideBar ? 'rotate-180' : '']"
          class="w-10 cursor-pointer"
          @click="rotateImg"
          )
    div(class="flex items-center justify-center ml-auto mr-1 rounded-full w-11 h-11 bg-slate-200 hover:bg-slate-300")
        img(src="/child.png" alt="list" class="w-6")
</template>
<script setup>
import { ref } from "vue";

const onOpenSideBar = ref(false);
const imgPath = ref("/list.png");

function rotateImg() {
  onOpenSideBar.value = !onOpenSideBar.value;
  setTimeout(() => {
    if (onOpenSideBar.value) imgPath.value = "/list.png";
    else imgPath.value = "/closeCircle.png";
  }, 500);
}
</script>
