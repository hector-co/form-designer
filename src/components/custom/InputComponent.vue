<template>
  <input
    @click.self="select"
    :type="model.properties.customProps.get('type').value"
    :class="layoutCss"
    :value="model.properties.customProps.get('value').value"
    readonly
  />
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseCustomComponent } from './base-custom-component';

@Component
export default class InputComponent extends BaseCustomComponent {}
</script>
