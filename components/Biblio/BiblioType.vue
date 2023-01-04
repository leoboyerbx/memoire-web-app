<script  lang="ts" setup="">
defineProps<{
  type: string
}>()
</script>
<template>
 <div class="flex items-center bg-gray-200 rounded text-xs py-0.5 px-1">{{ type }}</div>
</template>
