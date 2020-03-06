<template>
  <div>
    <table v-if="borderCss" class="table-fixed w-full mb-2">
      <tbody>
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Border style</td>
          <td class="w-7/12 border">
            <select v-model="borderCss.style" class="w-full text-gray-700 px-2 py-2 text-xs">
              <option value>Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="bg-gray-100 border px-4 py-2 text-xs">Border width</td>
          <td class="border">
            <select v-model="borderCss.width" class="w-full text-gray-700 px-2 py-2 text-xs">
              <option value>(none)</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="bg-gray-100 border px-4 py-2 text-xs">Border color</td>
          <td class="border">
            <SelectColorComponent v-model="borderCss.color.color" @color-selected="setBorderColor"></SelectColorComponent>
          </td>
        </tr>
        <tr>
          <td class="bg-gray-100 border px-4 py-2 text-xs">Border hover color</td>
          <td class="border">
            <SelectColorComponent
              v-model="borderCss.color.hover"
              @color-selected="setBorderHoverColor"
            ></SelectColorComponent>
          </td>
        </tr>
        <tr>
          <td class="bg-gray-100 border px-4 py-2 text-xs">Border radius</td>
          <td class="border">
            <select v-model="borderCss.radius" class="w-full text-gray-700 px-2 py-2 text-xs">
              <option value>(default)</option>
              <option value="none">None</option>
              <option value="1">Rounded</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="full">Full</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <table v-if="bgColorCss" class="table-fixed w-full mb-2">
      <tbody>
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Bg color</td>
          <td class="w-7/12 border">
            <SelectColorComponent v-model="bgColorCss.color" @color-selected="setBgColor"></SelectColorComponent>
          </td>
        </tr>
        <tr>
          <td class="bg-gray-100 border px-4 py-2 text-xs">Bg hover color</td>
          <td class="border">
            <SelectColorComponent v-model="bgColorCss.hover" @color-selected="setBgHoverColor"></SelectColorComponent>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  ResponsiveSizes,
  ComponentModel,
  BorderModel,
  ColorModel
} from '@/models';
import SelectColorComponent from './SelectColorComponent.vue';

@Component({
  components: {
    SelectColorComponent
  }
})
export default class BorderBgCss extends Vue {
  @Prop()
  size!: ResponsiveSizes;

  @Prop()
  model!: ComponentModel;

  get borderCss(): BorderModel | undefined {
    if (!this.model) return undefined;
    return this.model.getCss<BorderModel>('border', this.size);
  }

  get bgColorCss(): ColorModel | undefined {
    if (!this.model) return undefined;
    return this.model.getCss<ColorModel>('backgroundColor', this.size);
  }

  setBorderColor(color: string) {
    this.borderCss!.color.color = color;
  }

  setBorderHoverColor(color: string) {
    this.borderCss!.color.hover = color;
  }

  setBgColor(color: string) {
    this.bgColorCss!.color = color;
  }

  setBgHoverColor(color: string) {
    this.bgColorCss!.hover = color;
  }
}
</script>
