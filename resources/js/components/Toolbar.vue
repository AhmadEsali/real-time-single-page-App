<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Bitfumes</v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="hidden-sm-and-down">
      <router-link v-for="item in itmes" :key="item.title" :to="item.to" v-if="item.show">
        <v-btn flat>{{ item.title }}</v-btn>
      </router-link>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      itmes: [
        { title: "Forum", to: "/forum", show: true },
        { title: "Ask Question", to: "/create", show: User.loggedIn() },
        { title: "Category", to: "/category", show: User.loggedIn() },
        { title: "Login", to: "/login", show: !User.loggedIn() },
        { title: "Logout", to: "/logout", show: User.loggedIn() }
      ]
    };
  },

  created() {
    EventBus.$on("logout", () => {
      User.logout();
    });
  }
};
</script>