<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="bg-green text-white">
      <q-card-section class="flex justify-center">
        <q-icon name="check" size="xl" />
      </q-card-section>
      <q-separator dark />
      <q-card-section>
        <div class="text-bold text-subtitle1">
          Your data has been saved successfully
        </div>
      </q-card-section>
      <q-card-actions class="flex justify-center">
        <q-btn flat label="add New Member" color="white" to="/select-family" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { useStore } from 'src/store';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const $store = useStore();
    const $router = useRouter();
    onMounted(() => {
      if (!$store.state.model) {
        $router.push('/').catch((e) => console.log(e));
      } else {
        $store.commit('setModel', null);
      }
    });
  },
});
</script>
