<template>
  <div>
    <input
      type="range"
      :style="style"
      :class="['sliders__attr--range', {'disabled': !slider.checked}]"
      :min="slider.input.min"
      :max="slider.input.max"
      :step="slider.input.step"
      @click="optReverseChecked"
      v-model="slider.input.value"
    >

    <p class="sliders__attr-description">
      <input
        :id="`${slider.id}-checkbox`" 
        class="sliders__attr--checkbox"
        type="checkbox"
        v-model="slider.checked"
        :title="'Is ' + slider.subtitle + ' value of the ' + slider.heading + ' used?'"
      >
      
      <label :for="`${slider.id}-checkbox`">
        <span class="sliders__attr-description-span">
          {{ slider.subtitle }}
        </span>
      </label>
      
      <input
        type="number"
        :step="slider.input.step"
        :class="['sliders__attr-description--value', {'disabled': !slider.checked}]"
        v-model="attrValue"
        @click="optReverseChecked"
      >
      
      <span
        v-if="slider.format == 'px'"
        :class="{'disabled':!slider.checked}"
        @click="optReverseChecked"
      >px</span>
    </p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

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
    ...mapMutations(['SET_ATTR_CHECKED']),
    optReverseChecked(){
      if(!this.slider.checked) this.SET_ATTR_CHECKED([this.slider.id, true])
    }
  }
};
</script>