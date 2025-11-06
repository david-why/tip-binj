<script setup lang="ts">
const toast = useToast()

const { data, error } = useFetch<GetInfractionResult[]>('/api/infractions')
if (error.value) {
  toast.add({
    color: 'error',
    title: 'Failed to fetch recent infractions',
    description: 'Please try again later.',
  })
}

const infractions = computed(() =>
  (data.value || []).map((i) => ({
    ...i,
    date: new Date(i.created_at),
  }))
)
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold mb-1">Welcome to TIP</h1>
    <h2 class="text-xl mb-6">Where we record teacher infractions</h2>

    <h2 class="text-2xl font-bold mb-2">Recent Infractions</h2>
    <ul
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      v-if="infractions.length"
    >
      <li v-for="infraction in infractions" :key="infraction.id">
        <UCard variant="subtle">
          <h3 class="text-xl font-semibold mb-1">
            {{ infraction.teacher_name }}
          </h3>
          <h4 class="mb-1">
            {{ infraction.type_name }} @ {{ infraction.location_name }}
          </h4>
          <p>
            <time :datetime="infraction.date.toISOString()">{{
              infraction.date.toLocaleString()
            }}</time>
          </p>
        </UCard>
      </li>
    </ul>
    <p v-else>No recent infractions.</p>

    <p class="text-muted italic mt-6">
      In case it wasn't clear: this is a parody. Please don't take this
      seriously :)
    </p>
  </div>
</template>
