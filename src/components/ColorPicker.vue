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

import { mapMutations } from 'vuex'

export default {
  name: "ColorPicker",
  components: {
    picker: vueColorChrome
  },
  props: {
    id: String,
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
    this.updateFromPicker(this.color || "rgba(0,0,0,1)");
  },
  methods: {
    ...mapMutations(['SET_ATTR_VAL']),
    
    reverseChecked(text = false) {
      this.$emit("reverseChecked", text);
    },
    updateFromPicker(c) {
      this.chosenColor = c;
    },
    sendColor(c) {
      this.SET_ATTR_VAL([this.id, c])
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
