<template>
  <input
    @click.self="select"
    :type="model.properties.type"
    :name="model.properties.name"
    :class="layoutCss"
    class="check-component design-component"
    :value="model.properties.value"
    v-model="model.properties.checked"
  />
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseComponent } from './base-component';
import { CheckComponentModel } from '@/models';

@Component
export default class CheckComponent extends BaseComponent<
  CheckComponentModel
> {}
</script>
