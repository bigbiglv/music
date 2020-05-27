<template>
  <div class="mine">
    <button @click="goLogin()">登录</button>
  </div>
</template>

<script>
export default {
  name:'Mine',
  methods:{
    goLogin(){
      this.$router.push('/login');
    }
  }
}
</script>

<style>

</style>