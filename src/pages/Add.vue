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
              <div class="row q-mt-md">
                <div class="col">
                  <q-option-group
                    v-model="model.male"
                    :options="genderOptions"
                    inline
                  />
                </div>
              </div>
              <div class="row q-mt-sm">
                <div class="col">
                  <q-input
                    :label="nameLabel"
                    v-model="model.name"
                    :rules="[(v) => !!v || 'Required']"
                    outlined
                    square
                    dense
                  />
                </div>
              </div>
              <div class="row q-col-gutter-md">
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
              <div class="row q-mt-md">
                <div class="col-auto flex items-center">
                  <div class="text-subtitle2 text-grey-8">{{ aliveLabel }}</div>
                </div>
                <div class="col">
                  <q-option-group
                    v-model="model.alive"
                    :options="aliveOptions"
                    inline
                  />
                </div>
              </div>
              <div class="row" v-if="!model.alive">
                <div class="col-6">
                  <q-input
                    :label="dodLabel"
                    mask="##-##-####"
                    hint="Format: DD-MM-YYYY"
                    v-model="model.dod"
                    outlined
                    lazy-rules
                    square
                    dense
                    :rules="[validDate]"
                  />
                </div>
              </div>
              <div class="row q-mt-sm">
                <div class="col">
                  <q-select
                    :options="[
                      'A +ve',
                      'A -ve',
                      'B +ve',
                      'B -ve',
                      'O +ve',
                      'O -ve',
                      'AB +ve',
                      'AB -ve',
                    ]"
                    :label="bloodGroupLabel"
                    :rules="[(v) => !!v || 'Required']"
                    clearable
                    v-model="model.blood_group"
                    outlined
                    square
                    dense
                  />
                </div>
              </div>
              <div class="row q-mt-sm">
                <div class="col">
                  <q-input
                    dense
                    outlined
                    square
                    v-model="model.address"
                    type="textarea"
                    :label="addressLabel"
                  />
                </div>
              </div>
              <div class="row q-mt-sm">
                <div class="col">
                  <q-input
                    dense
                    outlined
                    square
                    v-model="model.temporary_address"
                    type="textarea"
                    :label="temporaryAddressLabel"
                  />
                </div>
              </div>
              <div class="row q-mt-md">
                <div class="col-auto flex items-center">
                  <div class="text-subtitle2 text-grey-8">
                    {{ employedLabel }}
                  </div>
                </div>
                <div class="col">
                  <q-option-group
                    v-model="model.employed"
                    :options="aliveOptions"
                    inline
                  />
                </div>
              </div>
              <div class="row" v-if="model.employed">
                <div class="col-6">
                  <q-input
                    :label="occupationLabel"
                    v-model="model.occupation"
                    outlined
                    lazy-rules
                    square
                    dense
                    :rules="[(v) => !!v || 'Required']"
                  />
                </div>
              </div>
              <div class="row q-mt-sm">
                <div class="col">
                  <q-input
                    dense
                    outlined
                    square
                    v-model="model.max_qualification"
                    :label="maxQualificationLabel"
                  />
                </div>
              </div>
              <div
                class="row q-mt-sm"
                v-for="(phone, index) in model.phones"
                :key="index"
              >
                <div class="col">
                  <q-input
                    dense
                    outlined
                    square
                    v-model.number="model.phones[index]"
                    :label="phoneLabel"
                  />
                </div>
              </div>
              <q-btn
                class="q-mt-sm"
                color="secondary"
                label="Add Phone"
                @click="model.phones.push('')"
              />
              <div class="row q-mt-sm">
                <div class="col">
                  <q-input
                    dense
                    outlined
                    square
                    v-model="model.aadhar"
                    :label="aadharLabel"
                  />
                </div>
              </div>
              <div class="row q-mt-sm">
                <div class="col">
                  <q-input
                    dense
                    outlined
                    square
                    v-model="model.email"
                    :label="emailLabel"
                  />
                </div>
              </div>
              <div class="row q-mt-md">
                <div class="col-auto flex items-center">
                  <div class="text-subtitle2 text-grey-8">
                    {{ isMarriedLabel }}
                  </div>
                </div>
                <div class="col">
                  <q-option-group
                    @update:model-value="onMarried"
                    v-model="model.married"
                    :options="aliveOptions"
                    inline
                  />
                </div>
              </div>
              <q-card flat class="bg-blue-1" v-if="model.spouse">
                <q-card-section>
                  <div class="text-bold text-h6 text-center">
                    {{ spouseHeader }}
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="row q-mt-sm">
                    <div class="col">
                      <q-input
                        :label="nameLabel"
                        v-model="model.spouse.name"
                        :rules="[(v) => !!v || 'Required']"
                        outlined
                        square
                        dense
                      />
                    </div>
                  </div>
                  <div class="row q-mt-sm">
                    <div class="col">
                      <q-input
                        :label="fathersNameLabel"
                        v-model="model.spouse.fathers_name"
                        :rules="[(v) => !!v || 'Required']"
                        outlined
                        square
                        dense
                      />
                    </div>
                  </div>
                  <div class="row q-mt-sm">
                    <div class="col">
                      <q-input
                        :label="mothersNameLabel"
                        v-model="model.spouse.mothers_name"
                        :rules="[(v) => !!v || 'Required']"
                        outlined
                        square
                        dense
                      />
                    </div>
                  </div>
                  <div class="row q-col-gutter-md">
                    <div class="col">
                      <q-input
                        :label="dobLabel"
                        mask="##-##-####"
                        hint="Format: DD-MM-YYYY"
                        v-model="model.spouse.dob"
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
                        v-model="spouseAge"
                        outlined
                        square
                        dense
                      />
                    </div>
                  </div>
                  <div class="row q-mt-md">
                    <div class="col-auto flex items-center">
                      <div class="text-subtitle2 text-grey-8">
                        {{ aliveLabel }}
                      </div>
                    </div>
                    <div class="col">
                      <q-option-group
                        v-model="model.spouse.alive"
                        :options="aliveOptions"
                        inline
                      />
                    </div>
                  </div>
                  <div class="row" v-if="!model.spouse.alive">
                    <div class="col-6">
                      <q-input
                        :label="dodLabel"
                        mask="##-##-####"
                        hint="Format: DD-MM-YYYY"
                        v-model="model.spouse.dod"
                        outlined
                        lazy-rules
                        square
                        dense
                        :rules="[validDate]"
                      />
                    </div>
                  </div>
                  <div class="row q-mt-sm">
                    <div class="col">
                      <q-select
                        :options="[
                          'A +ve',
                          'A -ve',
                          'B +ve',
                          'B -ve',
                          'O +ve',
                          'O -ve',
                          'AB +ve',
                          'AB -ve',
                        ]"
                        :label="bloodGroupLabel"
                        clearable
                        :rules="[(v) => !!v || 'Required']"
                        v-model="model.spouse.blood_group"
                        outlined
                        square
                        dense
                      />
                    </div>
                  </div>
                  <div class="row q-mt-sm">
                    <div class="col">
                      <q-input
                        dense
                        outlined
                        square
                        v-model="model.spouse.address"
                        type="textarea"
                        :label="addressLabel"
                      />
                    </div>
                  </div>
                  <div class="row q-mt-sm">
                    <div class="col">
                      <q-input
                        dense
                        outlined
                        square
                        v-model="model.spouse.temporary_address"
                        type="textarea"
                        :label="temporaryAddressLabel"
                      />
                    </div>
                  </div>
                  <div class="row q-mt-md">
                    <div class="col-auto flex items-center">
                      <div class="text-subtitle2 text-grey-8">
                        {{ employedLabel }}
                      </div>
                    </div>
                    <div class="col">
                      <q-option-group
                        v-model="model.spouse.employed"
                        :options="aliveOptions"
                        inline
                      />
                    </div>
                  </div>
                  <div class="row" v-if="model.spouse.employed">
                    <div class="col-6">
                      <q-input
                        :label="occupationLabel"
                        v-model="model.spouse.occupation"
                        outlined
                        lazy-rules
                        square
                        dense
                        :rules="[(v) => !!v || 'Required']"
                      />
                    </div>
                  </div>
                  <div class="row q-mt-sm">
                    <div class="col">
                      <q-input
                        dense
                        outlined
                        square
                        v-model="model.spouse.max_qualification"
                        :label="maxQualificationLabel"
                      />
                    </div>
                  </div>
                  <div
                    class="row q-mt-sm"
                    v-for="(phone, index) in model.spouse.phones"
                    :key="index"
                  >
                    <div class="col">
                      <q-input
                        dense
                        outlined
                        square
                        v-model.number="model.spouse.phones[index]"
                        :label="phoneLabel"
                      />
                    </div>
                  </div>
                  <q-btn
                    class="q-mt-sm"
                    color="secondary"
                    label="Add Phone"
                    @click="model.spouse.phones.push('')"
                  />
                  <div class="row q-mt-sm">
                    <div class="col">
                      <q-input
                        dense
                        outlined
                        square
                        v-model="model.spouse.aadhar"
                        :label="aadharLabel"
                      />
                    </div>
                  </div>
                  <div class="row q-mt-sm">
                    <div class="col">
                      <q-input
                        dense
                        outlined
                        square
                        v-model="model.spouse.email"
                        :label="emailLabel"
                      />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-form>
          </q-card-section>
          <q-card-actions>
            <q-btn
              class="full-width"
              color="primary"
              label="Submit"
              @click="saveFn"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';
