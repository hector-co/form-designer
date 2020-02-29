<template>
  <option
    @click.self="select"
    :class="layoutCss"
    class="option-component design-component"
    :value="model.properties.customProps.get('value').value"
  >{{model.properties.text}}</option>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseComponent } from './base-component';
import { OptionComponentModel } from '@/models';

@Component
export default class OptionComponent extends BaseComponent<
  OptionComponentModel
> {}
</script>
