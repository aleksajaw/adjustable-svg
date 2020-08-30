<template>
  <svg
    v-if="svgType==='pattern'"
    ref="svgToResize"
    :viewBox="svgViewBox"
    class="svg-background"
    :style="'opacity: ' + getAttributeValue('svg_opacity')"
  >
    <defs>
      <pattern
        id="raggedElement"
        :x="getAttributeValue('svgPattern_x')"
        :y="getAttributeValue('svgPattern_y')"
        :width="getAttributeValue('svgPattern_width')"
        :height="getAttributeValue('svgPattern_height')"
        patternUnits="userSpaceOnUse">
        <filter
          id="raggedFilter"
          :key="forceUpdateRaggedFilter"
        >
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
          :x="getAttributeValue('svgElement_x')"
          :y="getAttributeValue('svgElement_y')"
          :fill="getAttributeValue('svg_fillColor')"
          :stroke="getAttributeValue('svg_strokeColor')"
          :stroke-width="getAttributeValue('svg_strokeWidth')"
          filter="url(#raggedFilter)"
        ></rect>
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#raggedElement)"/>
  </svg>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default {
  name: "SvgBackground",
  data(){
    return{
      forceUpdateRaggedFilter:0,
      svgViewBox: undefined
    }
  },
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
    /*sliders:{
      handler(){
        this.forceUpdateRaggedFilter +=1
      },
      deep:true
    }*/
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