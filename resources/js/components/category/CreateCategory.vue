<template>
  <v-container>
    <v-form @submit.prevent="submit">
      <v-text-field v-model="form.name" label="name" type="text" required></v-text-field>
      <v-btn color="pink" type="submit" v-if="editSlug">Update</v-btn>
      <v-btn color="teal" type="submit" v-else>Create</v-btn>
    </v-form>
    <v-card class="mt-4">
      <v-toolbar color="indigo" dark dense>
        <v-toolbar-title>Categories</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <div v-for="(category,index) in categories" :key="category.id">
          <v-list-tile>
            <v-list-tile-action>
              <v-btn icon small @click="edit(index)">
                <v-icon color="success">edit</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ category.name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon small @click="destroy(index,category.slug)">
                <v-icon color="red">delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: null
      },
      categories: {},
      editSlug: null
    };
  },

  created() {
    if (!User.admin()) {
      this.$router.push("/forum");
    }
    axios
      .get("/api/category")
      .then(res => (this.categories = res.data.data))
      .catch(err => console.error(err));
  },
  methods: {
    submit() {
      this.editSlug ? this.update() : this.create();
    },
    create() {
      axios
        .post("/api/category", this.form)
        .then(res => {
          this.categories.unshift(res.data);
          this.form.name = null;
        })
        .catch(err => console.error(err));
    },
    update() {
      axios
        .patch(`/api/category/${this.editSlug}`, this.form)
        .then(res => {
          this.categories.unshift(res.data);
          this.form.name = null;
        })
        .catch(err => console.error(err));
    },
    destroy(index, slug) {
      axios
        .delete(`/api/category/${slug}`)
        .then(res => this.categories.splice(index, 1))
        .catch(err => console.error(err));
    },
    edit(index) {
      this.form.name = this.categories[index].name;
      this.editSlug = this.categories[index].slug;
      this.categories.splice(index, 1);
    }
  }
};
</script>