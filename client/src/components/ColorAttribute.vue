 <template>
  <div>
    <ColorPicker
      :id="attr.id"
      :class="{'disabled': !attr.checked}"
      v-model="attr.input"
      :color="attr.input"
      :checked="attr.checked"
      @click="optReverseChecked"
    />

    <p class="sliders__attr-description">
      <input
        class="sliders__attr--checkbox"
        :id="`${attr.id}-checkbox`"
        type="checkbox"
        v-model="attr.checked"
      >
      
      <label :for="`${attr.id}-checkbox`">
        <span class="sliders__attr-description-span">{{ attr.subtitle }}</span>
      </label>

      <input
        type="text"
        :class="['sliders__attr--color-text', {'disabled':!attr.checked}]"
        v-model="colorValue"
      >
    </p>
    <p :class="['sliders__attr-description', {'disabled':!attr.checked}]">
      <input
        :id="`${attr.id}-opacity`"
        class="sliders__attr--checkbox"
        type="checkbox"
        v-model="attr.opacity"
      >
      <label :for="`${attr.id}-opacity`">
        <span>opacity</span>
        </label>
    </p>
  </div>
</template>

<script>
import ColorPicker from "./ColorPicker";
import { mapMutations} from 'vuex'

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
    ...mapMutations(['SET_ATTR_CHECKED']),
    optReverseChecked(){
      if(!this.attr.checked) this.SET_ATTR_CHECKED([this.attr.id, true])
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