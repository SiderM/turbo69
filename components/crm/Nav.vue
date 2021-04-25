<template>
    <div class="c-sidebar c-sidebar-fixed c-sidebar-md-show">
      <div class="c-sidebar-brand">
        <h5>Панель управления</h5>
      </div>
      <ul class="c-sidebar-nav">
        <li class="c-sidebar-nav-item">
          <NuxtLink to="/crm/orders" class="c-sidebar-nav-link">Заказы</NuxtLink>
        </li>
        <li class="c-sidebar-nav-item">
          <NuxtLink class="c-sidebar-nav-link" to="/crm/incoms">Заявки<span class="badge badge-info">{{newIncomCount}}</span></NuxtLink>
        </li>
      </ul>
  </div>
</template>

<script>
    export default {
        name: 'Navigation',
        data() {
          return {
            newIncomCount: 0
          }
        },
        methods: {
          async getIncoms() {
            const collection = this.$fire.firestore.collection('incoms')
            try {
              const incomsDoc = await collection.where('status', '==', 'Новая').onSnapshot(element => {
                this.newIncomCount = element.size
              })
            } catch (e) {
            alert(e)
            return
            }
          },
        },
        mounted() {
          this.getIncoms()
        }
    }
</script>

<style scoped>

</style>