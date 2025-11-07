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

const infractions = computed(() => data.value || [])
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold mb-1">Welcome to TIP</h1>
    <h2 class="mb-6">Where we record teacher infractions</h2>

    <h2 class="text-2xl font-bold mb-2">Recent Infractions</h2>
    <InfractionList v-if="infractions.length" :infractions="infractions" />
    <p v-else>No recent infractions.</p>

    <p class="text-muted italic mt-6">
      In case it wasn't clear: this is a parody. Please don't take this
      seriously :)
    </p>
  </div>
</template>
