<template lang="pug">
div(class="w-screen h-screen bg-[#FFFDD0] flex justify-center items-center")
  div(class="w-[50%] h-[75%] bg-white rounded flex flex-col items-center justify-center")
    div(class="w-[70%] h-9 rounded flex justify-around shadow-lg mt-4")
      button(class="w-[50%] rounded-l h-full bg-[#FFA500]") 登入
      button(class="w-[50%] rounded-r hover:bg-[#ffa600d6]") 註冊
    div(class="w-[75%] h-[80%] flex flex-col justify-around items-center")
      div(class="w-full flex justify-center items-center mr-6")
        p 用戶名稱
        input(class="w-[60%] h-9 ml-4 p-1 border rounded focus:outline-none")
      div(class="w-full flex justify-center items-center")
        p 密碼
        input(class="w-[60%] h-9 ml-6 p-1 border rounded focus:outline-none")
      div(class="w-full flex justify-around items-center")
        div(class="flex items-center")
          input(type="radio" class="w-4 h-4 mr-1.5" name="identity" id="parent" checked)
          label(for="parent" class="cursor-pointer select-none") 我是家長
        div(class="flex items-center")
          input(type="radio" class="w-4 h-4 mr-1.5" name="identity" id="child")
          label(for="child" class="cursor-pointer select-none") 我是兒童
      button(class="w-[40%] h-9 bg-[#FFA500] rounded hover:bg-[#ffa600d6]") 登入
</template>