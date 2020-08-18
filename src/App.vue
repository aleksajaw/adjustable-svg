<template>
  <div id="app" v-bind:style="{backgroundColor : this.getAttributeValue('page_backgroundColor')}">
   
    <SvgBackground/>

    <div class="app-container">
      
      <header class="header">
        <h2
          class="header__title"
        >Feel&nbsp;free&nbsp;to&nbsp;have&nbsp;fun with&nbsp;the&nbsp;adjustment</h2>
      </header>

      <div class="main-container">
        <div class="sliders">

          <Slider>
            <Slide v-for="group in slidersGroups()" v-bind:key="`${group}-slide`">
              
              <div class="sliders__group-main-container" v-bind:key="`${group}-group`">
                
                <h3 class="sliders__group-container-title" v-bind:key="`${group}-group__container-title`">
                  
                  <input
                    class="slide__checkbox"
                    type="checkbox"
                    @change="(e) => checkGroup(e, group, 'normal')"
                    :checked="isAllGroupChecked(group, 'normal')"
                  >

                  <input
                    class="slide__checkbox slide__checkbox--randomize"
                    type="checkbox"
                    @change="(e) => checkGroup(e, group, 'randomize')"
                    :checked="isAllGroupChecked(group, 'randomize')"
                  >{{group}}
                
                </h3>
                <div class="sliders__group-container" v-bind:key="`${group}-group__container`">
                  
                  <SettingsAttribute v-for="slider in selectiveSliders(group)" :attr="slider" v-bind:key="slider.id"/>
                
                </div>

              </div>

            </Slide>
          </Slider>

        </div>
        <footer>

          <div class="sliders-svg-options">
            <div>
              <span>
                <input
                  class="sliders-svg-options--checkbox"
                  type="checkbox"
                  @click="(e) => checkAll(e, 'normal')"
                  :checked="isAllChecked('normal')"
                >
                use all sliders
              </span>
              <span class="sliders-svg-options--randomize">
                <input
                  class="sliders-svg-options--checkbox"
                  type="checkbox"
                  @click="(e) => checkAll(e, 'randomize')"
                  :checked="isAllChecked('randomize')"
                >
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

    <div class="save">
      <div v-if="showSaveMsg" class="save__message">
        Save preset as:
        <input type="text">
      </div>
      <span class="save__icon" @click="showSaveMsg=!showSaveMsg"></span>
    </div>
  
  </div>
</template>

<script>
import SvgBackground from "./components/SvgBackground.vue"
import Slider from "./components/Slider.vue"
import Slide from "./components/Slide.vue"
import SettingsAttribute from "./components/SettingsAttribute.vue";
import SvgCanvas from "./components/SvgCanvas.vue";
import Sidebar from "./components/Sidebar.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import _ from 'lodash'

export default {
  name: "App",
  components: {
    SvgBackground,
    Slider,
    Slide,
    SettingsAttribute,
    SvgCanvas,
    Sidebar,
  },
  data(){
    return{
      showSaveMsg: false
    }
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
    },
  },
  mounted(){
    this.setDefault()
  },
  methods:{
    ...mapMutations(['SET_SVG_TYPE']),
    ...mapActions(['setDefault']),

    slidersGroups(){
      return Object.keys(_.groupBy(this.sliders, 'group'))
    },
    selectiveSliders(group){
      return _.filter(this.sliders, {'group': group})
    },
    checkAll(e, type){
      let checked = e.target.checked,
          all = this.sliders

      if(type === 'normal'){
        all.forEach(slide => {
          slide.checked = checked
        })
      } else if (type === 'randomize'){
        all.forEach(slide => {
          slide.randomize = checked
        })
      }
    },
    isAllChecked(type){
      let all = this.sliders,
          index = 0,
          bool = type === 'normal' ? all[0].checked: all[0].randomize

      if(bool){
        if(type === 'normal'){
          while((index+1) < all.length){
            if(bool !== all[index+1].checked){
              bool = false
              break
            }
            index++
          }
        } else if (type === 'randomize'){
          while((index+1) < all.length){
            if(bool !== all[index+1].randomize) {
              bool = false
              break
            }
            index++
          }
        }
      }
      return bool
    },
    checkGroup(e, group, type){
      let checked = e.target.checked
      group = this.selectiveSliders(group)

      if(type === 'normal'){
        group.forEach(slider => {
          slider.checked = checked
        })
      } else if (type === 'randomize'){
        group.forEach(slider => {
          slider.randomize = checked
        })
      }
    },
    isAllGroupChecked(groupName, type){
      let group = this.selectiveSliders(groupName),
          index = 0,
          bool = type === 'normal' ? group[0].checked: group[0].randomize
      
      if(bool){
        if(type === 'normal'){
          while((index+1) < group.length){
            if(bool !== group[index+1].checked){
              bool = false
              break
            }
            index++
          }
        } else if (type === 'randomize'){
          while((index+1) < group.length){
            if(bool !== group[index+1].randomize){
              bool = false
              break
            }
            index++
          }
        }
      }
      return bool
    },
    getAttributeValue(payload) {
      let wantedSlider = _.find(this.sliders, { id: payload }),
          val = (wantedSlider.input.value != undefined)
              ? wantedSlider.input.value
              : wantedSlider.input;
      return wantedSlider.checked ? val : undefined;
    },
  }
};
</script>