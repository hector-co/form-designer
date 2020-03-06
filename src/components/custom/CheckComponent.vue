<template>
  <input
    @click.self="select"
    :type="model.properties.get('type').value"
    :name="model.properties.get('name').value"
    :class="cssArray"
    class="check-component design-component"
    :value="model.properties.get('value').value"
    v-model="model.properties.get('checked').value"
  />
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseCustomComponent } from './base-custom-component';

@Component
export default class CheckComponent extends BaseCustomComponent {}
</script>
