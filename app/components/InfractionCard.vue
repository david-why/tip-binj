<script setup lang="ts">
const { infraction } = defineProps<{
  infraction: GetInfractionResult
}>()

const date = computed(() => new Date(infraction.created_at))
</script>

<template>
  <UCard variant="subtle">
    <h3 class="text-xl font-semibold mb-1">
      {{ infraction.teacher_name }}
    </h3>
    <h4 class="mb-1">
      {{ infraction.type_name }} @ {{ infraction.location_name }}
    </h4>
    <p>
      <time :datetime="date.toISOString()">{{ date.toLocaleString() }}</time>
    </p>
  </UCard>
</template>
