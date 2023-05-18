<template>
  <div id="login">
    <div class="login-body">
      <div class="">
        <p class="title">
          Marston
        </p>
        <template>
          <p class="subtitle">Create an account</p>
          <hr>
          <br>
          <template v-if="created === false">
            <form key="create">
              <b-message>
                Setup the initial admin account.
              </b-message>
              <b-message v-if="error" type="is-error">{{ error }}</b-message>
              <b-field label="Name" label-position="inside">
                <b-input type="text" v-model="newUser.name"></b-input>
              </b-field>

              <b-field label="Email" label-position="inside">
                <b-input type="email" v-model="newUser.email"></b-input>
              </b-field>

              <b-message type="is-danger" v-if="createError">{{ createError }}</b-message>
              <div class="action">
                <b-button type="is-dark" expanded @click="create" :loading="creating">Create Account</b-button>
              </div>
            </form>
          </template>
          <template v-else>
            <b-message>
              Your account has been created. Please check your email for a verification link.
            </b-message>
            <router-link to="/"><b-button type="is-text" label="Login" expanded /></router-link>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { Meteor } from 'meteor/meteor'
import API from '/imports/api'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      site: null,
      siteError: false,
      show: null,
      creating: false,
      created: false,
      newUser: {
        name: '',
        email: ''
      },
      resetPasswordEmail: '',
      resettingPassword: false,
      resetPasswordSuccess: false,
      resetError: '',
      createError: null
    }
  },
  meteor: {
    userID() {
      return Meteor.userId()
    },
    user() {
      return Meteor.user({})
    },
    loggingIn() {
      return Meteor.loggingIn()
    }
  },
  methods: {
    login() {
      console.log('login...')
      const context = this
      const email = context.email
      const password = context.password
      Meteor.loginWithPassword({ email }, password, function (error) {
        if (error) {
          console.log('login', error)
          context.error = error.message
        } else {
          context.$buefy.toast.open('Login successful')
        }
      })
    },
    logout() {
      Meteor.logout()
    },
    reset() {
      this.createError = ''
      this.newUser = {
        name: '',
        email: ''
      }
    },
    async create() {
      const context = this
      if (context.creating) {
        return
      }
      context.creating = true
      const newUser = context.newUser
      console.log({ newUser })
      try {
        await API.Users.firstUser(newUser)
        context.created = true
        context.creating = false
        context.$buefy.toast.open('User created')
      } catch (e) {
        context.creating = false
        context.createError = e.toString()
      }
    }
  }
}
</script>
<style lang="scss">
#login {
  position: relative;
  display: flex;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  justify-content: center;
  align-items: center;
  text-align: center;

  .login-body {
    width: 320px;
    display: inline-block;
    background-color: #fff;

    form {
      text-align: left;
    }

    @media all and (max-width: 330px) {
      width: 100%;
      padding: 5px;
    }

    .action {
      text-align: right;
    }
  }

  hr {
    width: 50%;
    margin: 0 25%;
  }
}
</style>