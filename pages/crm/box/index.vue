<template>
    <div>
    <b-row>
      <b-col>
        <NuxtLink to="/crm/box/add"><b-button size="sm" variant="primary">Добавить запчасть</b-button></NuxtLink>
      </b-col>
    </b-row>
    <b-row class="my-2">
      <b-col>
        <b-card title="Склад">
          <b-table sticky-header="50vh" hover :busy="loading" :items="partsList" :fields="fields">
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Загрузка...</strong>
              </div>
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
                partsList: [],
                loading: false,
                fields: [
                    { key: 'number', label: "Номер запчасти" },
                    { key: 'name', label: 'Наименование'},
                    { key: 'qty', label: 'Количество' }
                ],
            }
        },
        methods: {
            async getParts() {
            const collection = this.$fire.firestore.collection('parts')
            try {
              const partsDoc = await collection.orderBy('part_number', 'asc').get()
              partsDoc.forEach(element => {
                this.partsList.push({
                  name: element.data().part_name,
                  number: element.data().part_number,
                  qty: element.data().qty,
                })                
              });
              this.loading = false
            } catch (e) {
            alert(e)
            return
            }
          },
        },
        mounted() {
            this.getParts()
        }
    }
</script>

<style scoped>

</style>