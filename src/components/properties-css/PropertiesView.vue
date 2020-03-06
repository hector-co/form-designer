<template>
  <div v-if="model">
    <BaseProperties :model="model">
      <template v-if="isLabel">
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">For</td>
          <td class="w-7/12 border">
            <input
              v-model="model.properties.get('for').value"
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
            <select
              v-model="model.properties.get('type').value"
              class="w-full text-gray-700 px-2 py-2 text-xs"
            >
              <option value="text">Text</option>
              <option value="password">Password</option>
              <!-- <option value="file">File</option> -->
              <option value="email">Email</option>
              <option value="tel">Telephone</option>
              <option value="number">Number</option>
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
            <select
              v-model="model.properties.get('type').value"
              class="w-full text-gray-700 px-2 py-2 text-xs"
            >
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio</option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="bg-gray-100 border px-4 text-xs">Checked</td>
          <td class="border">
            <select
              v-model="model.properties.get('checked').value"
              class="w-full text-gray-700 px-2 py-2 text-xs"
            >
              <option :value="true">True</option>
              <option :value="false">False</option>
            </select>
          </td>
        </tr>
      </template>
      <template v-if="isInput || isCheck || isOption">
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Value</td>
          <td class="w-7/12 border">
            <input
              v-model="model.properties.get('value').value"
              class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
              type="text"
            />
          </td>
        </tr>
      </template>
      <template v-if="isAnchor">
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">HRef</td>
          <td class="w-7/12 border">
            <input
              v-model="model.properties.get('href').value"
              class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
              type="text"
            />
          </td>
        </tr>
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Target</td>
          <td class="w-7/12 border">
            <select
              v-model="model.properties.get('target').value"
              class="w-full text-gray-700 px-2 py-2 text-xs"
            >
              <option value>Self</option>
              <option value="_blank">Blank</option>
            </select>
          </td>
        </tr>
      </template>
      <template v-if="hasText">
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
              v-model="model.properties.get('rows').value"
              class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
              type="text"
            />
          </td>
        </tr>
      </template>
      <template v-if="isOption">
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Selected</td>
          <td class="w-7/12 border">
            <select
              v-model="model.properties.get('selected').value"
              class="w-full text-gray-700 px-2 py-2 text-xs"
            >
              <option :value="true">True</option>
              <option :value="false">False</option>
            </select>
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
    <ContentCss :model="model" :size="responsiveSize"></ContentCss>
    <TypographyCss :model="model" :size="responsiveSize"></TypographyCss>
    <table class="table-fixed w-full">
      <tbody>
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Cursor</td>
          <td class="w-7/12 border">
            <select
              v-model="interactivityProperties.cursor"
              class="w-full text-gray-700 px-2 py-2 text-xs"
            >
              <option value>(Not specified)</option>
              <option value="auto">Auto</option>
              <option value="default">Default</option>
              <option value="pointer">Pointer</option>
              <option value="wait">Wait</option>
              <option value="text">Text</option>
              <option value="move">Move</option>
              <option value="not-allowd">Not allowed</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <BorderBgCss :model="model" :size="responsiveSize"></BorderBgCss>
    <LayoutCss :model="model" :size="responsiveSize"></LayoutCss>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import BaseProperties from './BaseProperties.vue';
import LayoutCss from './LayoutCss.vue';
import ContentCss from './ContentCss.vue';
import TypographyCss from './TypographyCss.vue';
import BorderBgCss from './BorderBgCss.vue';
import { ResponsiveSizes, ComponentModel } from '@/models';

@Component({
  components: {
    BaseProperties,
    LayoutCss,
    ContentCss,
    TypographyCss,
    BorderBgCss
  }
})
export default class PropertiesView extends Vue {
  @Prop()
  model!: ComponentModel;

  typesWithText: string[];

  responsiveSize!: ResponsiveSizes;

  constructor() {
    super();
    this.responsiveSize = ResponsiveSizes.All;
    this.typesWithText = [
      'Label',
      'Span',
      'Textarea',
      'Button',
      'Option',
      'DataCell',
      'HeaderCell',
      'Anchor'
    ];
  }

  get interactivityProperties() {
    if (!this.model) return null;
    return this.model.getCss('interactivity', this.responsiveSize);
  }

  @Watch('model')
  onModelChange() {
    this.responsiveSize = ResponsiveSizes.All;
  }

  get hasText(): boolean {
    return this.typesWithText.indexOf(this.model.typeName) >= 0;
  }

  get isLabel(): boolean {
    return this.model.typeName === 'Label';
  }

  get isSpan(): boolean {
    return this.model.typeName === 'Span';
  }

  get isInput(): boolean {
    return this.model.typeName === 'Input';
  }

  get isCheck(): boolean {
    return this.model.typeName === 'Check';
  }

  get isButton(): boolean {
    return this.model.typeName === 'Button';
  }

  get isTextarea(): boolean {
    return this.model.typeName === 'Textarea';
  }

  get isSelect(): boolean {
    return this.model.typeName === 'Select';
  }

  get isOption(): boolean {
    return this.model.typeName === 'Option';
  }

  get isAnchor(): boolean {
    return this.model.typeName === 'Anchor';
  }
}
</script>
