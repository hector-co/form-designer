<template>
  <div @click.self="select" :class="layoutCss" class="column-component design-component">
    <component v-for="child in model.children" :key="child.id" :is="child.component" :model="child"></component>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseComponent } from './base-component';

@Component
export default class ColumnComponent extends BaseComponent {}
</script>
