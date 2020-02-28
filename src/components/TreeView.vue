<template>
  <div class="tree-view">
    <div class="flex">
      <div class="w-4 cursor-pointer">
        <template v-if="hasChildren">
          <span @click="toggle" v-if="expanded">-</span>
          <span @click="toggle" v-if="!expanded">+</span>
        </template>
      </div>
      <div class="w-full">
        <div
          @click="select"
          class="tree-view-item hover:bg-gray-100 cursor-pointer text-sm"
          :class="{'bg-gray-300': isSelected}"
        >{{model.name}}</div>
      </div>
    </div>
    <div v-show="expanded" class="flex">
      <div class="w-4"></div>
      <div class="w-auto">
        <TreeView v-for="child in model.children" :key="child.id" :model="child"></TreeView>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BaseComponent } from './base-component';
import { IComponentModel, BaseContainerComponentModel } from '@/models';

@Component
export default class TreeView extends BaseComponent<IComponentModel> {
  expanded: boolean = true;

  toggle() {
    this.expanded = !this.expanded;
  }

  get hasChildren() {
    return (
      this.model instanceof BaseContainerComponentModel &&
      this.model.children &&
      this.model.children.length
    );
  }
}
</script>
