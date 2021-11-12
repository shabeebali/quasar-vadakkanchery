<template>
  <q-page class="q-pa-sm">
    <div class="row flex justify-center">
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <q-form ref="form">
              <div class="row">
                <div class="col">
                  <q-select
                    :label="selectFamilyLabel"
                    :options="familyOptions"
                    v-model="model.parent"
                    outlined
                    square
                    dense
                  />
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { defineComponent, ref, computed, onMounted } from 'vue';
export default defineComponent({
  setup() {
    const $q = useQuasar();
    onMounted(() => {
      $q.loading.show();
    const $store = useStore();
    const isEn = computed(() => $store.state.lang === 'en');
    const selectFamilyLabel = computed(() =>
      isEn.value ? 'Select Parent Family' : 'രക്ഷിതാക്കളെ തെരഞ്ഞെടുക്കുക '
    );
    const model = ref({
      parent: null,
    });
    return {
      model,
      // familyOptions,
      selectFamilyLabel,
    };
  },
});
</script>
