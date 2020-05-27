<template>
  <div class="login">
    <p class="back" @click="goBack()">X</p>
    <h1>Login</h1>
    <form action="">
      <p>账号：</p>
      <input type="text" name="username"> <br>
      <p>密码：</p>
      <input type="passsword" name="passsword">
    </form>
  </div>
</template>

<script>
export default {
  name:'Login',
  data(){
    return{

    }
  },
  methods:{
     goBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
  .login{
    width: 80%;
    margin: auto;
    .back{
      position: absolute;
      top: 5px;
      right: 10px;
    }
    input{
      appearance: none;
      outline: none;
      border: none;
      padding: 1rem;
      border-bottom: 1px solid #ebebeb;
      transition: all .2s ease-in-out;
    }
    input:focus {
      box-shadow: 0 3px 10px 1px rgba(0, 0, 0, .1);
      transform: translateY(-.5rem)
    }
  }
  .login:focus-within {
    transition: all .2s ease;
    transform: translateY(-1rem);
    background-color: #f1f1f1;
  }
  
</style>