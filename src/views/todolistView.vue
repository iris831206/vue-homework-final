<template>
    <!-- ToDo List -->
    <div id="todoListPage" class="bg-half">
        <nav>
            <h1>
                <RouterLink to="/"><a href="#" @click.prevent>ONLINE TODO LISTONLINE TODO LIST</a></RouterLink>
            </h1>
            <ul>
                <template v-if="user.uid">
                    <li class="todo_sm"><a href="#" @click.prevent=""><span>{{ user.nickname }}的代辦</span></a></li>
                    <li><a href="#" @click.prevent="signOut">登出</a></li>
                </template>
                <template v-else>
                    <li class="todo_sm"><span>您尚未登入</span></li>
                </template>
            </ul>
        </nav>
        <div class="conatiner todoListPage vhContainer">
            <div class="todoList_Content">
                <div class="inputBox">
                    <input type="text" v-model="newTodo" placeholder="請輸入待辦事項">
                    <a href="#" @click.prevent="addTodo">
                        <i class="fa fa-plus"></i>
                    </a>
                </div>
                <div class="todoList_list">
                    <ul class="todoList_tab">
                        <li>
                            <a href="#" @click.prevent="currentTab = 'all'"
                                :class="{ active: currentTab === 'all' }">全部</a>
                        </li>
                        <li>
                            <a href="#" @click.prevent="currentTab = 'pending'"
                                :class="{ active: currentTab === 'pending' }">待完成</a>
                        </li>
                        <li>
                            <a href="#" @click.prevent="currentTab = 'completed'"
                                :class="{ active: currentTab === 'completed' }">已完成</a>
                        </li>
                    </ul>
                    <div class="todoList_items">
                        <ul class="todoList_item">
                            <template v-if="todos.length">
                                <li v-for="(todo, id) in filteredTodos" :key="id">
                                    <label class="todoList_label">
                                        <input class="todoList_input" type="checkbox" value="true"
                                            :checked="todo.status" @change="toggleStatus(todo.id)">
                                        <!-- 如果處於編輯模式，顯示輸入框，否則顯示文本 -->
                                        <template v-if="editingId === todo.id">
                                            <input type="text" v-model="tempEditData.content" @blur="confirmEdit"
                                                @keyup.enter="confirmEdit" />
                                        </template>
                                        <span v-else @dblclick="editContent(todo.id)">{{ todo.content }}</span>
                                    </label>
                                    <a href="#" @click.prevent="deleteTodo(todo.id)">
                                        <i class="fa fa-times"></i>
                                    </a>
                                </li>
                            </template>
                            <template v-else>

                                <li className="todoList_label">
                                    目前尚無待辦事項
                                </li>

                            </template>
                        </ul>
                        <div class="todoList_statistics">
                            <p> {{ completedCount }} 個待完成項目</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const api = 'https://todolist-api.hexschool.io'
const router = useRouter()

// 讀取token
const APItoken = ref('')

// 驗證是否登入
const user = ref({
  nickname: '',
  uid: ''
})
const messageCheckOut = ref('')

const checkOut = async () => {
  try {
    const res = await axios.get(`${api}/users/checkout`, {
      headers: {
        Authorization: APItoken.value
      }
    })
    user.value = res.data
    //
    getTodos()
  } catch (err) {
    messageCheckOut.value = '您尚未登入'
    Swal.fire({
      icon: 'warning',
      title: messageCheckOut.value,
      showConfirmButton: false,
      timer: 2000
    })
    router.push('/')
  }
}

// 取得Todo list
const todos = ref([])
const newTodo = ref('')

const getTodos = async () => {
  const res = await axios.get(`${api}/todos`, {
    headers: {
      Authorization: APItoken.value
    }
  })
  todos.value = res.data.data
}

// 新增Todo
const addTodo = async () => {
  if (!newTodo.value) return // 若欄位沒有值傳入則中止
  const todo = {
    content: newTodo.value
  }
  await axios.post(`${api}/todos`, todo, {
    headers: {
      Authorization: APItoken.value
    }
  })
  newTodo.value = '' //
  getTodos()
}

// 登出
const messageSignOut = ref('')
const signOut = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_out`,
      {},
      {
        headers: {
          Authorization: APItoken.value
        }
      })
    messageSignOut.value = res.data.message
    Swal.fire({
      icon: 'success',
      title: messageSignOut.value,
      showConfirmButton: false,
      timer: 1500
    })
    router.push('/')
  } catch (err) {
    messageSignOut.value = '登出失敗: ' + err.message
    Swal.fire({
      icon: 'error',
      title: messageSignOut.value
    })
  }
}

// 根據選中的頁籤過濾todos
const currentTab = ref('all')
const filteredTodos = computed(() => {
  if (currentTab.value === 'all') {
    return todos.value
  } else if (currentTab.value === 'pending') {
    return todos.value.filter(todo => !todo.status)
  } else if (currentTab.value === 'completed') {
    return todos.value.filter(todo => todo.status)
  } else {
    return todos.value // 默認返回所有待辦事項
  }
})

// 計算完成項目的數量
const completedCount = computed(() => {
  return todos.value.filter(todo => !todo.status).length
})

// 切換Todo狀態
const toggleStatus = async (id) => {
  await axios.patch(
        `${api}/todos/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: APItoken.value
          }
        }
  )
  getTodos()
}

// 刪除單筆Todo資料
const deleteTodo = async (id) => {
  await axios.delete(`${api}/todos/${id}`, {
    headers: {
      Authorization: APItoken.value
    }
  })
  getTodos()
}

// 編輯Todo
const editingId = ref('')
const tempEditData = ref({})
const editContent = (id) => {
  editingId.value = id
  const index = todos.value.findIndex((item) => { return item.id === id })
  const editItem = todos.value[index]
  tempEditData.value = { ...editItem } // 淺拷貝
}
const confirmEdit = async () => {
  const id = editingId.value
  await axios.put(`${api}/todos/${id}`, tempEditData.value, {
    headers: {
      Authorization: APItoken.value
    }
  })
  editingId.value = '' // 清空編輯狀態
  tempEditData.value = {} // 清空暫存
  getTodos()
}

onMounted(() => {
  // 讀取token
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
  APItoken.value = token
  checkOut()
})
</script>
