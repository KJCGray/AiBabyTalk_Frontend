<template lang="pug">
div(class="w-screen h-screen bg-[#FFFDD0] flex justify-center items-center")
  div(class="w-[50%] h-[75%] bg-white rounded-xl shadow-xl flex flex-col items-center justify-center")
    div(class="w-[70%] h-9 rounded flex justify-around shadow-lg mt-4")
      button(
        :class="['w-[50%] rounded-l h-full bg-[#FFA500]', { 'bg-white hover:bg-[#ffa600d6]': !isLogin }]"
        @click="toggleMode(true)"
        ) 登入
      button(
        :class="['w-[50%] rounded-r h-full bg-[#FFA500]', { 'bg-white hover:bg-[#ffa600d6]': isLogin }]"
        @click="toggleMode(false)"
        ) 註冊
    div(
      v-if="isLogin"
      class="w-[75%] h-[80%] flex flex-col justify-around items-center"
      )
      div(class="w-full flex justify-center items-center mr-6")
        p 用戶名稱
        input(class="w-[60%] h-9 ml-4 p-1 border rounded focus:outline-none")
      div(class="w-full flex justify-center items-center")
        p 密碼
        input(class="w-[60%] h-9 ml-6 p-1 border rounded focus:outline-none")
      div(class="w-full flex justify-around items-center")
        div(class="flex items-center")
          input(type="radio" class="w-4 h-4 mr-1.5 cursor-pointer" name="identity" id="parent" checked)
          label(for="parent" class="cursor-pointer select-none") 我是家長
        div(class="flex items-center")
          input(type="radio" class="w-4 h-4 mr-1.5 cursor-pointer" name="identity" id="child")
          label(for="child" class="cursor-pointer select-none") 我是兒童
      button(class="w-[40%] h-9 bg-[#FFA500] rounded hover:bg-[#ffa600d6]") 登入
    div(
      v-if="!isLogin"
      class="w-[75%] h-[80%] flex flex-col justify-around items-center"
      )
      div(
        v-if="registPage === 1"
        class="w-full h-full flex flex-col justify-around items-center"
        )
        p 兒童資訊
        div(class="w-full flex justify-center items-center mr-6")
          p 兒童名稱
          input(class="w-[60%] h-9 ml-4 p-1 border rounded focus:outline-none")
        div(class="w-full flex justify-center items-center")
          p 生日
          input(class="w-[60%] h-9 ml-6 p-1 border rounded focus:outline-none")
        div(class="w-full flex items-center")
          div(class="w-[20%] flex justify-center items-center ml-9")
            p 性別
          div(class="w-[60%] flex items-center justify-around")
            div(class="flex items-center")
              input(type="radio" class="w-4 h-4 mr-1.5 cursor-pointer" name="sex" id="boy" checked)
              label(for="boy" class="cursor-pointer select-none") 男生
            div(class="flex items-center")
              input(type="radio" class="w-4 h-4 mr-1.5 cursor-pointer" name="sex" id="girl")
              label(for="girl" class="cursor-pointer select-none") 女生
        div(class="w-full flex justify-center items-center")
          p 興趣
          input(class="w-[60%] h-9 ml-6 p-1 border rounded focus:outline-none")
        div(class="w-full flex justify-center items-center mr-16")
          div
            p 用形容詞敘述
            p 孩子的個性
          textarea(class="w-[60%] h-16 ml-6 p-1 border rounded text-wrap focus:outline-none" placeholder="例如:開朗大方,樂觀陽光,害羞靦腆...")
        button(
          class="w-[15%] h-9 bg-[#FFA500] rounded px-1 ml-auto hover:bg-[#ffa600d6]"
          @click="togglePage(2)"
          ) 下一頁
      div(
        v-if="registPage===2"
        class="w-full h-full flex flex-col justify-around items-center"
        )
        p 家長資訊
        div(class="w-full flex justify-center items-center mr-6")
          p 家長名稱
          input(class="w-[60%] h-9 ml-4 p-1 border rounded focus:outline-none")
        div(class="w-full flex justify-center items-center mr-8")
          div
            p 需要加強
            p 的科目
          textarea(class="w-[60%] h-16 ml-6 p-1 border rounded text-wrap focus:outline-none" placeholder="")
        div(class="flex w-full justify-center items-center")
          button(
            class="w-[15%] h-9 bg-[#FFA500] rounded px-1 hover:bg-[#ffa600d6]"
            @click="togglePage(1)"
            ) 上一頁
          button(
            class="w-[15%] h-9 bg-[#FFA500] rounded px-1 ml-auto hover:bg-[#ffa600d6]"
            @click="onNavigate()"
            ) 註冊
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLogin = ref(true);
const registPage = ref(1);
// eslint-disable-next-line no-unused-vars
function toggleMode (val) {
  isLogin.value = val;
  if (val) registPage.value = 1;
}

// eslint-disable-next-line no-unused-vars
function togglePage (val) {
  registPage.value = val;
}

// eslint-disable-next-line no-unused-vars
function onNavigate () {
  router.push('/');
}
</script>