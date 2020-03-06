<template>
  <textarea
    @click.self="select"
    v-model="model.properties.get('text').value"
    :rows="model.properties.get('rows').value"
    :class="cssArray"
    class="textarea-component design-component"
    readonly
    style="resize: none;"
  ></textarea>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseCustomComponent } from './base-custom-component';

@Component
export default class TextareaComponent extends BaseCustomComponent {}
</script>