import { QForm, useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ModelInterface } from '../interfaces';
export default defineComponent({
  setup() {
    const $q = useQuasar();
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
      alive: true,
      dod: null,
      blood_group: null,
      address: null,
      temporary_address: null,
      employed: false,
      occupation: null,
      phones: [''],
      max_qualification: null,
      married: false,
      male: true,
      aadhar: null,
      email: null,
      spouse: null,
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
    const spouseAge = computed(() => {
      if (
        model.value.spouse &&
        model.value.spouse.dob &&
        validDate(model.value.spouse.dob)
      ) {
        const today = new Date();
        const arr = model.value.spouse.dob.split('-');
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
    const form = ref<QForm>();
    const aliveOptions = computed(() => [
      {
        label: isEn.value ? 'Yes' : 'ഉണ്ട്',
        value: true,
      },
      {
        label: isEn.value ? 'No' : 'ഇല്ല',
        value: false,
      },
    ]);
    const genderOptions = computed(() => [
      {
        label: isEn.value ? 'Male' : 'പുരുഷൻ',
        value: true,
      },
      {
        label: isEn.value ? 'Female' : 'സ്ത്രീ',
        value: false,
      },
    ]);
    const aliveLabel = computed(() =>
      isEn.value ? 'Is Alive?' : 'ജീവിച്ചിരിപ്പുണ്ടോ?'
    );
    const dodLabel = computed(() =>
      isEn.value ? 'Date of Death' : 'മരണപ്പെട്ട തീയ്യതി'
    );
    const bloodGroupLabel = computed(() =>
      isEn.value ? 'Blood Group' : 'രക്ത ഗ്രൂപ്'
    );
    const addressLabel = computed(() => (isEn.value ? 'Address' : 'വിലാസം'));
    const temporaryAddressLabel = computed(() =>
      isEn.value ? 'Temporary Address' : 'താത്കാലിക വിലാസം'
    );
    const employedLabel = computed(() =>
      isEn.value ? 'Is Employed?' : 'തൊഴിലുണ്ടോ?'
    );
    const occupationLabel = computed(() =>
      isEn.value ? 'Occupation' : 'തൊഴിൽ'
    );
    const phoneLabel = computed(() => (isEn.value ? 'Phone No' : 'ഫോൺ നമ്പർ'));
    const maxQualificationLabel = computed(() =>
      isEn.value ? 'Highest Qualification' : 'ഉയർന്ന യോഗ്യത'
    );
    const aadharLabel = computed(() =>
      isEn.value ? 'Aadhar Card No' : 'ആധാർ കാർഡ് നമ്പർ'
    );
    const emailLabel = computed(() =>
      isEn.value ? 'E-Mail Address' : 'ഇ മെയിൽ വിലാസം'
    );
    const fathersNameLabel = computed(() =>
      isEn.value ? "Father's Name" : 'പിതാവിന്റെ പേര്'
    );
    const mothersNameLabel = computed(() =>
      isEn.value ? "Mother's Name" : 'മാതാവിന്റെ പേര്'
    );
    const isMarriedLabel = computed(() =>
      isEn.value
        ? 'Is Married?'
        : model.value.male
        ? 'വിവാഹിതനാണോ ?'
        : 'വിവാഹിതയാണോ ?'
    );
    const onMarried = (val: boolean) => {
      if (val) {
        model.value.spouse = {
          name: null,
          dob: null,
          alive: true,
          dod: null,
          blood_group: null,
          address: null,
          temporary_address: null,
          employed: false,
          occupation: null,
          phones: [''],
          max_qualification: null,
          married: false,
          male: true,
          aadhar: null,
          email: null,
          fathers_name: null,
          mothers_name: null,
        };
      } else {
        model.value.spouse = null;
      }
    };
    const spouseHeader = computed(() => {
      if (model.value.male) {
        return isEn.value ? "Wife's Details" : 'ഭാര്യയുടെ വിവരങ്ങൾ';
      } else {
        return isEn.value ? "Husband's Details" : 'ഭർത്താവിന്റെ വിവരങ്ങൾ';
      }
    });
    const saveFn = () => {
      form.value?.validate().then((success) => {
        if (success) {
          $q.loading.show();
          $store.commit('setModel', model.value);
          api
            .post('add', model.value)
            .then((res: { data: { message: string } }) => {
              if (res.data.message === 'success') {
                $router.replace('/success').catch((e) => console.log(e));
              }
            })
            .catch((e) => console.log(e))
            .finally(() => $q.loading.hide());
        }
      });
    };
    return {
      form,
      nameLabel,
      dobLabel,
      ageLabel,
      model,
      age,
      validDate,
      parentLabel,
      aliveOptions,
      aliveLabel,
      dodLabel,
      bloodGroupLabel,
      addressLabel,
      temporaryAddressLabel,
      employedLabel,
      occupationLabel,
      phoneLabel,
      maxQualificationLabel,
      aadharLabel,
      emailLabel,
      fathersNameLabel,
      mothersNameLabel,
      genderOptions,
      isMarriedLabel,
      onMarried,
      spouseHeader,
      spouseAge,
      saveFn,
    };
  },
});
</script>
