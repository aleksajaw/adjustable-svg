<template>
  <section class="sidebar">
    <div class="sidebar__heading">
      <h4 class="sidebar__heading-cont">SETTINGS</h4>
    </div>
    <div class="sidebar__buttons">
      <button
        class="sidebar__buttons-settings"
        :class="'sidebar__buttons-settings--' + (button.class || button.name)"
        v-for="button in buttons"
        v-bind:key="button.name"
        @click="checkRef(button.ref || button.name)"
      >{{ button.name }}</button>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {
      buttons: [
        {
          name: "default"
        },
        {
          name: "example"
        },
        {
          name: "random values",
          class: "random",
          ref: "randV"
        },
        {
          name: "random values and selective use",
          class: "random",
          ref: "randVSU"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["setDefault", "setRandomValues", "setRandomValuesAndSelectiveUse"]),
    checkRef(t) {
      if (t === "default") this.setDefault();
      else if (t === "randV") this.setRandomValues();
      else if (t === "randVSU") this.setRandomValuesAndSelectiveUse()
    }
  }
};
</script>