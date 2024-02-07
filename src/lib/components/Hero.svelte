<script lang="ts">
  import emblaCarouselSvelte, { type EmblaOptionsType } from 'embla-carousel-svelte';
  import Autoplay from 'embla-carousel-autoplay';
  import slide1 from '$lib/images/slide-1.png';
  import slide2 from '$lib/images/slide-2.png';

  let options: EmblaOptionsType = {
    loop: true,
    slidesToScroll: 'auto',
    containScroll: 'trimSnaps'
  };
  let plugins = [Autoplay()];
</script>

<a href="/product">
  <div class="embla" use:emblaCarouselSvelte={{ options, plugins }}>
    <div class="embla__container d-flex">
      <div class="embla__slide">
        <img src={slide1} alt="" class="he-100 w-100" crossorigin="anonymous" />
      </div>
      <div class="embla__slide">
        <img src={slide2} alt="" class="he-100 w-100" crossorigin="anonymous" />
      </div>
    </div>
  </div>
</a>

<style lang="scss">
  .embla {
    overflow: hidden;
  }
  .embla__container {
    height: 355px;
  }
  .embla__slide {
    img {
      object-fit: cover;
      object-position: 30% bottom;
    }
    flex: 0 0 100%;
    min-width: 0;
  }
</style>
