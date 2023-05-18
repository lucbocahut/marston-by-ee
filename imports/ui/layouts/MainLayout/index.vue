<template>
  <div id="main-layout">
    <template v-if="userId">
      <MainMenu />
      <router-view></router-view>
    </template>
    <template v-else>
      <Login v-if="appHasUsers" />
      <CreateFirstUser v-else />
    </template>
  </div>
</template>
<script>
import { Meteor } from 'meteor/meteor'
import CreateFirstUser from '/imports/ui/views/Users/CreateFirstUser.vue'
import Login from '/imports/ui/views/Users/Login.vue'
import MainMenu from '/imports/ui/layouts/MainLayout/MainMenu.vue'

const UsersExist = new Mongo.Collection('usersExist');

export default {
  components: {
    CreateFirstUser,
    Login,
    MainMenu
  },
  data() {
    return {}
  },
  meteor: {
    $subscribe: {
      "users_exist": function () {
        return []
      }
    },
    userId() {
      return Meteor.userId()
    },
    appHasUsers() {
      const users = UsersExist.findOne()
      return users && users.exists
    },
    test() {
      return UsersExist.find()
    }
  }
}
</script>
<style lang="scss">
#main-layout {
  display: flex;
}
</style>