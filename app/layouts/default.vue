<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const navItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    icon: 'i-material-symbols-home-outline',
    active: route.path === '/',
  },
])
</script>

<template>
  <UHeader class="mb-4">
    <template #title>
      <div class="flex flex-col">
        <span class="text-primary">TIP</span>
        <span class="text-muted text-sm">Teacher Infraction Policy</span>
      </div>
    </template>

    <UNavigationMenu :items="navItems" />

    <template #body>
      <UNavigationMenu
        :items="navItems"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>

    <template #right>
      <ULink href="/user">
        <UIcon name="i-material-symbols-account-circle" />
      </ULink>
    </template>
  </UHeader>

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <UMain>
    <UContainer>
      <slot />
    </UContainer>
  </UMain>
</template>
