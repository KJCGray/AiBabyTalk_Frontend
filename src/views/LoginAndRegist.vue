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
      div(class="flex items-center justify-center w-full mr-6")
        p 用戶名稱
        input(class="w-[60%] h-9 ml-4 p-1 border rounded focus:outline-none")
      div(class="flex items-center justify-center w-full")
        p 密碼
        input(class="w-[60%] h-9 ml-6 p-1 border rounded focus:outline-none")
      div(class="flex items-center justify-around w-full")
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
        class="flex flex-col items-center justify-around w-full h-full"
        )
        p 兒童資訊
        div(class="flex items-center justify-center w-full mr-6")
          p 兒童名稱
          input(class="w-[60%] h-9 ml-4 p-1 border rounded focus:outline-none")
        div(class="flex items-center justify-center w-full")
          p 生日
          input(class="w-[60%] h-9 ml-6 p-1 border rounded focus:outline-none")
        div(class="flex items-center w-full")
          div(class="w-[20%] flex justify-center items-center ml-9")
            p 性別
          div(class="w-[60%] flex items-center justify-around")
            div(class="flex items-center")
              input(type="radio" class="w-4 h-4 mr-1.5 cursor-pointer" name="sex" id="boy" checked)
              label(for="boy" class="cursor-pointer select-none") 男生
            div(class="flex items-center")
              input(type="radio" class="w-4 h-4 mr-1.5 cursor-pointer" name="sex" id="girl")
              label(for="girl" class="cursor-pointer select-none") 女生
        div(class="flex items-center justify-center w-full")
          p 興趣
          input(class="w-[60%] h-9 ml-6 p-1 border rounded focus:outline-none")
        div(class="flex items-center justify-center w-full mr-16")
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
        class="flex flex-col items-center justify-around w-full h-full"
        )
        p 家長資訊
        div(class="flex items-center justify-center w-full mr-6")
          p 家長名稱
          input(class="w-[60%] h-9 ml-4 p-1 border rounded focus:outline-none")
        div(class="flex items-center justify-center w-full mr-8")
          div
            p 需要加強
            p 的科目
          textarea(class="w-[60%] h-16 ml-6 p-1 border rounded text-wrap focus:outline-none" placeholder="")
        div(class="flex items-center justify-center w-full")
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
const registData = ref({
  username: '',
  password: '',
  age: 25,
  gender: '',
  language: '',
  personality: '',
  interests: []
})
const loginData = ref({
  username: '',
  password: '',
})

function toggleMode (val) {
  isLogin.value = val;
  if (val) registPage.value = 1;
}

function togglePage (val) {
  registPage.value = val;
}

function onNavigate () {
  router.push('/');
}

// 註冊帳號
async function onRegist() {
  try{
    const resp = await axios.post('http://localhost:3000/api/register', registData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    if (resp.data.status !== 'success') return;
  } catch(err) {
    console.error('註冊錯誤:', err);
  }
}

// 登入
async function onLogin() {
  try{
    const resp = await axios.post('http://localhost:3000/api/login', loginDataData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    if (resp.data.status !== 'success') return;
    console.log(resp.data.message)
  } catch(err) {
    console.error('登入錯誤:', err);
  }
}
</script>