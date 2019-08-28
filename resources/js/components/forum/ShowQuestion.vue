<template>
  <v-card>
    <v-container fluid>
      <v-card-title>
        <div>
          <div class="headline">{{ question.title }}</div>
          <span class="grey--text">{{ question.user }} said {{ question.created_at }}</span>
        </div>
        <v-spacer></v-spacer>
        <v-btn color="teal" dark>{{replyCount }} replies</v-btn>
      </v-card-title>
      <v-card-text v-html="body"></v-card-text>
      <v-card-actions v-if="own">
        <v-btn icon @click="edit">
          <v-icon color="orange">edit</v-icon>
        </v-btn>
        <v-btn icon @click="deleteQuestion()">
          <v-icon color="red">delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      own: User.own(this.question.user_id),
      replyCount: this.question.replies_count
    };
  },
  props: ["question"],

  created() {
    EventBus.$on("newReply", () => {
      this.replyCount++;
    });

    Echo.private("App.User." + User.id()).notification(notification => {
      this.replyCount++;
    });

    EventBus.$on("deleteReply", () => {
      this.replyCount--;
    });

    Echo.channel("deleteReplyChannel").listen("DeleteReply", e => {
      this.replyCount--;
    });
  },
  computed: {
    body() {
      return md.parse(this.question.body);
    }
  },

  methods: {
    deleteQuestion() {
      axios
        .delete(`/api/question/${this.question.slug}`)
        .then(res => {
          console.log(res.data);
          this.$router.push({ name: "forum" });
        })
        .catch(err => console.error(err));
    },
    edit() {
      EventBus.$emit("startEditing");
    }
  }
};
</script>


<style>
</style>