<script lang="ts" setup="">

import {NotionReferenceItem} from '~/server/lib/notion';

const props = defineProps<{
  query: string,
  references: NotionReferenceItem[]
}>()
const {query, references} = toRefs(props)
const filteredReferences = computed(() => {
  if (!query.value) return references.value
  return references.value.filter(reference => {
    return reference.num.toString().includes(query.value)
  })
})

</script>
<template>
  <main>
    <transition mode="out-in">
      <div v-if="filteredReferences.length" class="flex flex-col gap-4">
        <transition-group name="list">
          <a
              v-for="reference in filteredReferences"
              :key="reference.num"
              :href="reference.url"
              target="_blank"
              class="card group w-full bg-base-100 shadow-sm border border-gray-300 flex flex-row items-center py-4 px-6 transition duration-300 hover:(shadow-lg shadow-primary/15 border-primary/50)"
          >
            <header class="text-3xl"><span class="text-gray-300">#</span>{{ reference.num }}</header>
            <div class="flex flex-col items-start flex-grow">

            </div>
            <Icon class="text-2xl transition duration-300 group-hover:(text-primary)"
                  name="uil:external-link-alt"></Icon>
          </a>
        </transition-group>
      </div>
      <div v-else>
        <p>Aucune note de bas de page ne correspond à ce numéro.</p>
      </div>
    </transition>
  </main>
</template>
