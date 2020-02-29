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
    <BaseComponent v-for="child in model.children" :key="child.id" :model="child"></BaseComponent>
  </component>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { ComponentModel } from '@/models';

@Component
export default class BaseComponent extends Vue {
  @Prop()
  model!: ComponentModel;

  select() {
    this.$store.commit('select', this.model);
  }

  get isSelected(): boolean {
    return this.model === this.$store.state.selected;
  }

  get layoutCss(): string {
    return (
      `${this.isSelected ? 'selected' : ''} ` +
      (this.model as any).properties.getCss()
    );
  }
}
</script>
