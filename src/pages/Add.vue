<template>
  <q-page class="q-pa-sm">
    <div class="row flex justify-center">
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <q-form ref="form">
              <div class="row">
                <div class="col">
                  <q-input
                    v-if="model.parent"
                    :label="parentLabel"
                    v-model="model.parent.label"
                    readonly
                    outlined
                    square
                    dense
                  />
                </div>
              </div>
              <div class="row q-mt-sm">
                <div class="col">
                  <q-input
                    :label="nameLabel"
                    v-model="model.name"
                    outlined
                    square
                    dense
                  />
                </div>
              </div>
              <div class="row col-12 col-md-4 q-mt-sm q-col-gutter-md">
                <div class="col">
                  <q-input
                    :label="dobLabel"
                    mask="##-##-####"
                    hint="Format: DD-MM-YYYY"
                    v-model="model.dob"
                    outlined
                    lazy-rules
                    square
                    dense
                    :rules="[(v) => !!v || 'Required', validDate]"
                  />
                </div>
                <div class="col">
                  <q-input
                    readonly
                    :label="ageLabel"
                    v-model="age"
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
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';
interface ModelInterface {
  name: string | null;
  dob: string | null;
  parent: {
    label: string;
    value: number;
  } | null;
}
export default defineComponent({
  setup() {
    const $router = useRouter();
    onMounted(() => {
      if (!$store.state.parent) {
        $router.push('/').catch((e) => console.log(e));
      } else {
        model.value.parent = $store.state.parent;
      }
    });
    const $store = useStore();
    const isEn = computed(() => $store.state.lang === 'en');
    const nameLabel = computed(() => (isEn.value ? 'Name' : 'പേര്'));
    const dobLabel = computed(() =>
      isEn.value ? 'Date of BIrth' : 'ജനന തീയ്യതി'
    );
    const ageLabel = computed(() => (isEn.value ? 'Age' : 'വയസ്സ്'));
    const parentLabel = computed(() =>
      isEn.value ? 'Parents' : 'രക്ഷിതാക്കൾ'
    );
    const model = ref<ModelInterface>({
      name: null,
      dob: null,
      parent: null,
    });
    const age = computed(() => {
      if (model.value.dob && validDate(model.value.dob)) {
        const today = new Date();
        const arr = model.value.dob.split('-');
        const birthDate = new Date(arr[1] + '-' + arr[0] + '-' + arr[2]);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      } else {
        return '';
      }
    });
    const validDate = (val: string) => {
      if (val.length !== 10) {
        return false;
      }
      const arr = val.split('-');
      if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(parseInt(arr[1]))) {
        return false;
      }
      if (
        [1, 3, 5, 7, 8, 10, 12].includes(parseInt(arr[1])) &&
        (parseInt(arr[0]) > 31 || parseInt(arr[0]) <= 0)
      ) {
        return false;
      }
      if (
        [4, 6, 9, 11].includes(parseInt(arr[1])) &&
        (parseInt(arr[0]) > 30 || parseInt(arr[0]) <= 0)
      ) {
        return false;
      }
      if (
        parseInt(arr[0]) > 29 &&
        parseInt(arr[1]) === 2 &&
        isLeap(parseInt(arr[2]))
      ) {
        return false;
      }
      if (parseInt(arr[0]) > 28 && parseInt(arr[1]) === 2) {
        return false;
      }
      return true;
    };

    const isLeap = (year: number) => {
      return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    };
    const form = ref(null);
    return {
      form,
      nameLabel,
      dobLabel,
      ageLabel,
      model,
      age,
      validDate,
      parentLabel,
    };
  },
});
</script>
