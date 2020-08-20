<template>
  <div class="slider-container" :style="`height: ${sliderHeight}px`">
    <span :class="[{ 'arrow--hidden': active === 1, 'arrow--active' : !down && scrollStarted  }, 'arrow arrow-top']"></span>
    <ul id="slider" class="slider" :style="`height: ${sliderHeight}px`">
      <slot/>
    </ul>
    <span :class="[{'arrow--hidden': active === numberOfSlides, 'arrow--active' : down && scrollStarted}, 'arrow arrow-bottom']"></span>
  </div>
</template>

<script>
import _ from 'lodash'
import VueScrollTo from 'vue-scrollto'

export default {
  name: 'Slider',
  data(){
    return {
      sliderHeight:0,
      active: 1,
      lastScrollTop: null,
      scrollStarted: false,
      down: true,
      numberOfSlides:0,
      slides:this.$slots.default
    }
  },
  mounted(){
    this.scrollStarted = false
    this.lastScrollTop = document.getElementById('slider').scrollTop
    this.sliderHeight = Math.ceil(_.max(this.slides.map(slide => {
      return slide.elm.getBoundingClientRect().height
    })))
    this.slides.forEach(slide => {
      this.numberOfSlides++;
      let el = slide.elm
      el.className = "slide-" + this.numberOfSlides;
      el.style.height = this.sliderHeight + 'px';
    })
    this.slides[0].elm.classList.add('current-slide')
    document.getElementById('slider').addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let options = {
            container: '#slider',
            easing: 'ease-in',
            offset: 0,
            cancelable: false,
            onDone: _.debounce(() => {
              this.active = (this.down) ? this.active+1 : this.active-1
              this.scrollStarted = false
            }, 100),
            x: false,
            y: true
          },
        st = Math.ceil(document.getElementById('slider').scrollTop),
        scrollToSlideNo = 0,
        earlierSlide = this.active-1,
        bug = (this.numberOfSlides-1) * this.sliderHeight < this.lastScrollTop

      this.down = (st > this.lastScrollTop) ? true : false
      this.lastScrollTop = st

      if(bug) this.scrollStarted = true
      
      if (!this.scrollStarted) {
        this.scrollStarted = true
        scrollToSlideNo = (this.down) ? this.active+1 : this.active-1
        if(scrollToSlideNo <= this.numberOfSlides && scrollToSlideNo > 0){
          VueScrollTo.scrollTo('.slide-' + scrollToSlideNo, 500, options)
          this.slides[scrollToSlideNo-1].elm.classList.add('current-slide')
          this.slides[earlierSlide].elm.classList.remove('current-slide')
        }
      }

      if(bug) this.scrollStarted = false
      // use the two 'if' functions with the bug statement is the only way I found to fix the problem
      // with the strange infinite scrolling or sudden stop working vue-scrollto
      // the cause is the last element sometimes get extra pixels of height (but HTML doesn't show it)
    }
  }
}
</script>

<style lang="scss">
@keyframes bouncingBottom {
  0%, 5%, 12%, 20%, 100% {
    transform: translateY(0);
  }
  16% {
    transform: translateY(15px);
  }
  10% {
    transform: translateY(12px);
  }
}
@keyframes bouncingTop {
  0%, 5%, 12%, 20%, 100% {
    transform: translateY(0);
  }
  16% {
    transform: translateY(-15px);
  }
  10% {
    transform: translateY(-12px);
  }
}
.slider-container{
  position:relative;
}
.arrow{
  position:absolute;
  right: 8px;
  left: 0;
  margin: auto;
  padding-right:15px;
  font-family:'Font Awesome 5 Free';
  font-weight:600;
  font-size:32px;
  z-index:9;
  opacity:0.3;
  transition: .5s opacity;
  &--hidden{
    opacity:0
  }
  &--active{
    opacity:.7
  }
}
.arrow-top{
  top:15px;
  animation: bouncingTop 6s infinite;
  &::before{
    content:'\f077';
  }
}
.arrow-bottom{
  bottom:15px;
  animation: bouncingBottom 6s infinite;
  &::before{
    content:'\f078';
  }
}
.slider{
  padding:0;
  margin:0 auto;
  list-style-type:none;
  overflow-y:scroll;
  box-shadow:inset 1px -5px 5px 0px rgba(0, 0, 0, 0.2);
  &::-webkit-scrollbar {
    width:0
  }
  li{
    transition:2.5s;
    &:not(.current-slide){
      opacity:0.6
    }
  }
}
</style>