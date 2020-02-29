<template>
  <div>
    <table v-if="borderProperties" class="table-fixed w-full mb-2">
      <tbody>
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Border style</td>
          <td class="w-7/12 border">
            <select v-model="borderProperties.style" class="w-full text-gray-700 px-2 py-2 text-xs">
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
            <select v-model="borderProperties.width" class="w-full text-gray-700 px-2 py-2 text-xs">
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
            <SelectColorComponent
              v-model="borderProperties.color.color"
              @color-selected="setBorderColor"
            ></SelectColorComponent>
          </td>
        </tr>
        <tr>
          <td class="bg-gray-100 border px-4 py-2 text-xs">Border hover color</td>
          <td class="border">
            <SelectColorComponent
              v-model="borderProperties.color.hover"
              @color-selected="setBorderHoverColor"
            ></SelectColorComponent>
          </td>
        </tr>
      </tbody>
    </table>
    <table v-if="bgColorsProperties" class="table-fixed w-full mb-2">
      <tbody>
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Bg color</td>
          <td class="w-7/12 border">
            <SelectColorComponent v-model="bgColorsProperties.color" @color-selected="setBgColor"></SelectColorComponent>
          </td>
        </tr>
        <tr>
          <td class="bg-gray-100 border px-4 py-2 text-xs">Bg hover color</td>
          <td class="border">
            <SelectColorComponent
              v-model="bgColorsProperties.hover"
              @color-selected="setBgHoverColor"
            ></SelectColorComponent>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  PropertiesModel,
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
export default class BorderBgProperties extends Vue {
  @Prop()
  size!: ResponsiveSizes;

  @Prop()
  model!: ComponentModel;

  get borderProperties(): BorderModel | undefined {
    if (!this.model) return undefined;
    const properties: PropertiesModel = (this.model as any).properties;
    return properties.borders.get(this.size);
  }

  get bgColorsProperties(): ColorModel | undefined {
    if (!this.model) return undefined;
    const properties: PropertiesModel = (this.model as any).properties;
    return properties.backgroundColors.get(this.size);
  }

  setBorderColor(color: string) {
    this.borderProperties!.color.color = color;
  }

  setBorderHoverColor(color: string) {
    this.borderProperties!.color.hover = color;
  }

  setBgColor(color: string) {
    this.bgColorsProperties!.color = color;
  }

  setBgHoverColor(color: string) {
    this.bgColorsProperties!.hover = color;
  }
}
</script>
