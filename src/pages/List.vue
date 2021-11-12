<template>
  <q-page>
    <q-table
      :rows="items"
      :columns="columns"
      title="Members List"
      :rows-per-page-options="[0]"
    />
  </q-page>
</template>
<script lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const items = ref<{ name: string; id: number; relation: string }[]>([]);
    const $q = useQuasar();
    onMounted(() => {
      $q.loading.show();
      api
        .get('members')
        .then(
          (res: { data: { name: string; id: number; relation: string }[] }) => {
            items.value = res.data;
          }
        )
        .catch((e) => console.log(e))
        .finally(() => $q.loading.hide());
    });
    const columns = [
      {
        field: 'id',
        label: 'ID',
        name: 'id',
        sortable: true,
        align: 'left',
      },
      {
        field: 'name',
        label: 'Name',
        name: 'name',
        sortable: true,
        align: 'left',
      },
      {
        field: 'relation',
        label: 'Relation',
        name: 'relation',
        sortable: true,
        align: 'left',
      },
    ];
    return {
      items,
      columns,
    };
  },
});
</script>
