<template>
  <div class="row">
    <div
      v-for="(item, key) of pricing"
      :key="key"
      class="col-md-3 mb-5 mx-auto"
    >
      <div class="card h-100 shadow">
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">{{ item.title }}</h6>
          <h5 class="card-title mt-3">
            от {{ item.price
            }}<span
              ><img src="https://img.icons8.com/metro/30/000000/ruble.png"
            /></span>
          </h5>
          <hr />
          <div class="card-text">
            <ul class="fa-ul">
              <li v-for="(service, key) in item.services" :key="key">
                <span class="fa-li"><i class="fas fa-check"></i></span
                >{{ service }}
              </li>
            </ul>
          </div>
        </div>
        <div class="card-footer">
          <button
            v-if="$device.isDesktop"
            @click="$bvModal.show('bv-modal-form')"
            class="btn btn-primary"
          >
            Отправить заявку &raquo;
          </button>
          <nuxt-link v-else to="/incom" class="btn btn-primary"
            >Отправить заявку &raquo;</nuxt-link
          >
        </div>
      </div>
    </div>

    <b-modal id="bv-modal-form" hide-footer>
      <template #modal-title>Заявка на ремонт</template>
      <div class="d-block text-center">
        <div role="group">
          <label for="input-live">Ваше имя:</label>
          <b-form-input
            id="input-live"
            v-model="form.name"
            placeholder="Александр"
            trim
          />
          <label for="input-live">Номер телефона:</label>
          <b-form-input
            id="input-live"
            v-model="form.phone"
            placeholder="+7(999)888-7766"
            v-facade="'+7(###)###-####'"
          />
          <b-form-text id="input-live-help"
            >+7 добавляется автоматически.</b-form-text
          >
          <b-button
            class="mt-3"
            variant="primary"
            block
            @click="sentIncom(form)"
            >Отправить</b-button
          >
        </div>
      </div>

      <b-button class="mt-3" @click="$bvModal.hide('bv-modal-form')"
        >Закрыть</b-button
      >
    </b-modal>

    <b-modal id="bv-modal-sented" hide-footer>
      <template #modal-title>Заявка на ремонт</template>
      <div class="d-block text-center">
        <h2>Заявка отправлена</h2>
        <h3>
          Спасибо, <b>{{ form.name }}</b
          >, что обратились к нам!
        </h3>
        <h3>
          В ближайшее время мы позвоним Вам по номеру <b>{{ form.phone }}</b
          >!
        </h3>
      </div>

      <b-button class="mt-3" @click="$bvModal.hide('bv-modal-sented')"
        >Закрыть</b-button
      >
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Pricing",
  data() {
    return {
      pricing: [
        {
          title: "Ремонт турбины",
          price: 8500,
          services: [
            "Проверка состояния и зазоров ГМУ",
            "Проверка герметичности ГМУ",
            "Замена необходимых запчастей",
            "Балансировка вала",
            "Балансировка турбины",
          ],
        },
        {
          title: "Профилактика турбины",
          price: 3500,
          services: ["Проверка герметичности ГМУ", "Балансировка турбины"],
        },
        {
          title: "Ремонт электронного актуатора",
          price: 4500,
          services: [
            "Замена необходимых запчастей",
            "Проверка крайних положений и плавности хода актуатора",
          ],
        },
      ],
      form: {
        name: "",
        phone: "",
      },
    };
  },
  methods: {
    async sentIncom(form) {
      const messageRef = this.$fire.firestore
        .collection("incoms")
        .doc(form.phone);
      try {
        await messageRef.set({
          ...form,
          status: "new",
          createAt: Date.now(),
        });
        this.$bvModal.hide("bv-modal-form");
        this.$bvModal.show("bv-modal-sented");
      } catch (e) {
        alert(e);
        return;
      }
    },
  },
};
</script>