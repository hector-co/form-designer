<template>
  <component
    v-if="model"
    :model="model"
    v-bind="model.properties.getAttributes()"
    @click.self="select"
    :is="model.component"
    class="design-component"
    :class="layoutCss"
  >
    {{model.properties.text}}
    <DefaultComponent v-for="child in model.children" :key="child.id" :model="child"></DefaultComponent>
  </component>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseCustomComponent } from './base-custom-component';

@Component
export default class DefaultComponent extends BaseCustomComponent {}
</script>
