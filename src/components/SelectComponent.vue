<template>
  <select @click.self="select" :class="layoutCss" class="select-component design-component"></select>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseComponent } from './base-component';
import { SelectComponentModel } from '@/models';

@Component
export default class SelectComponent extends BaseComponent<
  SelectComponentModel
> {}
</script>
