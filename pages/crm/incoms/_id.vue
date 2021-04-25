<template>
    <div v-if="mounted">
        <b-card :title="`Заказ №${incomData.id}`">
            <b-card-sub-title class="mb-2">
                <span :class="{
                    ['text-primary']: incomData.status == 'Новая',
                    ['text-warning']: incomData.status == 'Обзвонен',
                    ['text-danger']: incomData.status == 'Отменена'
                }">{{incomData.status}}</span>
            </b-card-sub-title>
            <b-card-text>
                <p>Дата заявки: <b>{{new Date(incomData.createAt).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}}</b></p>
                <p>Имя: <b>{{incomData.name}}</b></p>
                <p>Телефон: <b>{{incomData.phone}}</b></p>
            </b-card-text>
            <b-button size="sm" variant="warning" @click="setIncomStatus('Обзвонен')">Обзвонен</b-button>
            <b-button size="sm" variant="danger" @click="setIncomStatus('Отменена')">Отменена</b-button>
        </b-card>
    </div>
</template>

<script>
    export default {
        layout: 'crm',
        data() {
            return {
                incomData: {},
                mounted: false
            }
        },
        methods: {
          async getIncom() {
            const collection = this.$fire.firestore.collection('incoms')
            try {
              const incomDoc = await collection.doc(this.$route.params.id).onSnapshot(doc => {
                this.incomData = doc.data()
                this.mounted = true
              })
            } catch (e) {
            alert(e)
            return
            }
          },
          async setIncomStatus(status) {
              await this.$fire.firestore.collection('incoms').doc(this.$route.params.id).set({
                  ...this.incomData,
                  status
              });
          }
        },
        mounted() {
            this.getIncom()
        }
    }
</script>