<template>
  <div class="mt-2">
    <vue-simplemde v-model="body" />
    <v-btn color="green darken-2" dark @click="submit">reply</v-btn>
  </div>
</template>
<script>
export default {
  props: ["questionSlug"],
  data() {
    return {
      body: null
    };
  },

  methods: {
    submit() {
      axios
        .post(`/api/question/${this.questionSlug}/reply`, { body: this.body })
        .then(res => {
          this.body = "";
          EventBus.$emit("newReply", res.data.reply);
          window.scrollTo(0, 0);
        })
        .catch(err => console.error(err));
    }
  }
};
</script>