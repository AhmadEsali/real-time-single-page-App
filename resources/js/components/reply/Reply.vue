<template>
  <div class="mt-3">
    <v-container>
      <v-card>
        <v-card-title>
          <div class="headline">{{ question.user }}</div>
          <div class="ml-3">said {{ question.created_at }}</div>
          <v-spacer></v-spacer>
          <like :content="question"></like>
        </v-card-title>
        <v-divider></v-divider>
        <edit-reply v-if="editing" :reply="question"></edit-reply>
        <v-card-text v-else v-html="reply"></v-card-text>
        <v-divider></v-divider>
        <div v-if="!editing">
          <v-card-actions v-if="own">
            <v-btn icon>
              <v-icon color="orange darken-2" @click="edit">edit</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="red darken-2" @click="destroy">delete</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-container>
  </div>
</template>


<script>
import EditReply from "./EditReply";
import Like from "../likes/Like";
export default {
  data() {
    return {
      editing: false
    };
  },
  props: ["question", "index"],

  computed: {
    own() {
      return User.own(this.question.user_id);
    },
    reply() {
      return md.parse(this.question.reply);
    }
  },
  created() {
    this.listen();
  },
  methods: {
    destroy() {
      EventBus.$emit("deleteReply", this.index);
    },
    edit() {
      this.editing = true;
    },
    listen() {
      EventBus.$on("cancelEditing", () => {
        this.editing = false;
      });
    }
  },
  components: { EditReply, Like }
};
</script>