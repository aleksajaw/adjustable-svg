<template>
  <div class="sliders__attr--color-picker-container" @click="reverseChecked()">
    <div
      @click="showPicker=!showPicker"
      :style="{background: color }"
      class="sliders__attr--range sliders__attr--color"
    ></div>
    <picker
      v-if="showPicker"
      @input="updateFromPicker"
      @click="reverseChecked(true)"
      :value="chosenColor"
      class="sliders__attr--picker"
    />
  </div>
</template>

<script>
import VueColor from "vue-color";
let vueColorChrome = VueColor.Chrome;

import { mapActions } from 'vuex'

export default {
  name: "ColorPicker",
  components: {
    picker: vueColorChrome
  },
  props: {
    subtitle: String,
    checked: Boolean,
    color: String
  },
  data() {
    return {
      showPicker: false,
      chosenColor: String
    };
  },
  mounted() {
    //this.updateFromPicker(this.color || "#000000");
  },
  methods: {
    ...mapActions(['setBgColor', 'setBorderColor']),
    
    reverseChecked(text = false) {
      this.$emit("reverseChecked", text);
    },
    updateFromPicker(c) {
      this.chosenColor = c;
    },
    sendColor(c) {
      if (this.subtitle == "fill color") this.setBgColor(c);
      else this.setBorderColor(c);
    },
    convertColor(c) {
      return (
        "rgba(" +
        c.rgba.r +
        ", " +
        c.rgba.g +
        ", " +
        c.rgba.b +
        ", " +
        c.rgba.a +
        ")"
      );
    }
  },
  watch: {
    color(c){
      if(this.chosenColor != c) this.chosenColor = c
    },
    chosenColor(c) {
      if (c.rgba) {
        c = this.convertColor(c);
      }
      this.sendColor(c);
      this.$emit("input", c);
    },
    checked(bool) {
      if (!bool) this.showPicker = bool;
    }
  }
};
</script>
