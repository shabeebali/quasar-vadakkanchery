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
                    @update:model-value="onFamilyChange"
                  />
                </div>
              </div>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn color="primary" v-if="parent" label="Next" to="/add" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useStore } from 'src/store';
import { defineComponent, ref, computed, onMounted } from 'vue';
export default defineComponent({
  setup() {
    const $q = useQuasar();
    const familyOptions = ref<{ label: string; value: number }[]>([]);
    onMounted(() => {
      $q.loading.show();
      api
        .get('parents')
        .then((res: { data: { label: string; value: number }[] }) => {
          familyOptions.value = res.data;
        })
        .catch((e) => console.log(e))
        .finally(() => {
          $q.loading.hide();
          if ($store.state.parent) {
            model.value.parent = $store.state.parent;
          }
        });
    });
    const $store = useStore();
    const isEn = computed(() => $store.state.lang === 'en');
    const selectFamilyLabel = computed(() =>
      isEn.value ? 'Select Parent Family' : 'രക്ഷിതാക്കളെ തെരഞ്ഞെടുക്കുക '
    );
    const parent = computed(() => $store.state.parent);
    const model = ref<{ parent: { label: string; value: number } | null }>({
      parent: null,
    });
    const onFamilyChange = (val: { label: string; value: number } | null) => {
      $store.commit('setParent', val);
    };
    return {
      model,
      familyOptions,
      selectFamilyLabel,
      onFamilyChange,
      parent,
    };
  },
});
</script>
