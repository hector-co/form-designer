<template>
  <table v-if="layoutProperties" class="table-fixed w-full">
    <tbody>
      <tr>
        <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Width</td>
        <td class="w-7/12 border">
          <input
            v-model="layoutProperties.width"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Height</td>
        <td class="border">
          <input
            v-model="layoutProperties.height"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 text-xs">Max width</td>
        <td class="border">
          <select v-model="layoutProperties.maxWidth" class="w-full text-gray-700 px-2 py-2 text-xs">
            <option value>(none)</option>
            <option value="xs">xs</option>
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
            <option value="xl">xl</option>
            <option value="full">full</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 text-xs">Max height</td>
        <td class="border">
          <select v-model="layoutProperties.maxHeight" class="w-full text-gray-700 px-2 py-2 text-xs">
            <option value>(none)</option>
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
            <option value="xl">xl</option>
            <option value="full">full</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Padding top</td>
        <td class="border">
          <input
            v-model="layoutProperties.paddingTop"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Padding right</td>
        <td class="border">
          <input
            v-model="layoutProperties.paddingRight"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Padding bottom</td>
        <td class="border">
          <input
            v-model="layoutProperties.paddingBottom"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Padding left</td>
        <td class="border">
          <input
            v-model="layoutProperties.paddingLeft"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>

      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Margin top</td>
        <td class="border">
          <input
            v-model="layoutProperties.marginTop"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Margin right</td>
        <td class="border">
          <input
            v-model="layoutProperties.marginRight"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Margin bottom</td>
        <td class="border">
          <input
            v-model="layoutProperties.marginBottom"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Margin left</td>
        <td class="border">
          <input
            v-model="layoutProperties.marginLeft"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ResponsiveSizes, IComponentModel, PropertiesModel } from '@/models';

@Component
export default class LayoutProperties extends Vue {
  @Prop()
  size!: ResponsiveSizes;

  @Prop()
  model!: IComponentModel;

  get layoutProperties() {
    if (!this.model) return null;
    const properties: PropertiesModel = (this.model as any).properties;
    return properties.layouts.get(this.size);
  }
}
</script>
