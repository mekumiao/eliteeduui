<template>
  <div>爱利特儿歌管理</div>
  <div>
    <my-page-table :get-data="getData" v-model="isLoad"></my-page-table>
  </div>
</template>

<script lang="ts">
import { ObjFilterInput, PageInput, PageOutput } from "@/apis/apiBase";
import MyPageTable from "@/components/MyPageTable.vue";
import { defineComponent, ref } from "vue";
import {
  apiAppResourceManagerApi,
  EliteSongOutput
} from "@/apis/appResourceManagerApi";

export default defineComponent({
  components: { MyPageTable },
  name: "EliteSongManager",
  setup() {
    const isLoad = ref(false);
    return { isLoad };
  },
  methods: {
    async getData(
      match: string,
      page: PageInput<unknown>
    ): Promise<PageOutput<unknown>> {
      const filter: ObjFilterInput<EliteSongOutput> = {
        Page: page,
        Condition: {
          Logic: "or",
          Items: [{ Compare: "contains", Field: "Name", Value: match }]
        }
      };
      return apiAppResourceManagerApi.QueryPageEliteSong(filter);
    }
  }
});
</script>
