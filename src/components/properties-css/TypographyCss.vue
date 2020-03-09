<template>
  <table v-if="typographyCss" class="table-fixed w-full">
    <tbody>
      <tr>
        <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Text align</td>
        <td class="w-7/12 border">
          <select v-model="typographyCss.textAlign" class="w-full text-gray-700 px-2 py-2 text-xs">
            <option value>(default)</option>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Text size</td>
        <td class="w-7/12 border">
          <select v-model="typographyCss.textSize" class="w-full text-gray-700 px-2 py-2 text-xs">
            <option value>(default)</option>
            <option value="xs">XSmall</option>
            <option value="sm">Small</option>
            <option value="Base">Base</option>
            <option value="lg">Large</option>
            <option value="xl">XLarge</option>
            <option value="2xl">2XLarge</option>
            <option value="3xl">3XLarge</option>
            <option value="4xl">4XLarge</option>
            <option value="5xl">5XLarge</option>
            <option value="6xl">6XLarge</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Font weight</td>
        <td class="w-7/12 border">
          <select v-model="typographyCss.fontWeight" class="w-full text-gray-700 px-2 py-2 text-xs">
            <option value>(default)</option>
            <option value="thin">Thin</option>
            <option value="medium">Medium</option>
            <option value="bold">Bold</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Text color</td>
        <td class="w-7/12 border">
          <SelectColorComponent
            v-model="typographyCss.textColor.color"
            @color-selected="setTextColor"
          ></SelectColorComponent>
        </td>
      </tr>
      <tr>
        <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Text hover color</td>
        <td class="w-7/12 border">
          <SelectColorComponent
            v-model="typographyCss.textColor.hover"
            @color-selected="setHoverColor"
          ></SelectColorComponent>
        </td>
      </tr>
      <tr>
        <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Font style</td>
        <td class="w-7/12 border">
          <select v-model="typographyCss.fontStyle" class="w-full text-gray-700 px-2 py-2 text-xs">
            <option value>(none)</option>
            <option value="italic">Italic</option>
            <option value="not-italic">Not italic</option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import SelectColorComponent from './SelectColorComponent.vue';
import {
  TypographyModel,
  ResponsiveSizes,
  ComponentModel,
  Dictionary
} from '@/models';

@Component({
  components: {
    SelectColorComponent
  }
})
export default class TypographyCss extends Vue {
  @Prop()
  size!: ResponsiveSizes;

  @Prop()
  model!: ComponentModel;

  invalidTypes: string[];

  constructor() {
    super();
    this.invalidTypes = ['Check', 'Column', 'Container', 'Grid'];
  }

  get typographyCss() {
    if (!this.model || !this.isValidModel) return null;

    return this.model.getCss<TypographyModel>('typography', this.size);
  }

  get isValidModel(): boolean {
    return this.invalidTypes.indexOf(this.model.typeName) < 0;
  }

  setTextColor(color: string) {
    this.typographyCss!.textColor.color = color;
  }

  setHoverColor(color: string) {
    this.typographyCss!.textColor.hover = color;
  }
}
</script>
