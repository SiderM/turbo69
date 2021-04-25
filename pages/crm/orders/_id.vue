<template>
    <div v-if="mounted">
        Заказ №{{orderData.id}}
        <b-button size="sm" variant="success" @click="closeOrder">Выдан</b-button>
        <ul>
            <li>{{orderData.name}}</li>
            <li>{{orderData.phone}}</li>
        </ul>
        <p>Турбина: <b>{{ orderData.turbine.Turbo_Maker}} {{orderData.turbine.Turbo_Model}}</b></p>
        <p>Запчасти</p>
        <ul>
            <li>Ремкомплект: <b>{{orderData.turbine.Service_kits}}</b> <span class="badge badge-info">Есть на складе</span></li>
            <li>Картридж: <b>{{orderData.turbine.CHRA}}</b> <span class="badge badge-danger">Нет на складе</span></li>
            <li>Корпус: <b>{{orderData.turbine.BH}}</b> <span class="badge badge-danger">Нет на складе</span></li>
            <li>Вал: <b>{{orderData.turbine.SW}}</b> <span class="badge badge-danger">Нет на складе</span></li>
            <li>Колесо: <b>{{orderData.turbine.CW}}</b> <span class="badge badge-danger">Нет на складе</span></li>
        </ul>
    </div>
</template>

<script>
    export default {
        layout: 'crm',
        data() {
            return {
                orderData: {},
                mounted: false
            }
        },
        methods: {
          async getOrder() {
            const messageRef = this.$fire.firestore.collection('orders')
            try {
              const messageDoc = await messageRef.doc(this.$route.params.id).get()
              this.orderData = messageDoc.data()
              this.mounted = true
              console.log(this.orderData)
            } catch (e) {
            alert(e)
            return
            }
          },
          async closeOrder() {
              const res = await this.$fire.firestore.collection('orders').doc(this.$route.params.id).set({
                  ...this.orderData,
                  status: 'Выдан'
              });
          }
        },
        mounted() {
            this.getOrder()
        }
    }
</script>