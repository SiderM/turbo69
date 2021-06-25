<template>
  <div v-if="mounted">
    <b-card :title="`Заказ №${orderData.id}`">
      <b-card-sub-title class="mb-2">
        <span
          :class="{
            ['text-primary']: orderData.status == 'Новый',
            ['text-info']: orderData.status == 'Ждет запчасти',
            ['text-warning']: orderData.status == 'Готов',
            ['text-success']: orderData.status == 'Выдан',
          }"
          >{{ orderData.status }}</span
        >
      </b-card-sub-title>
      <b-row>
        <b-col>
          <b-card-text>
            <p>
              Дата приема:
              <b>{{
                new Date(orderData.createAt).toLocaleString("ru-RU", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}</b>
            </p>
            <p>
              Имя: <b>{{ orderData.name }}</b>
            </p>
            <p>
              Телефон:
              <input
                type="text"
                v-facade="'+7(###)###-####'"
                placeholder="+7(999)888-7766"
                required
                v-if="editNumberSelect"
                v-model="orderData.phone"
              />
              <b v-else>{{ orderData.phone }}</b>
              <button
                v-if="editNumberSelect"
                @click="editNumber(orderData.phone)"
                type="button"
                class="btn btn-success btn-sm"
              >
                Сохранить
              </button>
              <button
                v-else
                @click="editNumberSelect = true"
                type="button"
                class="btn btn-primary btn-sm"
              >
                Изменить
              </button>
            </p>
            <p>
              Турбина:
              <b v-if="orderData.turbine.Turbo_Maker"
                >{{ orderData.turbine.Turbo_Maker }}
                {{ orderData.turbine.Turbo_Model }}</b
              >
              <b v-else>Нет данных</b>
            </p>
            <p>
              Номер производителя:
              <b>{{ orderData.turbine.OE_No }}</b>
            </p>
            <p>
              Предворительная стоимость: <b>{{ orderData.prePrice }}</b>
            </p>
          </b-card-text>
        </b-col>
        <b-col>
          <b-card-text>
            <b-list-group>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span
                  >Ремкомплект:
                  <b v-if="orderData.turbine.Service_kits">{{
                    orderData.turbine.Service_kits
                  }}</b
                  ><b v-else>Нет данных</b></span
                >
                <b-badge v-if="partsStatus.sk" variant="success" pill
                  >Есть на складе</b-badge
                >
                <b-badge v-else variant="danger" pill>Нет на складе</b-badge>
              </b-list-group-item>

              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span
                  >Корпус:
                  <b v-if="orderData.turbine.BH">{{ orderData.turbine.BH }}</b
                  ><b v-else>Нет данных</b></span
                >
                <b-badge v-if="partsStatus.bh" variant="success" pill
                  >Есть на складе</b-badge
                >
                <b-badge v-else variant="danger" pill>Нет на складе</b-badge>
              </b-list-group-item>

              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span
                  >Вал:
                  <b v-if="orderData.turbine.SW">{{ orderData.turbine.SW }}</b
                  ><b v-else>Нет данных</b></span
                >
                <b-badge v-if="partsStatus.sw" variant="success" pill
                  >Есть на складе</b-badge
                >
                <b-badge v-else variant="danger" pill>Нет на складе</b-badge>
              </b-list-group-item>

              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span
                  >Колесо:
                  <b v-if="orderData.turbine.CW">{{ orderData.turbine.CW }}</b
                  ><b v-else>Нет данных</b></span
                >
                <b-badge v-if="partsStatus.cw" variant="success" pill
                  >Есть на складе</b-badge
                >
                <b-badge v-else variant="danger" pill>Нет на складе</b-badge>
              </b-list-group-item>

              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span
                  >Задняя крышка:
                  <b v-if="orderData.turbine.Seal_Plates">{{
                    orderData.turbine.Seal_Plates
                  }}</b
                  ><b v-else>Нет данных</b></span
                >
                <b-badge v-if="partsStatus.sp" variant="success" pill
                  >Есть на складе</b-badge
                >
                <b-badge v-else variant="danger" pill>Нет на складе</b-badge>
              </b-list-group-item>

              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span
                  >Картридж:
                  <b v-if="orderData.turbine.CHRA">{{
                    orderData.turbine.CHRA
                  }}</b
                  ><b v-else>Нет данных</b></span
                >
                <b-badge v-if="partsStatus.chra" variant="success" pill
                  >Есть на складе</b-badge
                >
                <b-badge v-else variant="danger" pill>Нет на складе</b-badge>
              </b-list-group-item>
            </b-list-group>
          </b-card-text>
        </b-col>
      </b-row>
      <b-button
        size="sm"
        variant="info"
        @click="setOrderStatus('Ждет запчасти')"
        >Ждет запчасти</b-button
      >
      <b-button size="sm" variant="warning" @click="setOrderStatus('Готов')"
        >Готов</b-button
      >
      <b-button size="sm" variant="success" @click="setOrderStatus('Выдан')"
        >Выдан</b-button
      >
    </b-card>
  </div>
</template>

<script>
export default {
  layout: "crm",
  data() {
    return {
      editNumberSelect: false,
      orderData: {},
      partsStatus: {
        sk: false,
        bh: false,
        sw: false,
        cw: false,
        sp: false,
        chra: false,
      },
      mounted: false,
    };
  },
  methods: {
    async editNumber(phone) {
      await this.$fire.firestore
        .collection("orders")
        .doc(this.$route.params.id)
        .set({
          ...this.orderData,
          phone,
        });
      this.editNumberSelect = false;
    },
    async getOrder() {
      const collection = await this.$fire.firestore.collection("orders");
      const parts_collection = await this.$fire.firestore.collection("parts");
      try {
        const orderDoc = await collection
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            this.orderData = doc.data();
            parts_collection
              .doc(this.orderData.turbine.Service_kits)
              .get()
              .then((doc) => {
                this.partsStatus.sk =
                  doc.data().qty && doc.data().qty > 0 ? true : false;
              });
            parts_collection
              .doc(this.orderData.turbine.BH)
              .get()
              .then((doc) => {
                this.partsStatus.bh =
                  doc.data().qty && doc.data().qty > 0 ? true : false;
              });
            parts_collection
              .doc(this.orderData.turbine.SW)
              .get()
              .then((doc) => {
                this.partsStatus.sw =
                  doc.data().qty && doc.data().qty > 0 ? true : false;
              });
            parts_collection
              .doc(this.orderData.turbine.CW)
              .get()
              .then((doc) => {
                this.partsStatus.cw =
                  doc.data().qty && doc.data().qty > 0 ? true : false;
              });
            parts_collection
              .doc(this.orderData.turbine.Seal_Plates)
              .get()
              .then((doc) => {
                this.partsStatus.sp =
                  doc.data().qty && doc.data().qty > 0 ? true : false;
              });
            parts_collection
              .doc(this.orderData.turbine.CHRA)
              .get()
              .then((doc) => {
                this.partsStatus.chra =
                  doc.data().qty && doc.data().qty > 0 ? true : false;
              });
            this.mounted = true;
          });
      } catch (e) {
        alert(e);
        return;
      }
    },
    async setOrderStatus(status) {
      await this.$fire.firestore
        .collection("orders")
        .doc(this.$route.params.id)
        .set({
          ...this.orderData,
          status,
        });
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>