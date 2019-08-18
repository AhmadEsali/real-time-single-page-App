<template>
  <v-form @submit.prevent="create">
    <v-container>
      <v-text-field v-model="form.title" label="Title" type="text" required></v-text-field>

      <v-autocomplete
        v-model="form.category_id"
        :items="categories"
        color="white"
        item-text="name"
        item-value="id"
        label="Category"
      ></v-autocomplete>

      <vue-simplemde v-model="form.body" />

      <v-btn color="green" type="submit">Create</v-btn>
    </v-container>
  </v-form>
</template>


<script>
export default {
  methods: {
    create() {
      axios
        .post("/api/question", this.form)
        .then(res => {
          console.log(res.data);
          this.$router.push(res.data.path);
        })
        .catch(err => (this.errors = err.response.data.error));
    }
  },
  data() {
    return {
      form: {
        title: null,
        category_id: null,
        body: null
      },
      categories: {},
      errors: {}
    };
  },
  created() {
    axios
      .get("/api/category")
      .then(res => (this.categories = res.data.data))
      .catch(err => console.log(err));
  }
};
</script>


<style>
</style>