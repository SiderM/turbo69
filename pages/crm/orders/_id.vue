<template>
    <div v-if="mounted">
        <b-card :title="`Заказ №${orderData.id}`">
            <b-card-sub-title class="mb-2">
                <span :class="{
                    ['text-primary']: orderData.status == 'Новый',
                    ['text-info']: orderData.status == 'Ждет запчасти',
                    ['text-warning']: orderData.status == 'Готов',
                    ['text-success']: orderData.status == 'Выдан'
                }">{{orderData.status}}</span>
            </b-card-sub-title>
            <b-row>
                <b-col>
                    <b-card-text>
                        <p>Дата приема: <b>{{new Date(orderData.createAt).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}}</b></p>
                        <p>Имя: <b>{{orderData.name}}</b></p>
                        <p>Телефон: <b>{{orderData.phone}}</b></p>
                        <p>Турбина: <b>{{ orderData.turbine.Turbo_Maker}} {{orderData.turbine.Turbo_Model}}</b></p>
                    </b-card-text>
                </b-col>
                <b-col>
                    <b-card-text>
                        <b-list-group>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <span>Ремкомплект: <b>{{orderData.turbine.Service_kits}}</b></span>
                                <b-badge variant="success" pill>Есть на складе</b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <span>Картридж: <b>{{orderData.turbine.CHRA}}</b></span>
                                <b-badge variant="danger" pill>Нет на складе</b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <span>Корпус: <b>{{orderData.turbine.BH}}</b></span>
                                <b-badge variant="danger" pill>Нет на складе</b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <span>Вал: <b>{{orderData.turbine.SW}}</b></span>
                                <b-badge variant="danger" pill>Нет на складе</b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <span>Колесо: <b>{{orderData.turbine.CW}}</b></span>
                                <b-badge variant="danger" pill>Нет на складе</b-badge>
                            </b-list-group-item>
                        </b-list-group>
                    </b-card-text>
                </b-col>
            </b-row>
            <b-button size="sm" variant="info" @click="setOrderStatus('Ждет запчасти')">Ждет запчасти</b-button>
            <b-button size="sm" variant="warning" @click="setOrderStatus('Готов')">Готов</b-button>
            <b-button size="sm" variant="success" @click="setOrderStatus('Выдан')">Выдан</b-button>
        </b-card>
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
            const collection = this.$fire.firestore.collection('orders')
            try {
              const orderDoc = await collection.doc(this.$route.params.id).onSnapshot(doc => {
                this.orderData = doc.data()
                this.mounted = true
              })
            } catch (e) {
            alert(e)
            return
            }
          },
          async setOrderStatus(status) {
              await this.$fire.firestore.collection('orders').doc(this.$route.params.id).set({
                  ...this.orderData,
                  status
              });
          }
        },
        mounted() {
            this.getOrder()
        }
    }
</script>