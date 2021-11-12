<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Vadakkanchery App </q-toolbar-title>
        <q-btn
          color="blue-5"
          unelevated
          class="q-mr-md"
          :label="langLabel"
          @click="openLangSelection"
        />
        <div>2021</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const $store = useStore();

    const $q = useQuasar();
    const langLabel = computed(() => {
      return $store.state.lang === 'en' ? 'A' : 'അ';
    });
    const openLangSelection = () => {
      $q.dialog({
        title: $store.state.lang == 'en' ? 'Change Language' : 'ഭാഷ മാറ്റുക',
        options: {
          type: 'radio',
          model: $store.state.lang,
          items: [
            { label: 'English', value: 'en' },
            { label: 'മലയാളം', value: 'ml' },
          ],
        },
        cancel: true,
      }).onOk((data) => {
        $store.commit('setLang', data);
      });
    };
    return {
      langLabel,
      openLangSelection,
    };
  },
});
</script>
