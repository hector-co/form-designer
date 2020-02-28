<template>
  <input
    @click.self="select"
    :type="model.properties.type"
    :class="layoutCss"
    class="input-component design-component"
    :value="model.properties.value"
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
