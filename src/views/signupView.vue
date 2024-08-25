<template>
  <!-- sign up -->
  <Form class="formControls" @submit="signUp" :validation-schema="schema" v-slot="{ errors }">
                    <h2 class="formControls_txt">註冊帳號</h2>
                    <label class="formControls_label" for="email">Email</label>
                    <Field v-model="signupForm.email" class="formControls_input" type="text" id="email" name="email"
                        placeholder="請輸入 email" required />
                        <span>{{ errors.email }}</span>
                    <label class="formControls_label" for="name">您的暱稱</label>
                    <Field v-model="signupForm.nickname" class="formControls_input" type="text" name="nickname" id="nickname"
                        placeholder="請輸入您的暱稱" />
                        <span>{{ errors.nickname ? '暱稱為必填' : '' }}</span>
                        <label class="formControls_label" for="pwd">密碼</label>
                    <Field v-model="signupForm.password" class="formControls_input" type="password" name="password" id="password"
                        placeholder="請輸入密碼" required />
                        <span>{{ errors.password }}</span>
                    <label class="formControls_label" for="pwd">再次輸入密碼</label>
                    <Field v-model="signupForm.confirmPassword" class="formControls_input" type="password" name="confirmPassword" id="confirmPassword"
                        placeholder="請再次輸入密碼" required />
                        <span>{{ errors.confirmPassword ? '您的密碼未相符' : '' }}</span>
                    <input class="formControls_btnSubmit" type="submit" value="註冊帳號">
                    <RouterLink to="/" class="formControls_btnLink">登入</RouterLink>
                </Form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Form, Field } from 'vee-validate'
import { useRouter } from 'vue-router'

const api = 'https://todolist-api.hexschool.io'
const router = useRouter()

const signupForm = ref({
  email: '',
  password: '',
  nickname: '',
  confirmPassword: ''
})
const messageSignUp = ref('')

const schema = {
  email: 'required|email',
  nickname: 'required',
  password: 'required|min:6',
  confirmPassword: 'confirmed:@password'
}

const signUp = async () => {
  try {
    await axios.post(`${api}/users/sign_up`, signupForm.value)
    messageSignUp.value = '註冊成功'
    Swal.fire({
      icon: 'success',
      title: messageSignUp.value,
      showConfirmButton: false,
      timer: 1500
    })
    router.push('/')
  } catch (err) {
    messageSignUp.value = '註冊失敗: 用戶已存在'
    Swal.fire({
      icon: 'error',
      title: messageSignUp.value
    })
  }
}
</script>
