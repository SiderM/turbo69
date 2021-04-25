<template>
    <div v-if="mounted">
    <b-row>
      <b-col>
        <b-card header="Всего заявок" class="text-center">
          <b-card-text>
            <h1>{{incomsList.length}}</h1>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card header="Новых заявок" header-bg-variant="primary" header-text-variant="white" class="text-center">
          <b-card-text>
            <h1>{{incomsStatus.new}}</h1>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card header="Обзвоненных заявок" header-bg-variant="warning" header-text-variant="white" class="text-center">
          <b-card-text>
            <h1>{{incomsStatus.call}}</h1>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card header="Отмененных заявок" header-bg-variant="danger" header-text-variant="white" class="text-center">
          <b-card-text>
            <h1>{{incomsStatus.break}}</h1>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card title="Заявки">
          <b-table sticky-header="50vh" hover :busy="loading" :items="incomsList" :fields="fields">
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Загрузка...</strong>
              </div>
            </template>
            <template #cell(status)="data">
              <span class="badge" :class="{
                ['badge-primary']: data.item.status == 'Новая',
                ['badge-warning']: data.item.status == 'Обзвонен',
                ['badge-danger']: data.item.status == 'Отменена',
                }">{{ data.item.status}}</span>
            </template>
             <template #cell(created)="data">
              <p>{{data.item.created.toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}}</p>
            </template>
            <template #cell(action)="data">
              <NuxtLink :to="`/crm/incoms/${data.item.link}`"><b-button size="sm">Открыть</b-button></NuxtLink>
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
            incomsList: [],
            incomsStatus: {
              new: 0,
              call: 0,
              break: 0
            },
            mounted: false,
            loading: true,
            fields: [
              { key: 'id', label: 'Номер' },
              { key: 'name', label: 'Имя'},
              { key: 'phone', label: "Телефон" },
              { key: 'status', label: "Статус" },
              { key: 'created', label: "Дата" },
              { key: 'action', label: 'Действие' }
            ],
          }
        },
        methods: {
          async getIncoms() {
            const collection = this.$fire.firestore.collection('incoms')
            try {
              await collection.orderBy('id', 'desc').onSnapshot(incomsDoc => {
                this.incomsList = []
                incomsDoc.forEach(element => {
                  this.incomsList.push({
                    link: element.id,
                    id: element.data().id,
                    name: element.data().name,
                    phone: element.data().phone,
                    status: element.data().status,
                    created: new Date(element.data().createAt)
                  })                
                });
              })
              
              this.loading = false
              await collection.where('status', '==', 'Новая').onSnapshot((res) => this.incomsStatus.new = res.size)
              await collection.where('status', '==', 'Обзвонен').onSnapshot((res) => this.incomsStatus.call = res.size)
              await collection.where('status', '==', 'Отменена').onSnapshot((res) => this.incomsStatus.break = res.size)
            } catch (e) {
            alert(e)
            return
            }
          },
          
        },
        mounted() {
          this.getIncoms()
          this.mounted = true
        }
    }
</script>

<style scoped>

</style>