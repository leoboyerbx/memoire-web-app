<script lang="ts" setup="">

import {NotionBiblioItem} from '~/server/lib/notion';
import BiblioItem from '~/components/Biblio/BiblioItem.vue';

const props = defineProps<{
  query: string,
  references: NotionBiblioItem[]
}>()
const {query, references} = toRefs(props)

const filteredReferences = computed(() => {
  if (!query.value) return references.value

  const queryTest = new RegExp(query.value, "ig");
  return references.value.filter(reference => {
    let hasMatch = false;
    if (queryTest.test(reference.title)) {
      hasMatch = true
    }
    if (queryTest.test(reference.author)) {
      hasMatch = true
    }
    if (reference.owner && queryTest.test(reference.owner)) {
      hasMatch = true
    }
    return hasMatch
  }).map(reference => {
    let {id, title, url, author, pubDate, consultDate, owner, type} = reference

    title = title.replace(queryTest, function (matchedText, a, b) {
      return ('<span class="highlight">' + matchedText + '</span>');
    })
    author = author.replace(queryTest, function (matchedText, a, b) {
      return ('<span class="highlight">' + matchedText + '</span>');
    })
    if (owner) {
      owner = owner.replace(queryTest, function (matchedText, a, b) {
        return ('<span class="highlight">' + matchedText + '</span>');
      })
    }

    return {
      id,
      title,
      url,
      author,
      pubDate,
      consultDate,
      owner,
      type
    }
  })
})

</script>
<template>
  <main>
    <transition mode="out-in">
      <div v-if="filteredReferences.length" class="flex flex-col gap-4">
        <transition-group name="list">
          <BiblioItem
              v-for="reference in filteredReferences"
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
<style>
.highlight {
  @apply bg-secondary/50 rounded;
}
</style>
