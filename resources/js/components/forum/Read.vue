<template>
  <div v-if="question">
    <edit-question v-if="editing" :question="question"></edit-question>
    <show-question v-else :question="question"></show-question>
    <v-container>
      <replies :question="question"></replies>
      <new-reply v-if="loggedIn" :questionSlug="question.slug"></new-reply>
      <div class="mt-4" v-else>
        <router-link to="/login">Login to reply</router-link>
      </div>
    </v-container>
  </div>
</template>

<script>
import ShowQuestion from "./ShowQuestion";
import EditQuestion from "./EditQuestion";
import Replies from "../reply/Replies";
import NewReply from "../reply/NewReply";

export default {
  data() {
    return {
      question: null,
      editing: false
    };
  },
  created() {
    this.listen();
    axios
      .get(`/api/question/${this.$route.params.slug}`)
      .then(res => (this.question = res.data.data))
      .catch(err => console.log(err));
  },

  methods: {
    listen() {
      EventBus.$on("startEditing", () => {
        this.editing = true;
      });
      EventBus.$on("cancelEditing", () => {
        this.editing = false;
      });
    }
  },
  components: { ShowQuestion, EditQuestion, Replies, NewReply },
  computed: {
    loggedIn() {
      return User.loggedIn();
    }
  }
};
</script>


<style>
</style>