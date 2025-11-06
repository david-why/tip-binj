<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { AddTeacherSchema } from '~~/shared/schemas'

const toast = useToast()

const emit = defineEmits<{
  created: [teacher: DBTeacher]
}>()

const isOpen = ref(false)

const state = reactive({
  email: '',
})

async function onSubmit(event: FormSubmitEvent<AddTeacherSchema>) {
  try {
    const teacher = await $fetch<DBTeacher>('/api/teachers', {
      method: 'POST',
      body: event.data,
    })
    emit('created', teacher)
    isOpen.value = false
  } catch (e) {
    toast.add({
      color: 'error',
      title: 'Failed to add teacher',
      description: String(e),
    })
  }
}
</script>

<template>
  <UModal v-model:open="isOpen" title="Add teacher">
    <UButton variant="ghost" icon="i-material-symbols-add-circle" />

    <template #body>
      <UForm
        class="space-y-4 max-w-96"
        :state="state"
        :schema="AddTeacherSchema"
        @submit="onSubmit"
      >
        <UFormField name="email" label="Email">
          <UInput v-model="state.email" type="email" class="w-full" />
        </UFormField>

        <UButton type="submit">Add</UButton>
      </UForm>
    </template>
  </UModal>
</template>
