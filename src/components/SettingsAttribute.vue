<template>
  <div class="sliders__attr" v-if="showSlider">
    <h4 class="sliders__attr-heading">{{ attr.heading }}</h4>

    <i class="sliders__attr--question fas fa-question-circle"></i>

    <div class="sliders__attr--info">
      <div>{{ attr.info }}</div>
    </div>
    <template>
      <StandardAttribute :slider="attr" v-if="attr.format != 'color'"/>
      <ColorAttribute :attr="attr" v-else/>
    </template>

    <p
      class="sliders__attr-description sliders__attr-description--randomize"
      @click="attr.randomize = !attr.randomize"
    >
      <input class="sliders__attr--checkbox" type="checkbox" v-model="attr.randomize">
      randomize
    </p>
  </div>
</template>

<script>
import StandardAttribute from "./StandardAttribute.vue";
import ColorAttribute from "./ColorAttribute.vue";

import { mapGetters } from 'vuex'

export default {
  name: "SettingsAttribute",
  components: {
    StandardAttribute,
    ColorAttribute
  },
  props: {
    attr: Object
  },
  computed:{
    ...mapGetters(['svgType']),
    showSlider(){
      let bool = true
      if(this.svgType !== 'pattern'){
        if(this.attr.heading === 'pattern') bool = false
      }
      return bool
    }
  }
};
</script>