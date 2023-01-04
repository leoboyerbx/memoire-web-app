<script lang="ts" setup="">

import {NotionReferenceItem} from '~/server/lib/notion';
import FootnoteItem from '~/components/Footnotes/FootnoteItem.vue';

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
  <main class="relative">
    <transition mode="out-in">
      <div v-if="filteredReferences.length" class="flex flex-col gap-4">
        <transition-group name="list">
          <FootnoteItem
              v-for="reference in filteredReferences"
              :key="reference.num"
              :reference="reference"
          />
        </transition-group>
      </div>
      <div v-else>
        <p>Aucune note de bas de page ne correspond à ce numéro.</p>
      </div>
    </transition>
  </main>
</template>
