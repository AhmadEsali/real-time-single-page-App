<template>
  <v-container fluid>
    <v-card>
      <v-form @submit.prevent="update">
        <v-text-field v-model="form.title" label="Title" type="text" required></v-text-field>

        <vue-simplemde v-model="form.body" />

        <v-card-actions>
          <v-btn icon type="submit">
            <v-icon color="teal">save</v-icon>
          </v-btn>
          <v-btn icon @click="cancel">
            <v-icon color>cancel</v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>


<script>
export default {
  props: ["question"],
  methods: {
    cancel() {
      EventBus.$emit("cancelEditing");
    },
    update() {
      axios
        .patch(`/api/question/${this.form.slug}`, this.form)
        .then(res => this.cancel())
        .catch(err => console.error(err));
    }
  },
  data() {
    return {
      form: {
        title: null,
        body: null
      },
      categories: {},
      errors: {}
    };
  },
  mounted() {
    this.form = this.question;
  }
};
</script>


<style>
</style>