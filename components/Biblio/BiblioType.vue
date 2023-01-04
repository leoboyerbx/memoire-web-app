<script  lang="ts" setup="">
defineProps<{
  type: string
}>()
</script>
<template>
 <div class="flex items-center rounded text-xs py-0.5 px-1 gap-1"
 :class="{
   'bg-red-200': type === 'Vidéo',
   'bg-cyan-100': type === 'Article',
   'bg-purple-200': type === 'Article universitaire',
 }"
 >
   <Icon v-if="type === 'Vidéo'" name="uil:youtube" />
   <Icon v-else-if="type === 'Article'" name="uil:newspaper" />
   <Icon v-else-if="type === 'Article universitaire'" name="uil:file-search-alt" />
   <span>{{ type }}</span>
 </div>
</template>
