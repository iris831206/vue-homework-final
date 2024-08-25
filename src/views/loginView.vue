<template>
  <!-- login_page -->
  <form class="formControls">
    <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
    <label class="formControls_label" for="email">Email</label>
    <input v-model="signinForm.email" class="formControls_input" type="text" id="email" name="email"
      placeholder="請輸入 email" required>
    <label class="formControls_label" for="pwd">密碼</label>
    <input v-model="signinForm.password" class="formControls_input" type="password" name="pwd" id="pwd"
      placeholder="請輸入密碼" required>
    <input class="formControls_btnSubmit" type="button" value="登入" @click="signIn">
    <RouterLink to="/signup" class="formControls_btnLink">註冊帳號</RouterLink>
    <!-- <template v-if="messageError.length">
                    <span v-for="(error, index) in messageError" :key="index">{{ error }}</span>
                    </template> -->
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const api = 'https://todolist-api.hexschool.io'
const router = useRouter()

const signinForm = ref({
  email: '',
  password: ''
})
const messageSignIn = ref('')
const messageError = ref([])

const signIn = async () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  try {
    const res = await axios.post(`${api}/users/sign_in`, signinForm.value)
    // 寫入 token
    document.cookie = `myToken=${res.data.token}; expires=${tomorrow.toUTCString()}`
    messageSignIn.value = '登入成功'
    Swal.fire({
      icon: 'success',
      title: messageSignIn.value,
      showConfirmButton: false,
      timer: 1500
    })
    router.push('/todolist')
  } catch (err) {
    console.log(err)
    if (err.response.request.status === 404) {
      messageSignIn.value = '登入失敗: 此用戶不存在'
      Swal.fire({
        icon: 'error',
        title: messageSignIn.value
      })
    } else if (err.response.request.status === 400) {
      messageSignIn.value = '登入失敗: 未正確填寫欄位'
      messageError.value = err.response.data.message
      Swal.fire({
        icon: 'error',
        title: messageSignIn.value,
        text: messageError.value.join('｜') // 將陣列合併為多行字串
      })
    } else if (err.response.request.status === 401) {
      messageSignIn.value = '登入失敗: 密碼輸入錯誤'
      Swal.fire({
        icon: 'error',
        title: messageSignIn.value
      })
    } else {
      messageSignIn.value = '登入失敗: ' + err.message
      Swal.fire({
        icon: 'error',
        title: messageSignIn.value
      })
    }
  }
}
</script>
