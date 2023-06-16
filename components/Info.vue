<template>
  <div class="row">
    <div class="col-md-8 mb-5">
      <h2>Восстановление турбокомпрессоров</h2>
      <hr />
      <p>
        Из практики известно, что полностью отремонтированная турбина прослужит
        не хуже чем новая. Опыт наблюдения показывает, что разница в сроке
        эксплуатации между новым и восстановленным турбокомпрессором
        несущественна или вовсе отсутствует. К тому же, уже достаточно много
        турбин затруднительно приобрести, а иногда просто невозможно найти по
        причине снятия таковых с производства.
      </p>
      <button
        v-if="$device.isDesktop"
        @click="$bvModal.show('bv-modal-info-form')"
        class="btn btn-primary btn-lg"
      >
        Отправить заявку &raquo;
      </button>
      <nuxt-link v-else class="btn btn-primary btn-lg" to="/incom"
        >Отправить заявку &raquo;</nuxt-link
      >
    </div>
    <div class="col-md-4 mb-5">
      <h2>Контакты</h2>
      <hr />
      <address>
        <strong>Наши контакты</strong>
        <br />г.Тверь <br />Сахаровское шоссе д.32/1 бокс №10
        <br />
      </address>
      <address>
        <span title="Phone">Телефон: </span>
        <a href="tel:+79201691169">+7 (920) 169-11-69</a>
        <br />
        <span title="Email">E-Mail: </span>
        <a href="mailto:tverturbo@yandex.ru">tverturbo@yandex.ru</a>
      </address>
    </div>
    <b-modal id="bv-modal-info-form" hide-footer>
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

      <b-button class="mt-3" @click="$bvModal.hide('bv-modal-info-form')"
        >Закрыть</b-button
      >
    </b-modal>

    <b-modal id="bv-modal-info-sented" hide-footer>
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

      <b-button class="mt-3" @click="$bvModal.hide('bv-modal-info-sented')"
        >Закрыть</b-button
      >
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      form: {
        name: "",
        phone: "",
      },
    };
  },
  methods: {
    async sentIncom(form) {
      const messageRef = this.$fire.firestore.collection("incoms")
      try {
        const res = await messageRef.add({
          id: await messageRef.get().then((res) => res.size + 1),
          name: form.name,
          phone: form.phone,
          status: "Новая",
          createAt: Date.now(),
        });
        this.$bvModal.hide("bv-modal-info-form");
        this.$bvModal.show("bv-modal-info-sented");
      } catch (e) {
        alert(e);
        return;
      }
    },
  },
};
</script>

<style scoped>
</style>
