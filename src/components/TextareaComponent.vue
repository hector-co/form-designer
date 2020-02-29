<template>
  <textarea
    @click.self="select"
    v-model="model.properties.text"
    :rows="model.properties.customProps.get('rows').value"
    :class="layoutCss"
    class="textarea-component design-component"
    readonly
    style="resize: none;"
  ></textarea>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseComponent } from './base-component';

@Component
export default class TextareaComponent extends BaseComponent {}
</script>
