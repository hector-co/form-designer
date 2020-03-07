<template>
  <component
    v-if="model"
    :model="model"
    @click.self="select"
    :is="model.component"
    class="design-component"
    :class="cssArray"
  >
    {{model.properties.get('text').value}}
    <DefaultComponent v-for="child in model.children" :key="child.id" :model="child" :responsiveSize="responsiveSize"></DefaultComponent>
  </component>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseCustomComponent } from './base-custom-component';

@Component
export default class DefaultComponent extends BaseCustomComponent {}
</script>
