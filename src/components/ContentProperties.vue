<template>
  <table v-if="contentProperties" class="table-fixed w-full">
    <tbody>
      <tr>
        <td class="w-5/12 bg-gray-100 border px-4 text-xs">Flex wrap</td>
        <td class="w-7/12 border">
          <select
            v-model="contentProperties.flexWrap"
            class="w-full text-gray-700 px-2 py-2 text-xs"
          >
            <option value>(none)</option>
            <option value="wrap">Wrap</option>
            <option value="no-wrap">No wrap</option>
            <option value="wrap-reverse">Wrap reverse</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 text-xs">Justify content</td>
        <td class="border">
          <select
            v-model="contentProperties.justify"
            class="w-full text-gray-700 px-2 py-2 text-xs"
          >
            <option value>(default)</option>
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
            <option value="between">Between</option>
            <option value="around">Around</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 text-xs">Align items</td>
        <td class="border">
          <select
            v-model="contentProperties.alignItems"
            class="w-full text-gray-700 px-2 py-2 text-xs"
          >
            <option value>(default)</option>
            <option value="stretch">Stretch</option>
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
            <option value="baseline">Baseline</option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  ResponsiveSizes,
  IComponentModel,
  GridPropertiesModel,
  GridComponentModel
} from '@/models';

@Component
export default class ContentProperties extends Vue {
  @Prop()
  size!: ResponsiveSizes;

  @Prop()
  model!: IComponentModel;

  get contentProperties() {
    if (!this.model || !(this.model instanceof GridComponentModel)) return null;
    const properties: GridPropertiesModel = this.model.properties;
    return properties.contents.get(this.size);
  }
}
</script>
