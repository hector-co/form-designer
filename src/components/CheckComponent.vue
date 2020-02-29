<template>
  <input
    @click.self="select"
    :type="model.properties.customProps.get('type').value"
    :name="model.properties.name"
    :class="layoutCss"
    class="check-component design-component"
    :value="model.properties.customProps.get('value').value"
    v-model="model.properties.customProps.get('checked').value"
  />
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseComponent } from './base-component';

@Component
export default class CheckComponent extends BaseComponent {}
</script>
