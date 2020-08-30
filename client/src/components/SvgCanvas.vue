<template>
  <div class="canvas">
    <svg
      v-if="svgType==='element'"
      ref="svgToResize"
      class="svg-element"
      :style="'opacity: ' + getAttributeValue('svg_opacity')">
      <filter id="raggedFilter">
        <feDropShadow x="0" y="0" stdDeviation="3"></feDropShadow>
        <feTurbulence
          type="turbulence"
          result="turbulence"
          :baseFrequency="getAttributeValue('feTurbulance_baseFrequency')"
          :numOctaves="getAttributeValue('feTurbulance_numOctaves')"
        ></feTurbulence>
        <feDisplacementMap
          in2="turbulence"
          in="SourceGraphic"
          xChannelSelector="R"
          yChannelSelector="G"
          :scale="getAttributeValue('feDisplacementMap_scale')"
        ></feDisplacementMap>
      </filter>
      <rect
        :height="getAttributeValue('svgElement_height')"
        :width="getAttributeValue('svgElement_width')"
        x="0"
        y="0"
        :fill="getAttributeValue('svg_fillColor')"
        :stroke="getAttributeValue('svg_strokeColor')"
        :stroke-width="getAttributeValue('svg_strokeWidth')"
        filter="url(#raggedFilter)"
      ></rect>
    </svg>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default {
  name: "SvgCanvas",
  computed: {
    ...mapGetters(["sliders", "svgType"]),
    viewBoxSvg(){
      let returnedValue =
          (this.checkAndReturn('svg_viewBoxX') || 0)
        + ' ' + (this.checkAndReturn('svg_viewBoxY') || 0)
        + ' ' + this.checkAndReturn('svg_viewBoxWidth')
        + ' ' + this.checkAndReturn('svg_viewBoxHeight'),
          valuesArr = returnedValue.split(' ')
      return (valuesArr[2] === 'undefined' || valuesArr[3] === 'undefined') ? undefined : returnedValue
    },
  },
  watch:{
    viewBoxSvg(vb){
      this.svgViewBox = vb
    },
  },
  methods: {
    ...mapActions(['isChecked']),
    getAttributeValue(payload) {
      let wantedSlider = _.find(this.sliders, { name: payload }),
          val = (wantedSlider.input.value != undefined)
              ? wantedSlider.input.value
              : wantedSlider.input;
      return wantedSlider.checked ? val : undefined;
    },
    checkAndReturn(name){
      return this.isChecked(name) ? this.getAttributeValue(name) : 0
    }
  }
};
</script>