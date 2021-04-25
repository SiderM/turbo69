<template>
  <div>
    <b-row>
      <b-col sm="8">col-sm-8</b-col>
      <b-col sm="4">col-sm-4</b-col>
    </b-row>
    <b-row class="my-2">
      <b-col>
        <NuxtLink to="/crm/orders/new"><b-button size="sm" variant="primary">Новый заказ</b-button></NuxtLink>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card title="Заказы">
          <b-table sticky-header="50vh" hover :busy="isBusy" :items="ordersList" :fields="fields">
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Загрузка...</strong>
              </div>
            </template>
            <template #cell(status)="data">
              <span class="badge" :class="{['badge-info']: data.item.status == 'Новый', ['badge-success']: data.item.status == 'Выдан'}">{{ data.item.status}}</span>
            </template>
             <template #cell(created)="data">
              <p>{{data.item.created.toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}}</p>
            </template>
            <template #cell(action)="data">
              <NuxtLink :to="`/crm/orders/${data.item.link}`"><b-button size="sm">Открыть</b-button></NuxtLink>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    export default {
        layout: 'crm',
        data() {
          return {
            ordersList: [],
            isBusy: true,
            fields: [
              { key: 'id', label: 'Номер' },
              { key: 'name', label: 'Имя'},
              { key: 'phone', label: "Телефон" },
              { key: 'turbine', label: 'Турбина' },
              { key: 'status', label: "Статус" },
              { key: 'created', label: "Дата" },
              { key: 'action', label: 'Действие' }
            ],
          }
        },
        methods: {
          async getOrders() {
            const messageRef = this.$fire.firestore.collection('orders')
            try {
              const messageDoc = await messageRef.orderBy('id', 'desc').get()
              messageDoc.forEach(element => {
                this.ordersList.push({
                  link: element.id,
                  id: element.data().id,
                  name: element.data().name,
                  phone: element.data().phone,
                  turbine: `${element.data().turbine.Turbo_Maker} ${element.data().turbine.Turbo_Model}`,
                  status: element.data().status,
                  created: new Date(element.data().createAt)
                })
                this.isBusy = false
              });
            } catch (e) {
            alert(e)
            return
            }
          }
        },
        mounted() {
          this.getOrders()
        }
    }
</script>

<style scoped>

</style>