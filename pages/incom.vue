<template>
    <div>
        
    <form v-if="!sented" class="form-signin" @submit.prevent="sentIncom(form)">
      <nuxt-link to="/">На главную</nuxt-link>
      <h1 class="h3 my-3 font-weight-normal">Заявка на ремонт</h1>
      <label for="inputEmail" class="sr-only">Вше имя</label>
      <input type="text" v-model="form.name" id="inputEmail" class="form-control" placeholder="Александр" required autofocus>
      <label for="inputPassword" class="sr-only">Номер телефона</label>
      <input type="text" v-model="form.phone" id="inputPassword" class="form-control mt-3" placeholder="+7длпдв" required>
      <div class="checkbox mb-3">
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Отправить</button>
    </form>
    <div v-else class="ml-auto">
        <nuxt-link to="/">На главную</nuxt-link>
        <h1 class="h3 my-3 font-weight-normal">Заявка отправлена</h1>
            <h3>Спасибо, {{form.name}}, что обратились к нам!</h3>
            <h3>В ближайшее время мы позвоним Вам по номеру {{form.phone}}!</h3>
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    phone: ''
                },
                sented: false
            }
        },
         methods: {
          async sentIncom(form) {
            const messageRef = this.$fire.firestore.collection('incoms').doc(form.phone)
            try {
              await messageRef.set({
                ...form,
                status: 'new',
                createAt: Date.now()
              })
              this.sented = true
            } catch (e) {
            alert(e)
            return
            }
          }
        }
    }
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>