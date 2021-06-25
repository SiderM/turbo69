<template>
  <div v-if="mounted">
    <b-row>
      <b-col>
        <b-card header="Всего заказов" class="text-center">
          <b-card-text>
            <h1>{{ ordersList.length }}</h1>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          header="Новых заказов"
          header-bg-variant="primary"
          header-text-variant="white"
          class="text-center"
        >
          <b-card-text>
            <h1>{{ ordersStatus.new }}</h1>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          header="Ждет запчасти"
          header-bg-variant="info"
          header-text-variant="white"
          class="text-center"
        >
          <b-card-text>
            <h1>{{ ordersStatus.zap }}</h1>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card header="Готов" header-bg-variant="warning" class="text-center">
          <b-card-text>
            <h1>{{ ordersStatus.complete }}</h1>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          header="Выдан"
          header-bg-variant="success"
          header-text-variant="white"
          class="text-center"
        >
          <b-card-text>
            <h1>{{ ordersStatus.done }}</h1>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="my-2">
      <b-col>
        <NuxtLink to="/crm/orders/new"
          ><b-button size="sm" variant="primary"
            >Новый заказ</b-button
          ></NuxtLink
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card title="Заказы">
          <b-table
            sticky-header="50vh"
            hover
            :busy="loading"
            :items="ordersList"
            :fields="fields"
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Загрузка...</strong>
              </div>
            </template>
            <template #cell(status)="data">
              <span
                class="badge"
                :class="{
                  ['badge-primary']: data.item.status == 'Новый',
                  ['badge-info']: data.item.status == 'Ждет запчасти',
                  ['badge-warning']: data.item.status == 'Готов',
                  ['badge-success']: data.item.status == 'Выдан',
                }"
                >{{ data.item.status }}</span
              >
            </template>
            <template #cell(created)="data">
              <p>
                {{
                  data.item.created.toLocaleString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </p>
            </template>
            <template #cell(action)="data">
              <NuxtLink :to="`/crm/orders/${data.item.link}`"
                ><b-button size="sm">Открыть</b-button></NuxtLink
              >
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  layout: "crm",
  data() {
    return {
      ordersList: [],
      ordersStatus: {
        new: 0,
        zap: 0,
        complete: 0,
        done: 0,
      },
      mounted: false,
      loading: true,
      fields: [
        { key: "id", label: "Номер" },
        { key: "name", label: "Имя" },
        { key: "phone", label: "Телефон" },
        { key: "turbine", label: "Турбина" },
        { key: "status", label: "Статус" },
        { key: "created", label: "Дата" },
        { key: "action", label: "Действие" },
      ],
    };
  },
  methods: {
    async getOrders() {
      const collection = this.$fire.firestore.collection("orders");
      try {
        const ordersDoc = await collection.orderBy("id", "desc").get();
        ordersDoc.forEach((element) => {
          this.ordersList.push({
            link: element.id,
            id: element.data().id,
            name: element.data().name,
            phone: element.data().phone,
            turbine: element.data().turbine.OE_No,
            status: element.data().status,
            created: new Date(element.data().createAt),
          });
        });
        this.loading = false;
        this.ordersList.forEach((item) => {
          switch (item.status) {
            case "Новый":
              this.ordersStatus.new++;
              break;
            case "Ждет запчасти":
              this.ordersStatus.zap++;
              break;
            case "Готов":
              this.ordersStatus.complete++;
              break;
            case "Выдан":
              this.ordersStatus.done++;
              break;
          }
        });
      } catch (e) {
        alert(e);
        return;
      }
    },
  },
  mounted() {
    this.getOrders();
    this.mounted = true;
  },
};
</script>

<style scoped>
</style>