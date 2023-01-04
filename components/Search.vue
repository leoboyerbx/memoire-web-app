<script lang="ts" setup="">

import BiblioList from '~/components/Biblio/BiblioList.vue';

const currentMode = ref('footnotes')
const query = ref('')

watch(currentMode, () => {
  query.value = ''
})
const updateQuery = async (e: any) => {
  e.preventDefault()
  const val = e.currentTarget?.value
  const prevValue = query.value
  query.value = val ?? ''
  if (currentMode.value === 'footnotes' && isNaN(val)) {
    await nextTick()
    query.value = prevValue
  }
}

const {pending, data: notionData} = useLazyFetch('/api/getNotionData')

</script>
<template>
  <div class="hero py-24">
    <div class="hero-content text-center">
      <div class="flex flex-col gap-4 items-center max-w-md">
        <h2 class="text-2xl font-bold">Rechercher une référence</h2>

        <div class="tabs tabs-boxed gap-2 items-center justify-center">
          <button class="tab btn-animation rounded-lg transition-colors duration-200"
                  :class="{ 'tab-active': currentMode === 'footnotes' }"
                  @click="currentMode = 'footnotes'"
          >Notes de bas de page
          </button>
          <button class="tab btn-animation rounded-lg transition-colors duration-200"
                  :class="{ 'tab-active': currentMode === 'biblio' }"
                  @click="currentMode = 'biblio'"
          >Bibliographie
          </button>
        </div>

        <input type="text"
               :value="query"
               @input="updateQuery"
               :placeholder="currentMode === 'footnotes' ? 'Numéro' : 'Rechercher dans la bibliographie...'"
               class="input transition-all duration-300 ease-in-out-quart"
               :class="currentMode === 'footnotes' ? 'w-24' : ' w-full'"
        />
      </div>
    </div>
  </div>
  <main v-if="pending">
    Chargement...
  </main>
  <main v-else class="container relative mx-auto px-4 lg:px-16">
    <transition>
      <FootnotesList v-if="currentMode === 'footnotes'" :query="query" :references="notionData.references"/>
      <BiblioList v-else-if="currentMode === 'biblio'" :query="query" :references="notionData.biblio"/>
    </transition>
  </main>
</template>
<style scoped>
.tab-active, .tab-active:hover{
  color: #fff;
}
</style>
