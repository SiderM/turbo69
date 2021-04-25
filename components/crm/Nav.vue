<template>
    <div class="c-sidebar c-sidebar-fixed c-sidebar-md-show">
      <div class="c-sidebar-brand">
        <h5>Панель управления</h5>
      </div>
      <ul class="c-sidebar-nav">
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="index.html">Статистика</a>
        </li>
        <li class="c-sidebar-nav-item">
          <NuxtLink to="/crm/orders" class="c-sidebar-nav-link">Заказы</NuxtLink>
        </li>
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="index.html">Заявки<span class="badge badge-info">3</span></a>
        </li>
      </ul>
  </div>
</template>

<script>
    export default {
        name: 'Navigation'
    }
</script>

<style scoped>

</style>