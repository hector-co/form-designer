<template>
  <table v-if="layoutCss" class="table-fixed w-full">
    <tbody>
      <tr>
        <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Width</td>
        <td class="w-7/12 border">
          <input
            v-model="layoutCss.width"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Height</td>
        <td class="border">
          <input
            v-model="layoutCss.height"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 text-xs">Max width</td>
        <td class="border">
          <select v-model="layoutCss.maxWidth" class="w-full text-gray-700 px-2 py-2 text-xs">
            <option value>(default)</option>
            <option value="none">None</option>
            <option value="xs">xs</option>
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
            <option value="xl">xl</option>
            <option value="2xl">2xl</option>
            <option value="3xl">3xl</option>
            <option value="4xl">4xl</option>
            <option value="5xl">5xl</option>
            <option value="6xl">6xl</option>
            <option value="full">full</option>
            <option value="screen-sm">screen small</option>
            <option value="screen-md">screen medium</option>
            <option value="screen-lg">screen large</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 text-xs">Max height</td>
        <td class="border">
          <select v-model="layoutCss.maxHeight" class="w-full text-gray-700 px-2 py-2 text-xs">
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
            v-model="layoutCss.paddingTop"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Padding right</td>
        <td class="border">
          <input
            v-model="layoutCss.paddingRight"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Padding bottom</td>
        <td class="border">
          <input
            v-model="layoutCss.paddingBottom"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Padding left</td>
        <td class="border">
          <input
            v-model="layoutCss.paddingLeft"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>

      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Margin top</td>
        <td class="border">
          <input
            v-model="layoutCss.marginTop"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Margin right</td>
        <td class="border">
          <input
            v-model="layoutCss.marginRight"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Margin bottom</td>
        <td class="border">
          <input
            v-model="layoutCss.marginBottom"
            class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray-100 border px-4 py-2 text-xs">Margin left</td>
        <td class="border">
          <input
            v-model="layoutCss.marginLeft"
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
import { ResponsiveSizes, ComponentModel } from '@/models';

@Component
export default class LayoutCss extends Vue {
  @Prop()
  size!: ResponsiveSizes;

  @Prop()
  model!: ComponentModel;

  get layoutCss() {
    if (!this.model) return null;
    return this.model.getCss('layout', this.size);
  }
}
</script>
