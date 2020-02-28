<template>
  <table v-if="typographyProperties" class="table-fixed w-full">
    <tbody>
      <tr>
        <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Text align</td>
        <td class="w-7/12 border">
          <select
            v-model="typographyProperties.textAlign"
            class="w-full text-gray-700 px-2 py-2 text-xs"
          >
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
          <select
            v-model="typographyProperties.textSize"
            class="w-full text-gray-700 px-2 py-2 text-xs"
          >
            <option value>(default)</option>
            <option value="xs">XSmall</option>
            <option value="sm">Small</option>
            <option value="lg">Large</option>
            <option value="xl">XLarge</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Font weight</td>
        <td class="w-7/12 border">
          <select
            v-model="typographyProperties.fontWeight"
            class="w-full text-gray-700 px-2 py-2 text-xs"
          >
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
            v-model="typographyProperties.textColor.color"
            @color-selected="setTextColor"
          ></SelectColorComponent>
        </td>
      </tr>
      <tr>
        <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Text hover color</td>
        <td class="w-7/12 border">
          <SelectColorComponent
            v-model="typographyProperties.textColor.hover"
            @color-selected="setHoverColor"
          ></SelectColorComponent>
        </td>
      </tr>
      <tr>
        <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Font style</td>
        <td class="w-7/12 border">
          <select
            v-model="typographyProperties.fontStyle"
            class="w-full text-gray-700 px-2 py-2 text-xs"
          >
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
  IComponentModel,
  LabelComponentModel,
  SpanComponentModel,
  InputComponentModel,
  ButtonComponentModel,
  TextareaComponentModel,
  SelectComponentModel
} from '@/models';

@Component({
  components: {
    SelectColorComponent
  }
})
export default class TypographyProperties extends Vue {
  @Prop()
  size!: ResponsiveSizes;

  @Prop()
  model!: IComponentModel;

  get typographyProperties() {
    if (!this.model || !this.isValidModel) return null;
    const typographies: Map<ResponsiveSizes, TypographyModel> = (this
      .model as any).properties.typographies;
    return typographies.get(this.size);
  }

  get isValidModel(): boolean {
    return (
      this.model instanceof LabelComponentModel ||
      this.model instanceof SpanComponentModel ||
      this.model instanceof InputComponentModel ||
      this.model instanceof ButtonComponentModel ||
      this.model instanceof TextareaComponentModel ||
      this.model instanceof SelectComponentModel
    );
  }

  setTextColor(color: string) {
    this.typographyProperties!.textColor.color = color;
  }

  setHoverColor(color: string) {
    this.typographyProperties!.textColor.hover = color;
  }
}
</script>
