<template>
  <select
    @click.self="select"
    :class="layoutCss"
    class="select-component design-component"
    v-model="selectedOption"
  >
    <option
      v-for="option in model.properties.options"
      :key="option.key"
      :value="option"
    >{{option.text}}</option>
  </select>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseComponent } from './base-component';
import { SelectComponentModel, SelectOption } from '@/models';

@Component
export default class SelectComponent extends BaseComponent<
  SelectComponentModel
> {
  get selectedOption(): SelectOption | undefined {
    return this.model.properties.options.find(o => o.selected);
  }
  set selectedOption(value: SelectOption | undefined) {
    this.model.properties.options.forEach(o => (o.selected = false));
    if (!value) return;
    value.selected = true;
  }
}
</script>
