<template>
    <div>
        <div class="container">
        <button class="button is-rounded" @click="$router.push(`/posts/${ratio}`)">НАЗАД </button>

         <div :class="hedeSliders">
          <swiper ref="swiper" class="swiper" :options="swiperOption" >
              <swiper-slide v-for="img of image" :key="img.href">
                    <div class="swiper-zoom-container">
                        <img :src="img.href">
                    </div>
                    <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
            </swiper-slide>


            </swiper>
            </div>

          <div class="tile is-parent is-12">

            <article class="tile is-child box">
            <p class="title">{{ title }}</p>

            <p class="">Дата и время добавления: {{ date }}</p>
            <p class="subtitle">Цена: {{ price }}</p>
            <p class="subtitle"><strong>Описание </strong></p>
            <div class="content">
                <p>
                    {{ text }}
                </p>
            </div>
            <div :class="hideMap">
                <GMap
                    ref="gMap"
                    :cluster="{options: {styles: clusterStyle}}"
                    :center="{lat: locations[0].lat, lng: locations[0].lng}"
                    :options="{fullscreenControl: false, styles: mapStyle}"
                    :zoom="15"
                    >
                    <GMapMarker
                        v-for="location in locations"
                        :key="location.id"
                        :position="{lat: location.lat, lng: location.lng}"

                        @click="currentLocation = location"
                    >
                        <GMapInfoWindow>
                        <code>
                            lat: {{ location.lat }},
                            lng: {{ location.lng }}
                        </code>
                        </GMapInfoWindow>
                    </GMapMarker>
                    </GMap>
                </div>
            </article>
        </div>
        </div>
    </div>
</template>


<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
    data: () => ({
        title: 'Загрузка...',
        text: '',
        ratio: 0,
        image: [],
        cart: null,
        date: 0,
        price: 0,
        id: null,
        currentLocation: {},
        locations: [
        {
            lat: 51.454790,
            lng: 41.974412
        },
        {
            lat: 45.815,
            lng: "15.9819"
        },
        {
            lat: "45.12",
            lng: "16.21"
        }
        ],
        pins: {
            selected: "data:image/png;base64,iVBORw0KGgo...",
            notSelected: "data:image/png;base64,iVBORw0KGgo..."
        },
        mapStyle: [],
        clusterStyle: [
        {
            url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
            width: 56,
            height: 56,
            textColor: "#fff"
        }
        ],
    hideMap: 'hideMap',
    hedeSliders: 'hideMap',
    image: [],

    swiperOption: {
        zoom: true,
        pagination: {
            el: '.swiper-pagination'
          },
        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
        }
    }


    }),
    components: {
        Swiper,
        SwiperSlide,
    },
    mounted() {
            this.$axios.$get(`/api/get/post/${this.$route.params.id}`)
            .then((res) => {
                if(res[0].coordinate.length > 10) {
                    this.locations[0].lat = Number(res[0].coordinate.split(',')[0].trim());
                    this.locations[0].lng = Number(res[0].coordinate.split(',')[1].trim());
                    this.hideMap = ''
                }
                this.ratio = res[0].ratio
                res[0].name ? this.title = res[0].name : 'Заголовок'
                res[0].text ? this.text = res[0].text : ''
                res[0].price ? this.price = res[0].price : 'Цена не указана'
                res[0].date ? this.date =  res[0].date.split('T')[0] + ' ' + res[0].date.split('T')[1].split('.')[0] : ' ? '
                if(JSON.parse(res[0].image).length > 0 ) {
                    this.hedeSliders = '';
                    console.log(JSON.parse(res[0].image))
                    this.image = JSON.parse(res[0].image)
                }
            })
    },
    methods: {

    }

}

</script>
<style >
  body {
    background: url('../../assets/back.jpg');
    min-height: 100vh;
  }
</style>
<style scoped>
    .hideMap {
        display: none;
    }
    .swiper {
        height: 400px;
        margin-top: 10px;
    }
    .swiper-slide {
      background: #444;
    }
</style>>
