<template>
  <div id="app">
    <div class="flex">
      <div class="left-panel">
        <button
          @click="addGrid"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Grid</button>
        <button
          @click="addColumn"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Column</button>
        <button
          @click="addLabel"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Label</button>
        <button
          @click="addInput"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Input</button>
        <button
          @click="addTextarea"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Textarea</button>
        <button
          @click="addSelect"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Select</button>
        <button
          @click="addOption"
          class="bg-orange-500 hover:bg-orange-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Option</button>
        <button
          @click="addSpan"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Span</button>
        <button
          @click="addInputWithLabel"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Input+Label</button>
        <button
          @click="addCheck"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Check</button>
        <button
          @click="addCheckWithLabel"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Check+Label</button>
        <button
          @click="addButton"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Button</button>
        <button
          @click="addTable"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Table</button>
        <button
          @click="addTableRow"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Tr</button>
        <button
          @click="addHeaderCell"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Th</button>
        <button
          @click="addDataCell"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Td</button>
        <button
          @click="moveUp"
          class="bg-green-500 hover:bg-green-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Down</button>
        <button
          @click="moveDown"
          class="bg-green-500 hover:bg-green-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Up</button>
        <button
          @click="deleteComponent"
          class="bg-red-500 hover:bg-red-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >Del</button>
        <button
          @click="copyHtmlCode"
          class="bg-green-500 hover:bg-green-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >CopyHtml</button>

        <div class="tree-container mb-2 border overflow-y-auto">
          <TreeView :model="root"></TreeView>
        </div>

        <div ref="propsContainer" class="properties-container overflow-y-auto">
          <PropertiesView :model="selected"></PropertiesView>
        </div>
      </div>
      <div class="w-full">
        <div ref="compsContainer" class="mx-1 my-1 px-1 py-1 border overflow-y-auto">
          <BaseComponent :model="root"></BaseComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { ComponentModel, toHtml } from './models';
import BaseComponent from '@/components/BaseComponent.vue';
import TreeView from '@/components/TreeView.vue';
import PropertiesView from '@/components/properties/PropertiesView.vue';
import CheckComponent from '@/components/custom/CheckComponent.vue';
import InputComponent from '@/components/custom/InputComponent.vue';
import SelectComponent from '@/components/custom/SelectComponent.vue';
import TextareaComponent from '@/components/custom/TextareaComponent.vue';

Vue.component('TreeView', TreeView);
Vue.component('PropertiesView', PropertiesView);
Vue.component('CheckComponent', CheckComponent);
Vue.component('InputComponent', InputComponent);
Vue.component('SelectComponent', SelectComponent);
Vue.component('TextareaComponent', TextareaComponent);
Vue.component('BaseComponent', BaseComponent);

@Component({
  computed: {
    ...mapState(['root', 'selected'])
  }
})
export default class App extends Vue {
  root!: ComponentModel;
  htmlCode: string;

  constructor() {
    super();
    this.htmlCode = '';
  }

  copyHtmlCode() {
    const el = document.createElement('textarea');
    el.value = toHtml(this.root);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  addGrid() {
    this.$store.commit('addGrid');
  }

  addColumn() {
    this.$store.commit('addColumn');
  }

  addLabel() {
    this.$store.commit('addLabel');
  }

  addSpan() {
    this.$store.commit('addSpan');
  }

  addInput() {
    this.$store.commit('addInput');
  }

  addTextarea() {
    this.$store.commit('addTextarea');
  }

  addSelect() {
    this.$store.commit('addSelect');
  }

  addOption() {
    this.$store.commit('addOption');
  }

  addInputWithLabel() {
    this.$store.commit('addInputWithLabel');
  }

  addCheck() {
    this.$store.commit('addCheck');
  }

  addCheckWithLabel() {
    this.$store.commit('addCheckWithLabel');
  }

  addButton() {
    this.$store.commit('addButton');
  }

  addTable() {
    this.$store.commit('addTable');
  }

  addTableRow() {
    this.$store.commit('addTableRow');
  }

  addHeaderCell() {
    this.$store.commit('addHeaderCell');
  }

  addDataCell() {
    this.$store.commit('addDataCell');
  }

  moveUp() {
    this.$store.commit('moveUp');
  }

  moveDown() {
    this.$store.commit('moveDown');
  }

  deleteComponent() {
    this.$store.commit('delete');
  }

  mounted() {
    window.onresize = this.adjustSizes;
    this.adjustSizes();
  }

  adjustSizes() {
    const maxHeight = document.documentElement.clientHeight;
    (this.$refs.propsContainer as HTMLElement).style.maxHeight = `${maxHeight -
      256 -
      190}px`;
    (this.$refs.compsContainer as HTMLElement).style.maxHeight = `${maxHeight -
      20}px`;
  }
}
</script>

<style lang="scss">
.design-component.column-component:hover {
  background: hsla(240, 100%, 99%, 0.815);
}

.design-component.selected {
  background: hsla(210, 100%, 80%, 0.5) !important;
}

.tree-container {
  height: 16rem;
}

.left-panel {
  width: 24rem;
  min-width: 24rem;
}
</style>
