<template>
  <label @click.self="select" :class="layoutCss" class="label-component design-component">
    {{model.properties.text}}
    <component v-for="child in model.children" :key="child.id" :is="child.component" :model="child"></component>
  </label>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseComponent } from './base-component';
import { LabelComponentModel } from '@/models';

@Component
export default class LabelComponent extends BaseComponent<
  LabelComponentModel
> {}
</script>
