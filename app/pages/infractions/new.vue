<script setup lang="ts">
const toast = useToast()

const { data: teachersData, error: teachersError } = await useFetch<
  DBTeacher[]
>('/api/teachers')
if (teachersError.value) {
  toast.add({
    color: 'error',
    title: 'Failed to load teachers',
    description: teachersError.value.message,
  })
}
const teachers = computed(() => teachersData.value || [])

const state = reactive({
  teacher_id: null,
})
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">Add infraction</h1>

    <p>{{ teachers }}</p>
    <p>{{ state }}</p>
  </div>
</template>
