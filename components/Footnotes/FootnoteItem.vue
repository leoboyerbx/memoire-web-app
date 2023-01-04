<script  lang="ts" setup="">
import {NotionReferenceItem} from '~/server/lib/notion';

const props = defineProps<{
  reference: NotionReferenceItem
}>()
</script>
<template>
  <a
      :href="reference.url"
      target="_blank"
      class="card group w-full bg-base-100 shadow-sm border border-gray-300 flex flex-row gap-6 items-center py-4 px-6 transition duration-300 hover:(shadow-lg shadow-primary/15 border-primary/50)"
  >
    <header class="text-3xl"><span class="text-gray-300">#</span>{{ reference.num }}</header>
    <div class="flex flex-col items-start flex-grow">
      <span v-if="reference.normal" class="font-semibold text-neutral transition duration-200 group-hover:text-primary text-lg">{{ reference.normal }}</span>
      <i v-if="reference.italic" class="font-light text-gray-500 transition duration-200 group-hover:text-primary">{{ reference.italic }}</i>
    </div>
    <Icon class="text-2xl transition duration-300 self-start group-hover:(text-primary)"
          name="uil:external-link-alt"></Icon>
  </a>
</template>
