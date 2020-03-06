<template>
  <select @click.self="select" :class="cssArray" class="select-component design-component"></select>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseCustomComponent } from './base-custom-component';

@Component
export default class SelectComponent extends BaseCustomComponent {}
</script>
