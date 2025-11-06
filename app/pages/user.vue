<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { LoginSchema, VerifyCodeSchema } from '~~/shared/schemas'

const loadingIndicator = useLoadingIndicator()
const toast = useToast()

const { data, error, refresh } = useFetch<GetAuthMeResponse>('/api/auth/me')
if (error.value) {
  toast.add({
    color: 'error',
    title: 'Failed to get user info',
    description: 'Please try again later.',
  })
}

const isVerifyingCode = ref(false)
const state = reactive({
  email: '',
  code: '',
})

const user = computed(() => data.value?.user || null)

async function onLoginSubmit(event: FormSubmitEvent<LoginSchema>) {
  try {
    loadingIndicator.start()
    const res = await $fetch(`/api/auth/login`, {
      method: 'POST',
      body: event.data,
    })
    if (res.success) {
      isVerifyingCode.value = true
    }
    loadingIndicator.finish()
  } catch (e) {
    loadingIndicator.finish({ error: true })
    toast.add({
      color: 'error',
      title: 'Failed to send verification code',
      description: String(e),
    })
  }
}

async function onCodeSubmit(event: FormSubmitEvent<VerifyCodeSchema>) {
  try {
    loadingIndicator.start()
    const res = await $fetch(`/api/auth/verify`, {
      method: 'POST',
      body: event.data,
    })
    if (res.success) {
      await refresh()
    }
    loadingIndicator.finish()
  } catch (e) {
    loadingIndicator.finish({ error: true })
    toast.add({
      color: 'error',
      title: 'Failed to submit verification code',
      description: String(e),
    })
  }
}

async function onLogout() {
  if (!confirm('Are you sure you want to log out?')) return
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    await refresh()
  } catch (e) {
    toast.add({
      color: 'error',
      title: 'Failed to logout',
      description: String(e),
    })
  }
}
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold mb-4">User</h1>

    <template v-if="user">
      <p class="mb-4">
        You are logged in as <span class="font-bold">{{ user.name }}</span
        >.
      </p>

      <div>
        <UButton color="error" variant="subtle" @click="onLogout"
          >Log out</UButton
        >
      </div>
    </template>

    <template v-else>
      <p class="mb-4">You are not logged in.</p>

      <UForm
        v-if="!isVerifyingCode"
        :state="state"
        :schema="LoginSchema"
        class="space-y-4 max-w-96"
        @submit="onLoginSubmit"
      >
        <UFormField
          label="Email"
          name="email"
          description="Please use your @basischina.com email"
        >
          <UInput
            v-model="state.email"
            type="email"
            :disabled="isVerifyingCode"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit">Send code</UButton>
      </UForm>

      <UForm
        v-else
        :state="state"
        :schema="VerifyCodeSchema"
        class="space-y-4 max-w-96"
        @submit="onCodeSubmit"
      >
        <UFormField
          label="Email"
          name="email"
          description="Please use your @basischina.com email"
        >
          <UInput v-model="state.email" type="email" disabled class="w-full" />
        </UFormField>

        <UFormField
          v-if="isVerifyingCode"
          label="Verification code"
          name="code"
          description="This was sent to your Teams account"
        >
          <UInput v-model="state.code" type="code" class="w-full" />
        </UFormField>

        <UButton type="submit">Login</UButton>
      </UForm>
    </template>
  </div>
</template>
