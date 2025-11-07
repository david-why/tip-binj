<script setup lang="ts">
defineProps<{
  infractions: GetInfractionResult[]
}>()
</script>

<template>
  <ul
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <li v-for="infraction in infractions" :key="infraction.id">
      <ULink :href="`/infractions/${infraction.id}`" raw class="cursor-pointer">
        <InfractionCard :infraction="infraction" />
      </ULink>
    </li>
  </ul>
</template>
