<template>
  <div v-if="model">
    <BaseProperties :model="model">
      <template v-if="isLabel">
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">For</td>
          <td class="w-7/12 border">
            <input
              v-model="model.properties.forId"
              class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
              type="text"
            />
          </td>
        </tr>
      </template>
      <template v-if="isLabel || isSpan || isButton || isTextarea">
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Text</td>
          <td class="w-7/12 border">
            <input
              v-model="model.properties.text"
              class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
              type="text"
            />
          </td>
        </tr>
      </template>
      <template v-if="isTextarea">
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Rows</td>
          <td class="w-7/12 border">
            <input
              v-model="model.properties.rows"
              class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
              type="text"
            />
          </td>
        </tr>
      </template>
      <template v-if="isInput">
        <tr>
          <td class="bg-gray-100 border px-4 text-xs">Type</td>
          <td class="border">
            <select v-model="model.properties.type" class="w-full text-gray-700 px-2 py-2 text-xs">
              <option value="text">Text</option>
              <option value="password">Password</option>
              <!-- <option value="file">File</option> -->
              <option value="email">Email</option>
              <option value="tel">Telephone</option>
              <option value="date">Date</option>
              <option value="time">Time</option>
            </select>
          </td>
        </tr>
      </template>
      <template v-if="isCheck">
        <tr>
          <td class="bg-gray-100 border px-4 text-xs">Type</td>
          <td class="border">
            <select v-model="model.properties.type" class="w-full text-gray-700 px-2 py-2 text-xs">
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio</option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="bg-gray-100 border px-4 text-xs">Checked</td>
          <td class="border">
            <select
              v-model="model.properties.checked"
              class="w-full text-gray-700 px-2 py-2 text-xs"
            >
              <option :value="true">True</option>
              <option :value="false">False</option>
            </select>
          </td>
        </tr>
      </template>
      <template v-if="isInput || isCheck">
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Value</td>
          <td class="w-7/12 border">
            <input
              v-model="model.properties.value"
              class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
              type="text"
            />
          </td>
        </tr>
      </template>
    </BaseProperties>

    <table class="table-fixed w-full">
      <tbody>
        <tr>
          <th class="w-5/12 bg-gray-100 border px-4 text-xs">Layout</th>
          <td class="w-7/12 border">
            <select v-model="responsiveSize" class="w-full text-gray-700 px-2 py-2 text-xs">
              <option :value="0">All</option>
              <option :value="1">Small</option>
              <option :value="2">Medium</option>
              <option :value="3">Large</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <ContentProperties :model="model" :size="responsiveSize"></ContentProperties>
    <TypographyProperties :model="model" :size="responsiveSize"></TypographyProperties>
    <BorderBgProperties :model="model" :size="responsiveSize"></BorderBgProperties>
    <LayoutProperties :model="model" :size="responsiveSize"></LayoutProperties>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import BaseProperties from './BaseProperties.vue';
import LayoutProperties from './LayoutProperties.vue';
import ContentProperties from './ContentProperties.vue';
import TypographyProperties from './TypographyProperties.vue';
import BorderBgProperties from './BorderBgProperties.vue';
import {
  ResponsiveSizes,
  IComponentModel,
  LabelComponentModel,
  InputComponentModel,
  CheckComponentModel,
  SpanComponentModel,
  ButtonComponentModel,
  TextareaComponentModel
} from '@/models';

@Component({
  components: {
    BaseProperties,
    LayoutProperties,
    ContentProperties,
    TypographyProperties,
    BorderBgProperties
  }
})
export default class PropertiesView extends Vue {
  @Prop()
  model!: IComponentModel;

  responsiveSize!: ResponsiveSizes;

  constructor() {
    super();
    this.responsiveSize = ResponsiveSizes.All;
  }

  @Watch('model')
  onModelChange() {
    this.responsiveSize = ResponsiveSizes.All;
  }

  get isLabel(): boolean {
    return this.model instanceof LabelComponentModel;
  }

  get isSpan(): boolean {
    return this.model instanceof SpanComponentModel;
  }

  get isInput(): boolean {
    return this.model instanceof InputComponentModel;
  }

  get isCheck(): boolean {
    return this.model instanceof CheckComponentModel;
  }

  get isButton(): boolean {
    return this.model instanceof ButtonComponentModel;
  }

  get isTextarea(): boolean {
    return this.model instanceof TextareaComponentModel;
  }
}
</script>
