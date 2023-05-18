<template>
  <div id="main_nav_container">
    <div id="main_nav_placeholder"></div>

    <div id="main_nav">
      <router-link to="/">
        <b-image src="/ee.png" class="main_logo" />
      </router-link>
      <div class="start">

        <router-link to="/nodes">
          <b-icon icon="rotate-orbit" title="nodes" />
          <span class="text"><b>Nodes</b></span>
        </router-link>
        <router-link to="/commands">
          <b-icon icon="circle-multiple-outline" title="commands" />
          <span class="text"><b>Commands</b></span>
        </router-link>

      </div>
      <div class="end">
        <router-link to="#" @click.native="logout">
          <b-icon @click="logout" icon="power-standby" />
          <span class="text"><b>{{ user && user.name || 'logout' }}</b></span>

        </router-link>

      </div>
    </div>
  </div>
</template>
<script>
import { Meteor } from 'meteor/meteor'
import { isAdmin, isManager } from '/imports/lib/auth.js'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      date: new Date(),
      activeTab: 1
    }
  },
  meteor: {

  },
  computed: {
    user() {
      return Meteor.user()
    }
  },
  methods: {
    logout() {
      Meteor.logout()
    }
  }
}
</script>
<style lang="scss">
@keyframes appear {
  0% {
    opacity: 0
  }

  100% {
    opacity: 1
  }
}

#main_nav_container {
  flex: 0 0 46px;
  height: 100vh;
  display: block;
  transition: all 0.5s ease;

  &:hover {
    flex: 0 0 150px;
  }
}

#main_nav_placeholder {
  flex: 0 0 46px;
  height: 100vh;
  display: block;
  transition: all 0.5s ease;

  &:hover {
    flex: 0 0 150px;
  }
}

#main_nav {
  position: fixed;
  width: 46px;
  height: 100vh;
  background: #000d;
  z-index: 10;
  display: block;
  transition: all 0.5s ease;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;

  &:hover {
    width: 150px;

    .main_logo {
      transform-origin: top left;
      transform: scale(1.5);
    }
  }

  .main_logo {
    transition: all 0.5s ease;
    width: 24px;
    margin: 18px 12px;
  }

  .connected_user {
    display: inline-flex;

    .connected_user_info {
      font-size: smaller;

      display: flex;
      flex-direction: column;
    }

    .name {
      color: #fff;
      font-weight: bold;
    }

    .site {
      font-size: smaller;
      color: #fff;
    }

    .icon {
      margin: 4px 15px 0 15px;
      color: #ccc;
    }
  }

  .start,
  .end {
    overflow: hidden;
    margin: 10px 0 10px 0;

    &>a {
      display: flex;
      margin: 0;
      padding: 12px;
      height: 46px;
      text-transform: capitalize;
      font-variant: uppercase;
      position: relative;
      color: #999;
      border-left: 2px solid transparent;
      transition: all 0.5s ease;
      justify-content: flex-start;
      text-align: center;

      &:hover {
        color: #ddd;
      }

      &.active {
        border-color: #ddd;
        color: #ddd;
      }

      .icon {
        padding: 0 5px 0 0;
        height: 34px;

        i:before {
          position: relative;
          top: 0px;
        }
      }

      .text {
        display: block;
        text-align: left;
        text-transform: capitalize;
        height: 30px;
        padding: 6px 12px;
        font-size: 16px;
      }
    }

    .router-link-active {
      color: #ddd;
      border-color: #ddd;
    }
  }

  .end {
    position: absolute;
    bottom: 0px;

    .dark-button {
      background: #000;
      color: #fff;
      border: #000;
      transition: all 0.5s ease;

      &:hover {
        background: #444;
      }
    }

    .dropdown {
      .dropdown-menu {
        .has-link {


          .icon {
            margin-top: 5px;
            margin-right: 12px;
          }

          span {}

          a {
            display: flex;
            font-size: 16px;
            padding: 10px 30px;
          }
        }
      }
    }
  }

  .navbar-item {
    text-transform: lowercase;
    font-variant: small-caps;
  }
}
</style>