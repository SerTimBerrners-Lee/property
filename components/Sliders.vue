<template>
    <div>
    <div class="slider-swiper-block">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <div class="sliders-contents">
        <img src="https://i.miel.ru/persons/3505433_thumb.jpg" >
        <p> Вера Ботова </p>
        <p>Хочется высказать слова искренней благодарности генеральному 
          директору вашего агентства  и эксперту... 
          <a href="#">Читать далее →</a></p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="sliders-contents">
        <img src="https://i.miel.ru/persons/3505433_thumb.jpg" >
        <p> Вера Ботова </p>
        <p>Хочется высказать слова искренней благодарности генеральному 
          директору вашего агентства  и эксперту... 
          <a href="#">Читать далее →</a></p>
        </div>
      </swiper-slide>
            <swiper-slide>
        <div class="sliders-contents">
        <img src="https://i.miel.ru/persons/3505433_thumb.jpg" >
        <p> Вера Ботова </p>
        <p>Хочется высказать слова искренней благодарности генеральному 
          директору вашего агентства  и эксперту... 
          <a href="#">Читать далее →</a></p>
        </div>
      </swiper-slide>
            <swiper-slide>
        <div class="sliders-contents">
        <img src="https://i.miel.ru/persons/3505433_thumb.jpg" >
        <p> Вера Ботова </p>
        <p>Хочется высказать слова искренней благодарности генеральному 
          директору вашего агентства  и эксперту... 
          <a href="#">Читать далее →</a></p>
        </div>
      </swiper-slide>
            <swiper-slide>
        <div class="sliders-contents">
        <img src="https://i.miel.ru/persons/3505433_thumb.jpg" >
        <p> Вера Ботова </p>
        <p>Хочется высказать слова искренней благодарности генеральному 
          директору вашего агентства  и эксперту... 
          <a href="#">Читать далее →</a></p>
        </div>
      </swiper-slide>
            <swiper-slide>
        <div class="sliders-contents">
        <img src="https://i.miel.ru/persons/3505433_thumb.jpg" >
        <p> Вера Ботова </p>
        <p>Хочется высказать слова искренней благодарности генеральному 
          директору вашего агентства  и эксперту... 
          <a href="#">Читать далее →</a></p>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
      return {
        swiperOption: {
          effect: 'cube',
          grabCursor: true,
          cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94
          },
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    }
}
</script>

<style scoped>
.slider-swiper-block {
    margin-top: 100px;
    margin-bottom: 100px;
  }
  .example-3d {
    position: relative;
    overflow: hidden;
    height: 360px;
    padding: 15px;
  }
.swiper {
    width: 400px !important;
    margin-top: -3% !important;
    left: 47%;
    top: 50%;
    margin-left: -150px;
    margin-top: -150px;
}
  .swiper-slide {
    display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: bold;
      background-color: rgb(255, 255, 255);
      background-color: #ffe176;
      background-position: center;
      background-size: cover;
       color: rgb(56, 56, 56);
  }
  .sliders-contents {
    margin: 35px;
  }
  a{
     color: rgb(56, 56, 56);
  }
</style>