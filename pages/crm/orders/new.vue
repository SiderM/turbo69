<template>
  <div class="row">
    <div class="col">
      <form @submit.prevent="saveOrder()">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Имя</label>
          <input type="text" v-model="name" class="form-control" id="exampleInputEmail1" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Телефон</label>
          <input type="text" v-facade="'+7(###)###-####'" placeholder="+7(999)888-7766" required v-model="phone" class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="mb-3">
          <label for="exampleInputNumber" class="form-label"
            >Номер турбины</label
          >
          <input
            v-model="query"
            type="text"
            class="form-control"
            id="exampleInputNumber"
          />
          <div v-if="selected" id="emailHelp" class="form-text">
            Выбрана турбина: <b>{{ turbine.Turbo_Maker }} {{ turbine.Turbo_Model }}</b>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Сохранить</button>
      </form>
    </div>
    <div class="col">
        <div class="list-group" v-if="query != '' && filteredParts.length > 0">
            <button v-for="(item, k) in filteredParts"
                :key="k" 
                @click="selectTurbine(item)"
                type="button" class="list-group-item list-group-item-action">
                {{ item.Turbo_Maker }}
                {{ turbine.Turbo_Model }}
                {{ item.OE_No }}
                {{ item.Vehicle }}
            </button>
        </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "newOrder",
  layout: "crm",
  data() {
    return {
      query: "",
      name: '',
      phone: '',
      turbine: {},
      selected: false,
      turbineList: [],
      orderID: ''
    };
  },
  computed: {
            filteredParts() {
                return this.turbineList.filter(part => {
                    if(part.OE_No != undefined) {
                        return part.OE_No.toLowerCase().includes(this.query.toLowerCase())
                    }
                    else if(part.Vehicle != undefined){
                        return part.Vehicle.toLowerCase().includes(this.query.toLowerCase())
                    }
                })
            },
        },
  methods: {
      getTurbine() {
                this.$axios.$get('/turbine.json').then(response => this.turbineList = response)
      },
      selectTurbine(item) {
        this.turbine = item
        this.selected = true
      },
      async saveOrder() {
        const messageRef = this.$fire.firestore.collection("orders")
        try {
          const res = await messageRef.add({
            id: await messageRef.get().then((res) => res.size + 1),
            name: this.name,
            phone: this.phone,
            status: 'Новый',
            turbine: this.turbine,
            createAt: Date.now()
          })
          this.$router.push(`/crm/orders/${res.id}`)
        } catch (e) {
          alert(e);
          return;
        }
      },
  },
    mounted() {
        this.getTurbine()
    }
};
</script>