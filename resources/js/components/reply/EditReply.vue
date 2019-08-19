<template>
  <div>
    <vue-simplemde v-model="reply.reply" />
    <v-card-actions>
      <v-btn icon>
        <v-icon color="green darken-2" @click="update">save</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="black darken-2" @click="cancel">cancel</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  props: ["reply"],
  methods: {
    update() {
      axios
        .patch(
          `/api/question/${this.reply.question_slug}/reply/${this.reply.id}`,
          { body: this.reply.reply }
        )
        .then(res => this.cancel());
    },
    cancel() {
      EventBus.$emit("cancelEditing");
    }
  }
};
</script>