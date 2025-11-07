<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'
import { AddInfractionSchema } from '~~/shared/schemas'

const toast = useToast()

const {
  data: teachersData,
  error: teachersError,
  refresh: refreshTeachers,
} = await useFetch<DBTeacher[]>('/api/teachers')
if (teachersError.value) {
  toast.add({
    color: 'error',
    title: 'Failed to load teachers',
    description: teachersError.value.message,
  })
}
const { data: tagsData, error: tagsError } = await useFetch<GetTagsResult>(
  '/api/infractions/tags'
)
if (tagsError.value) {
  toast.add({
    color: 'error',
    title: 'Failed to load types and locations',
    description: tagsError.value.message,
  })
}

const teachers = computed(() => teachersData.value || [])
const types = computed(() => tagsData.value?.types ?? [])
const locations = computed(() => tagsData.value?.locations ?? [])

const teacherItems = computed(() =>
  teachers.value.map((t) => ({
    label: t.name || t.email,
    value: t.id,
  }))
)
const typeItems = computed(() =>
  types.value.map((t) => ({
    label: t.name,
    value: t.id,
  }))
)
const locationItems = computed(() =>
  locations.value.map((t) => ({
    label: t.name,
    value: t.id,
  }))
)

const selectedTeacher = ref<{ label: string; value: number }>()
const selectedType = ref<{ label: string; value: number }>()
const selectedLocation = ref<{ label: string; value: number }>()
const notes = ref('')

const teacherCount = ref<number | null>(null)
watch(selectedTeacher, async (value) => {
  teacherCount.value = null
  if (value) {
    const { count } = await $fetch<{ count: number }>(
      `/api/teachers/${value.value}/infractions/count`
    )
    teacherCount.value = count
  }
})

const state = computed(() => {
  return {
    teacher_id: selectedTeacher.value?.value || 0,
    type_id: selectedType.value?.value || 0,
    location_id: selectedLocation.value?.value || 0,
    notes: notes.value,
  }
})

async function onTeacherCreated(teacher: DBTeacher) {
  await refreshTeachers()
  selectedTeacher.value = teacherItems.value.find(
    (item) => item.value === teacher.id
  )
}

async function onSubmit(event: FormSubmitEvent<AddInfractionSchema>) {
  try {
    const infraction = await $fetch<DBInfraction>('/api/infractions', {
      method: 'POST',
      body: event.data,
    })
    await navigateTo(`/infractions/${infraction.id}`)
  } catch (e) {
    const message = e instanceof FetchError ? e.message : String(e)
    toast.add({
      color: 'error',
      title: 'Failed to add infraction',
      description: message,
    })
  }
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
      <UFormField
        name="teacher_id"
        label="Teacher"
        :help="
          typeof teacherCount === 'number'
            ? `Total by ${selectedTeacher?.label || 'teacher'}: ${teacherCount}`
            : undefined
        "
      >
        <template #hint>
          <AddTeacherModal @created="onTeacherCreated" />
        </template>
        <UInputMenu
          v-model="selectedTeacher"
          class="w-full"
          :items="teacherItems"
        />
      </UFormField>

      <UFormField name="type_id" label="Type">
        <UInputMenu v-model="selectedType" class="w-full" :items="typeItems" />
      </UFormField>

      <UFormField name="location_id" label="Location">
        <UInputMenu
          v-model="selectedLocation"
          class="w-full"
          :items="locationItems"
        />
      </UFormField>

      <UFormField name="notes" label="Notes">
        <UTextarea v-model="notes" class="w-full" :rows="5" />
      </UFormField>

      <UButton type="submit">Submit</UButton>
    </UForm>
  </div>
</template>
