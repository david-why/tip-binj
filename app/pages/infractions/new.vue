<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { AddInfractionSchema } from '~~/shared/schemas'

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
const newTeacherItem = { label: 'New teacher...', value: 0 }
const teacherItems = computed(() => [
  [newTeacherItem],
  teachers.value.map((t) => ({
    label: t.name || t.email,
    value: t.id,
  })),
])

const selectedTeacher = ref<{ label: string; value: number }>(newTeacherItem)
const newTeacherEmail = ref('')

const state = computed(() => {
  if (selectedTeacher.value.value == 0) {
    return {
      teacher_email: newTeacherEmail.value,
    }
  }
  return {
    teacher_id: selectedTeacher.value.value,
  }
})

async function onSubmit(event: FormSubmitEvent<AddInfractionSchema>) {
  try {
    // const res = await
  } catch (e) {}
}
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold mb-4">Add infraction</h1>

    <UForm
      class="space-y-4 max-w-96"
      :state="state"
      :schema="AddInfractionSchema"
      @submit="onSubmit"
    >
      <UFormField label="Teacher">
        <UInputMenu
          v-model="selectedTeacher"
          class="w-full"
          :items="teacherItems"
        />
      </UFormField>

      <UFormField v-if="selectedTeacher.value == 0" label="Teacher email">
        <UInput v-model="newTeacherEmail" class="w-full" type="email" />
      </UFormField>

      <UButton type="submit">Submit</UButton>
    </UForm>

    <p>{{ teachers }}</p>
    <p>{{ state }}</p>
  </div>
</template>
