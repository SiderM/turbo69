<template>
    <div class="row">
    <div class="col">
      <form @submit.prevent="addPart()">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Номер запчасти</label>
          <input type="text" v-model="part_number" class="form-control" id="exampleInputEmail1" />
          <div v-if="selected" id="emailHelp" class="form-text">
            Выбрана запчасть: <b>{{ part.part_number }} {{ part.part_name }}</b>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Добавить</button>
      </form>
    </div>
    <div class="col">
        <div class="list-group" v-if="part_number != '' && filteredParts.length > 0">
            <button v-for="(item, k) in filteredParts"
                :key="k"
                @click="selectPart(item)"
                type="button" class="list-group-item list-group-item-action">
                {{ item.part_number }}
                {{ item.part_name }}
            </button>
        </div>
      
    </div>
  </div>
</template>

<script>
    export default {
        layout: 'crm',
        data() {
            return {
                partsList: [],
                part_number: '',
                selected: false,
                part: {}
            }
        },
        computed: {
            filteredParts() {
                return this.partsList.filter(part => part.part_number.includes(this.part_number))
            },
        },
        methods: {
            getParts() {
                this.$axios.$get('/parts.json').then(response => this.partsList = response)
            },
            selectPart(item) {
                this.part = item
                this.selected = true
            },
            async addPart() {
                const messageRef = this.$fire.firestore.collection("parts")
                try {
                const res = await messageRef.doc(this.part.part_number).set({
                    part_name: this.part.part_name,
                    part_number: this.part.part_number,
                    qty: await messageRef.doc(this.part.part_number).get().then(res => res.data().qty + 1).catch(() => 1)
                })
                this.part_number = ''
                this.selected = false
                } catch (e) {
                alert(e);
                return;
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