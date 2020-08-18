<template>
  <div>
    <input
      class="sliders__attr--range"
      type="range"
      :style="style"
      :class="{'disabled': !slider.checked}"
      :min="slider.input.min"
      :max="slider.input.max"
      :step="slider.input.step"
      @click="reverseChecked()"
      v-model="slider.input.value"
    >

    <p class="sliders__attr-description">
      <input class="sliders__attr--checkbox" type="checkbox" v-model="slider.checked" :title="'Is ' + slider.subtitle + ' value of the ' + slider.heading + ' used?'">
      
      <span class="sliders__attr-description-span" @click="reverseChecked(true)">
        {{ slider.subtitle }}
        <select
          class="sliders__attr--select"
          v-if="slider.id == 'svg_resizeBy'"
          v-model="slider.resizeBy"
          :class="{'disabled': !slider.checked}"
        >
          <option>width</option>
          <option>height</option>
        </select>
      </span>
      
      <input
        class="sliders__attr-description--value"
        type="number"
        :step="slider.input.step"
        :class="{'disabled': !slider.checked}"
        v-model="attrValue"
        @click="reverseChecked()"
      >
      
      <span
        v-if="slider.format == 'px'"
        :class="{'disabled':!slider.checked}"
        @click="reverseChecked(true)"
      >px</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "StandardAttribute",
  props: {
    slider: Object
  },
  computed: {
    attrValue: {
      get() {
        return this.slider.input.value;
      },
      set(proto) {
        this.slider.input.value = proto;
      }
    },
    style() {
      let bgColor = this.$store.getters.bgColor,
        border = this.$store.getters.borderColor,
        actual = (this.attrValue * 100) / this.slider.input.max;
      if (actual < 15) actual = 15;
      else if (actual > 100) actual = 100;
      return {
        borderColor: border,
        background:
          "linear-gradient(90deg, #f8f8f8 2%, " + bgColor + " " + actual + "%)"
      };
    }
  },
  methods: {
    reverseChecked(text = false) {
      !text
        ? this.slider.checked
          ? (text = false)
          : (text = true)
        : (text = true);
      if (text) this.slider.checked = !this.slider.checked;
    }
  }
};
</script>