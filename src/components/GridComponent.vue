<template>
  <div @click.self="select" class="grid-component design-component" :class="layoutCss">
    <component v-for="child in model.children" :key="child.id" :is="child.component" :model="child"></component>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseComponent } from './base-component';
import { GridComponentModel } from '@/models';

@Component
export default class GridComponent extends BaseComponent<GridComponentModel> {}
</script>
