<template>
    <div class="row">
      <div v-for="(item, key) of items" :key="key" class="col-md-3 mb-5">
        <div class="card h-100">
          <img class="card-img-top" :src="require(`~/assets/${item.img}.jpg`)" :alt="item.title">
          <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>
            <p class="card-text">{{item.text}}</p>
          </div>
          <!--
          <div class="card-footer">
            <nuxt-link to="#" class="btn btn-primary">Подробнее...</nuxt-link>
          </div>
          -->
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'HowRepair',
        data() {
            return {
                items: [
                    {title: 'Разбираем и диагностируем', text: 'Полностью рабираем турбину и проверяем состояние всех узлов турбины', img: 'diag'},
                    {title: 'Меняем плохое на хорошее', text: 'Заменяем изношенные детали турбины', img: 'repair'},
                    {title: 'Балансируем', text: 'Чтобы бы турбины в дальнейшем правильно и долго работала мы балансируем отдельно вал и турбину в сборе.', img: 'balance'},
                    {title: 'Даем гарантию', text: 'Мы даеам гарантию 6 месяцев а так же рекомендации по установке.', img: 'done'}
                ]
            }
        }
    }
</script>