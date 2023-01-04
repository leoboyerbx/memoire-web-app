<script lang="ts" setup="">
import {NotionBiblioItem} from '~/server/lib/notion';
import BiblioType from '~/components/Biblio/BiblioType.vue';

const props = defineProps<{
  reference: NotionBiblioItem
}>()

const ifF = props.reference.type === 'Vidéo' ? 'e' : ''
</script>
<template>
  <a
      :href="reference.url"
      target="_blank"
      class="card group w-full bg-base-100 shadow-sm border border-gray-300 py-4 px-6 gap-2 transition duration-300 hover:(shadow-lg shadow-primary/30 border-primary/50)"
  >
    <div class="flex gap-6 items-center">
      <div class="flex flex-col items-start flex-grow">
        <div class="text-gray-500 transition duration-200 group-hover:text-gray-800">
          <span class="font-bold">{{ reference.author }}</span>
          <span v-if="reference.owner" class="ml-1">- {{ reference.owner }}</span>
        </div>
        <span
            class="font-semibold text-neutral transition duration-200 group-hover:text-primary text-lg">{{
            reference.title
          }}</span>
      </div>

      <Icon class="text-2xl transition duration-300 self-start group-hover:(text-primary)"
            name="uil:external-link-alt"></Icon>
    </div>
    <footer class="flex items-center gap-1 text-xs">
      <BiblioType :type="reference.type"/>
      -
      <span v-if="reference.pubDate" class="text-xs text-gray-700">Publié{{ ifF ? 'e' : '' }} le <strong>{{
          reference.pubDate
        }}</strong></span>
      -
      <span v-if="reference.consultDate" class="text-xs text-gray-700">Consulté{{ ifF ? 'e' : '' }} le <strong>{{
          reference.consultDate
        }}</strong></span>
    </footer>
  </a>
</template>
