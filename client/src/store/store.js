import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    sliders: [
      {
        name: "page_backgroundColor",
        group: "page",
        heading: "background",
        subtitle: "color",
        input: "",
        format: "color",
        opacity: false,
        checked: true,
        randomize: false
      },
      {
        name: "feTurbulance_baseFrequency",
        group: "filter",
        heading: "feTurbulance",
        subtitle: "baseFrequency",
        input: {
          min: 0.0,
          max: 5,
          step: 0.01,
          value: 0.0
        },
        checked: true,
        randomize: false
      },
      {
        name: "feTurbulance_numOctaves",
        group: "filter",
        heading: "feTurbulance",
        subtitle: "numOctaves",
        input: {
          min: 0,
          max: 20,
          step: 1,
          value: 0
        },
        checked: true,
        randomize: false
      },
      {
        name: "feDisplacementMap_scale",
        group: "filter",
        heading: "feDisplacementMap",
        subtitle: "scale",
        input: {
          min: 0,
          max: 100,
          step: 1,
          value: 0
        },
        checked: true,
        randomize: false
      },
      {
        name: "svgElement_width",
        group: "svg's element",
        heading: "svg's element",
        subtitle: "width",
        input: {
          min: 1,
          max: 1000,
          step: 1,
          value: 1
        },
        format: "px",
        checked: true,
        randomize: false
      },
      {
        name: "svgElement_height",
        group: "svg's element",
        heading: "svg's element",
        subtitle: "height",
        input: {
          min: 1,
          max: 1000,
          step: 1,
          value: 1
        },
        format: "px",
        checked: true,
        randomize: false
      },
      {
        name: "svgPattern_width",
        group: "svg's pattern",
        heading: "svg's pattern",
        subtitle: "width",
        input: {
          min: 1,
          max: 100,
          step: 1,
          value: 100
        },
        checked: true,
        randomize: false,
        target: 'pattern'
      },
      {
        name: "svgPattern_height",
        group: "svg's pattern",
        heading: "svg's pattern",
        subtitle: "height",
        input: {
          min: 1,
          max: 100,
          step: 1,
          value: 100
        },
        checked: true,
        randomize: false,
        target: 'pattern'
      },
      {
        name: "svg_strokeWidth",
        group: "rest of svg",
        heading: "svg stroke",
        subtitle: "width",
        input: {
          min: 1,
          max: 100,
          step: 1,
          value: null
        },
        format: "px",
        checked: true,
        randomize: false
      },
      {
        name: "svg_strokeColor",
        group: "rest of svg",
        heading: "svg stroke",
        subtitle: "color",
        input: "",
        format: "color",
        opacity: false,
        checked: true,
        randomize: false
      },
      {
        name: "svg_fillColor",
        group: "rest of svg",
        heading: "svg fill",
        subtitle: "color",
        input: "",
        format: "color",
        opacity: false,
        checked: true,
        randomize: false
      },
      {
        name: "svg_opacity",
        group: "rest of svg",
        heading: "svg",
        subtitle: "opacity",
        input: {
          min: 0.01,
          max: 1,
          step: 0.01,
          value: 1
        },
        checked: true,
        randomize: false
      },

      {
        name: "svg_viewBoxWidth",
        group: "svg viewBox",
        heading: "svg viewBox",
        subtitle: "width",
        input: {
          min: 1,
          max: 100,
          step: 1,
          value: 0
        },
        checked: true,
        randomize: false
      },
      {
        name: "svg_viewBoxHeight",
        group: "svg viewBox",
        heading: "svg viewBox",
        subtitle: "height",
        input: {
          min: 1,
          max: 100,
          step: 1,
          value: 0
        },
        checked: true,
        randomize: false
      },
      {
        name: "svgElement_x",
        group: "coordinates",
        heading: "svg's element coordinates",
        subtitle: "x",
        input: {
          min: -100,
          max: 100,
          step: 1,
          value: 0
        },
        checked: false,
        randomize: false,
      },
      {
        name: "svgElement_y",
        group: "coordinates",
        heading: "svg's element coordinates",
        subtitle: "y",
        input: {
          min: -100,
          max: 100,
          step: 1,
          value: 0
        },
        checked: false,
        randomize: false,
      },
      {
        name: "svg_viewBoxX",
        group: "coordinates",
        heading: "svg viewBox",
        subtitle: "x",
        input: {
          min: -100,
          max: 100,
          step: 1,
          value: 0
        },
        checked: false,
        randomize: false
      },
      {
        name: "svg_viewBoxY",
        group: "coordinates",
        heading: "svg viewBox",
        subtitle: "y",
        input: {
          min: -100,
          max: 100,
          step: 1,
          value: 0
        },
        checked: false,
        randomize: false
      },
      {
        name: "svgPattern_x",
        group: "coordinates",
        heading: "svg's pattern",
        subtitle: "x",
        input: {
          min: -100,
          max: 100,
          step: 1,
          value: 0
        },
        checked: false,
        randomize: false,
        target: 'pattern'
      },
      {
        name: "svgPattern_y",
        group: "coordinates",
        heading: "svg's pattern",
        subtitle: "y",
        input: {
          min: -100,
          max: 100,
          step: 1,
          value: 0
        },
        checked: false,
        randomize: false,
        target: 'pattern'
      },
    ],
    svgType: 'element'
  },
  getters: {
    sliders(state) {
      return state.sliders;
    },
    svgType(state){
      return state.svgType
    },
    borderColor(state) {
      return _.find(state.sliders, { name: 'svg_strokeColor' }).input;
    },
    bgColor(state) {
      return _.find(state.sliders, { name: 'svg_fillColor' }).input;
    },
  },
  mutations: {
    SET_ATTR_VAL(state, payload) {
      let i = state.sliders.findIndex((slider) => slider.name === payload[0]);
      if (typeof payload[1] === "number")
        state.sliders[i].input.value = payload[1];
      else state.sliders[i].input = payload[1];
    },

    SET_ATTR_CHECKED(state, payload){
      state.sliders.find((slider) => slider.name === payload[0]).checked = payload[1]
    },

    SET_SVG_TYPE(state, payload){
      state.svgType = payload
    }
  },
  actions: {
    isChecked({state}, payload){
      return _.find(state.sliders, { name: payload }).checked
    },

    getRandAttrNum({ state, commit }, payload) {
      let slider = _.find(state.sliders, { name: payload }),
          input = slider.input
      if (slider.randomize) {
        let result = Math.random() * (input.max - input.min + input.step) + input.min;
        if (input.step === 0.01 && result < 5) result = Number(result.toFixed(2));
        else result = Math.floor(result);
        commit("SET_ATTR_VAL", [payload, result]);
      }
    },

    getRandAttrCol({ state, commit }, payload) {
      let wantedSlider = state.sliders.find((slider) => slider.name === payload)
      if (wantedSlider.randomize) {
        let r = Math.floor(Math.random() * 256),
          g = Math.floor(Math.random() * 256),
          b = Math.floor(Math.random() * 256),
          a = wantedSlider.opacity ? Math.random() * 1 + 0.01 : 1;
        if (a < 1) a = a.toFixed(2);
        else a = Math.floor(a);
        let color = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        commit('SET_ATTR_VAL', [payload, color])
      }
    },

    getRandAttrsChecked({state,commit}){
      state.sliders.forEach(slider => {
        if(slider.randomize && slider.subtitle !== 'height' && slider.subtitle !== 'width'){
          commit('SET_ATTR_CHECKED', [slider.name, _.sample([true, false])])
        }
      })
    },

    setDefault({ commit }) {
      commit("SET_ATTR_VAL", ["page_backgroundColor", '#cacaca']);
      commit("SET_ATTR_VAL", ["feTurbulance_baseFrequency", 0.01]);
      commit("SET_ATTR_VAL", ["feTurbulance_numOctaves", 20]);
      commit("SET_ATTR_VAL", ["feDisplacementMap_scale", 30]);
      commit("SET_ATTR_VAL", ["svgElement_height", 30]);
      commit("SET_ATTR_VAL", ["svgElement_width", 200]);
      commit("SET_ATTR_VAL", ["svg_viewBoxHeight", 30]);
      commit("SET_ATTR_VAL", ["svg_viewBoxWidth", 200]);
      commit('SET_ATTR_VAL', ['svg_fillColor', "rgba(94, 102, 186, 1)"]);
      commit("SET_ATTR_VAL", ["svg_strokeColor", "rgba(94, 150, 200, 1)"]);
      commit("SET_ATTR_VAL", ["svg_strokeWidth", 1]);
    },

    setRandomValues({ state, dispatch }) {
      state.sliders.forEach(slider => {
        if(slider.format === 'color'){
          dispatch("getRandAttrCol", slider.name);
        } else {
          dispatch("getRandAttrNum", slider.name);
        }
      })
    },

    setRandomValuesAndSelectiveUse({dispatch}){
      dispatch("getRandAttrsChecked")
      dispatch("setRandomValues")
    }
  }
});

export default store;
