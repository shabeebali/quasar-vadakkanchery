<template>
  <q-page class="row items-center justify-evenly">
    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-12 justify-center flex">
            <q-btn
              :label="addMemberLabel"
              color="primary"
              to="/select-family"
            />
          </div>
          <div class="col-12 q-mt-md justify-center flex">
            <q-btn :label="membersListLabel" color="orange-9" to="/list" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const $store = useStore();
    const addMemberLabel = computed(() => {
      return $store.state.lang === 'en' ? 'Add Member' : 'അംഗത്തെ ചേർക്കുക';
    });
    const membersListLabel = computed(() => {
      return $store.state.lang === 'en'
        ? 'Members List'
        : 'അംഗങ്ങളുടെ ലിസ്റ്റ്';
    });
    return {
      addMemberLabel,
      membersListLabel,
    };
  },
});
</script>
