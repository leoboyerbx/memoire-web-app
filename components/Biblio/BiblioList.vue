<script lang="ts" setup="">

import {NotionBiblioItem} from '~/server/lib/notion';
import BiblioItem from '~/components/Biblio/BiblioItem.vue';

const props = defineProps<{
  query: string,
  references: NotionBiblioItem[]
}>()
const {query, references} = toRefs(props)
const queryType = ref<string | null>(null)

const filteredReferences = computed(() => {
  let referencesSource = references.value
  if (queryType.value) {
    referencesSource = referencesSource.filter(r => r.type === queryType.value)
  }
  if (!query.value) return referencesSource

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
  <main class="relative">
    <div class="flex justify-center mb-8 gap-2 tabs tabs-boxed">
      <button
          class="tab btn-animation"
          :class="{ 'tab-active': queryType === null }"
          @click="queryType = null"
      >Tous
      </button>
      <button class="tab btn-animation univ"
              :class="{ 'tab-active': queryType === 'Article universitaire' }"
              @click="queryType = 'Article universitaire'"
      >
        <Icon name="uil:file-search-alt" class="mr-1"/>
        Articles universitaires
      </button>
      <button class="tab btn-animation article"
              :class="{ 'tab-active': queryType === 'Article' }"
              @click="queryType = 'Article'"
      >
        <Icon name="uil:newspaper" class="mr-1"/>
        Articles
      </button>
      <button class="tab btn-animation video"
              :class="{ 'tab-active': queryType === 'Vidéo' }"
              @click="queryType = 'Vidéo'"
      >
        <Icon name="uil:youtube" class="mr-1"/>
        Articles
      </button>
    </div>
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

<style scoped>
.tab-active, .tab-active:hover {
  color: #fff;
}
.tab-active.univ {
  @apply bg-purple-400;
}
.tab-active.video {
  @apply bg-red-500;
}
.tab-active.article {
  @apply bg-cyan-400;
}
.tab {
  @apply px-2;
}
</style>
