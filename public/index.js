/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Places",
      places: [],
      newPlace: {
        name: "",
        address: "" 
      }
    };
  },
  created: function() {
    console.log("load places from api");
    axios.get("/api/places").then(function(response) {
      console.log(response.data);
      this.places = response.data;
    }.bind(this));
  },
  methods: {
    addNewPlace: function() {
      console.log("adding new place");

      var theParams = {
        name: this.newPlace.name,
        address: this.newPlace.address
      };

      axios.post("/api/places", theParams).then(function(response) {
        console.log(response.data);
        this.places.push(response.data);
      }.bind(this)).catch(function(error) {
        console.log(error.response);
      });

      this.newPlace = {
        name: "",
        address: ""
      };
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});