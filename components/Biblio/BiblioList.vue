<script lang="ts" setup="">

import {NotionBiblioItem} from '~/server/lib/notion';
import BiblioItem from '~/components/Biblio/BiblioItem.vue';

const props = defineProps<{
  query: string,
  references: NotionBiblioItem[]
}>()
const {query, references} = toRefs(props)

</script>
<template>
  <main>
    <transition mode="out-in">
      <div v-if="references.length" class="flex flex-col gap-4">
        <transition-group name="list">
          <BiblioItem
              v-for="reference in references"
              :key="reference.id"
              :reference="reference"
          />
        </transition-group>
      </div>
      <div v-else>
        <p>Aucune référence trouvée.</p>
      </div>
    </transition>
  </main>
</template>
