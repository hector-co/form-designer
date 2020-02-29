<template>
  <span
    @click.self="select"
    :class="layoutCss"
    class="span-component design-component"
  >{{model.properties.text}}</span>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseComponent } from './base-component';

@Component
export default class SpanComponent extends BaseComponent {}
</script>
