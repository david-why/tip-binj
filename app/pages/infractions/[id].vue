<script setup lang="ts">
const route = useRoute()
const toast = useToast()

const infractionID = parseInt(route.params.id as string)

const { data, error } = await useFetch<GetInfractionResult>(
  `/api/infractions/${infractionID}`
)
if (error.value) {
  const message =
    error.value.statusCode == 404 ? 'Infraction not found' : error.value.message
  toast.add({
    color: 'error',
    title: 'Failed to fetch infraction',
    description: message,
  })
  throw navigateTo('/infractions')
}

const { data: teacherInfractions } = await useFetch<GetInfractionResult[]>(
  `/api/teachers/${data.value?.teacher_id}/infractions`
)

const infraction = computed(
  () =>
    data.value ?? {
      id: 0,
      user_id: 0,
      user_email: '',
      user_name: null,
      teacher_id: 0,
      teacher_email: '',
      teacher_name: null,
      type_id: 0,
      type_name: '',
      type_description: null,
      location_id: 0,
      location_name: '',
      location_description: null,
      notes: null,
      created_at: 0,
    }
)
const date = computed(() => new Date(infraction.value.created_at))
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold mb-4">
      {{ infraction.teacher_name }}, {{ infraction.type_name }} @
      {{ infraction.location_name }}
    </h1>
    <p class="mb-2">
      <span class="font-bold">Total infractions</span>:
      {{ teacherInfractions?.length || 0 }}
    </p>
    <p class="mb-2">
      <span class="font-bold">Time</span>:
      <time :datetime="date.toISOString()">{{ date.toLocaleString() }}</time>
    </p>
    <p class="mb-2">
      <span class="font-bold">Type</span>: {{ infraction.type_name }}
    </p>
    <p class="mb-2">
      <span class="font-bold">Location</span>: {{ infraction.location_name }}
    </p>
    <div v-if="infraction.notes" class="mb-2">
      <p class="mb-1"><span class="font-bold">Notes</span>:</p>
      <p class="whitespace-pre-wrap">{{ infraction.notes }}</p>
    </div>

    <div class="border-b border-muted my-4" />

    <h2 class="text-2xl font-bold mb-4">
      More from {{ infraction.teacher_name }}
    </h2>

    <InfractionList
      v-if="teacherInfractions?.length"
      :infractions="teacherInfractions"
    />
  </div>
</template>
