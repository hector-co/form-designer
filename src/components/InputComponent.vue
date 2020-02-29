<template>
  <input
    @click.self="select"
    :type="model.properties.customProps.get('type').value"
    :class="layoutCss"
    class="input-component design-component"
    :value="model.properties.customProps.get('value').value"
    readonly
  />
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseComponent } from './base-component';
import { InputComponentModel } from '@/models';

@Component
export default class InputComponent extends BaseComponent<
  InputComponentModel
> {}
</script>
