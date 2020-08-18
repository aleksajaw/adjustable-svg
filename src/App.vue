<template>
  <div id="app">
    <SvgBackground/>
    <div class="app-container">
      <header class="header">
        <h2
          class="header__title"
        >Feel&nbsp;free&nbsp;to&nbsp;have&nbsp;fun with&nbsp;the&nbsp;adjustment</h2>
      </header>

      <div class="main container">
        <div class="sliders">
          <div v-for="group in slidersGroups()" class="sliders__group-main-container" v-bind:key="`${group}-group`">
            <h3 class="sliders__group-container-title" v-bind:key="`${group}-group__container-title`">
              {{group}}
            </h3>
            <div class="sliders__group-container" v-bind:key="`${group}-group__container`">
              <SettingsAttribute v-for="slider in selectiveSliders(group)" :attr="slider" v-bind:key="slider.id"/>
            </div>
          </div>
        </div>
        <footer>

          <div class="sliders-svg-options">
            <div>
              <span>
                <input class="sliders-svg-options--checkbox" type="checkbox" @click="useAll">
                use all sliders
              </span>
              <span class="sliders-svg-options--randomize">
                <input class="sliders-svg-options--checkbox" type="checkbox" @click="randomizeAll">
                check all sliders as randomize
              </span>
            </div>
            <div>
              <span>
                Svg as:
              </span>
              <span>
                <input class="sliders-svg-options--radio" type="radio" name="typeSvg" value="element" v-model="typeSvg" checked>
                element
              </span>
              <span>
                <input class="sliders-svg-options--radio" type="radio" name="typeSvg" value="pattern" v-model="typeSvg">
                pattern
              </span>
            </div>
          </div>

          <SvgCanvas/>
        </footer>
        <Sidebar/>
      </div>
    </div>
  </div>
</template>

<script>
import SvgBackground from "./components/SvgBackground.vue"
import SettingsAttribute from "./components/SettingsAttribute.vue";
import SvgCanvas from "./components/SvgCanvas.vue";
import Sidebar from "./components/Sidebar.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import _ from 'lodash'

export default {
  name: "App",
  components: {
    Sidebar,
    SettingsAttribute,
    SvgCanvas,
    SvgBackground,
  },
  computed: {
    ...mapGetters(["sliders", "svgType"]),
    typeSvg:{
      get(){
        return this.svgType
      },
      set(proto){
        this.SET_SVG_TYPE(proto)
      }
    }
  },
  mounted(){
    this.setDefault()
  },
  methods:{
    ...mapMutations(['SET_SVG_TYPE']),
    ...mapActions(['setDefault']),
    useAll(event){
      this.sliders.forEach(slider => {
        slider.checked = event.target.checked
      })
    },
    randomizeAll(event){
      this.sliders.forEach(slider => {
        slider.randomize = event.target.checked
      })
    },
    slidersGroups(){
      return Object.keys(_.groupBy(this.sliders, 'group'))
    },
    selectiveSliders(group){
      return _.filter(this.sliders, {'group': group})
    }
  }
};
</script>