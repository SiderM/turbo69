<template>
<div>
        <navigation/>
        <head-video/>
        <div class="container">
            <info/>
            <h2 class="text-center mb-3">Как мы ремнотируем</h2>
            <hr>
            <how-repair/>
            <h2 class="text-center mb-3">Стоимость ремонта</h2>
            <hr>
            <pricing/>
            <section class="container">
              <div v-if="isMounted">
                <yandex-map :coords="[56.864974, 35.980006]" zoom="16" class="map">
                  <ymap-marker markerId="123" marker-type="placemark" hint-content="TURBO69" :coords="[56.864974, 35.980006]"></ymap-marker>
                </yandex-map>
              </div>
            </section>
        </div>
        <foot/>
    </div>
</template>

<script>
export default {
  data: () => ({
    isMounted: false
  }),
  mounted() {
    this.isMounted = true;
  }
}
</script>

<style>
.ymap-container {
  height: 600px;
}
</style>