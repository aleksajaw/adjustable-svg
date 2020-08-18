 <template>
  <div>
    <ColorPicker
      :class="{'disabled': !attr.checked}"
      v-model="attr.input"
      :color="attr.input"
      :checked="attr.checked"
      @reverseChecked="reverseChecked"
      :id="attr.id"
    />

    <p class="sliders__attr-description">
      <input class="sliders__attr--checkbox" type="checkbox" v-model="attr.checked">
      
      <span class="sliders__attr-description-span" @click="reverseChecked(true)">{{ attr.subtitle }}</span>
      
      <input
        class="sliders__attr--color-text"
        type="text"
        :class="{'disabled':!attr.checked}"
        v-model="colorValue"
        @click="reverseChecked()"
      >
    </p>
    <p class="sliders__attr-description">
      <input class="sliders__attr--checkbox" type="checkbox" v-model="attr.opacity">
      <span>opacity</span>
    </p>
  </div>
</template>

<script>
import ColorPicker from "./ColorPicker";

export default {
  name: "ColorAttribute",
  components: {
    ColorPicker
  },
  props: {
    attr: {}
  },
  data() {
    return {
      colorValue: ""
    };
  },
  methods: {
    reverseChecked(text = false) {
      !text
        ? this.attr.checked
          ? (text = false)
          : (text = true)
        : (text = true);
      if (text) this.attr.checked = !this.attr.checked;
    }
  },
  watch: {
    attr: {
      handler(a) {
        if(a.input !== this.colorValue) this.colorValue = a.input;
      },
      deep: true
    },
    colorValue(c) {
      if(c === '') this.colorValue = 'rgba(0,0,0,1)';
      else if(this.attr.input !== c) this.attr.input = this.colorValue;
    }
  }
};
</script>