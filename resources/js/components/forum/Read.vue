<template>
  <div v-if="question">
    <edit-question v-if="editing" :question="question"></edit-question>
    <show-question v-else :question="question"></show-question>
    <v-container>
      <replies :question="question"></replies>
      <new-reply :questionSlug="question.slug"></new-reply>
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
  components: { ShowQuestion, EditQuestion, Replies, NewReply }
};
</script>


<style>
</style>