<template>
  <div id="app">
    <div class="flex flex-wrap lg:flex-no-wrap">
      <div class="left-panel flex flex-wrap">
        <div class="w-full">
          <button
            @click="addGrid"
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >grid</button>
          <button
            @click="addColumn"
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >column</button>
          <button
            @click="addLabel"
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >label</button>
          <button
            @click="addInput"
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >input</button>
          <button
            @click="addTextarea"
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >textarea</button>
          <button
            @click="addSelect"
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >select</button>
          <button
            @click="addOption"
            class="bg-orange-500 hover:bg-orange-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >option</button>
          <button
            @click="addSpan"
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >span</button>
          <!-- <button
          @click="addInputWithLabel"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >input+label</button>-->
          <button
            @click="addCheck"
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >check</button>
          <!-- <button
          @click="addCheckWithLabel"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >Check+Label</button>-->
          <button
            @click="addButton"
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >button</button>
          <button
            @click="addTable"
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >table</button>
          <button
            @click="addTableRow"
            class="bg-orange-500 hover:bg-orange-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >tr</button>
          <button
            @click="addHeaderCell"
            class="bg-orange-500 hover:bg-orange-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >th</button>
          <button
            @click="addDataCell"
            class="bg-orange-500 hover:bg-orange-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >td</button>
          <button
            @click="moveUp"
            class="bg-orange-500 hover:bg-orange-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >down</button>
          <button
            @click="moveDown"
            class="bg-green-500 hover:bg-green-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >up</button>
          <button
            @click="deleteComponent"
            class="bg-red-500 hover:bg-red-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >del</button>
          <button
            @click="copyHtmlCode"
            class="bg-green-500 hover:bg-green-700 text-white py-2 px-2 mx-1 my-1 text-xs"
          >copyHtml</button>
        </div>
        
        <div class="tree-container mb-2 border w-full md:w-1/2 lg:w-full overflow-y-auto">
          <TreeView :model="root"></TreeView>
        </div>

        <div ref="propsContainer" class="properties-container w-full md:w-1/2 lg:w-full overflow-y-auto">
          <PropertiesView :model="selected"></PropertiesView>
        </div>
      </div>
      <div class="w-full">
        <div ref="compsContainer" class="mx-1 my-1 px-1 py-1 md:mt-2 border overflow-y-auto">
          <DefaultComponent :model="root"></DefaultComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { ComponentModel, toHtml } from './models';
import TreeView from '@/components/TreeView.vue';
import PropertiesView from '@/components/properties/PropertiesView.vue';
import DefaultComponent from '@/components/custom/DefaultComponent.vue';
import CheckComponent from '@/components/custom/CheckComponent.vue';
import InputComponent from '@/components/custom/InputComponent.vue';
import SelectComponent from '@/components/custom/SelectComponent.vue';
import TextareaComponent from '@/components/custom/TextareaComponent.vue';

Vue.component('TreeView', TreeView);
Vue.component('PropertiesView', PropertiesView);
Vue.component('DefaultComponent', DefaultComponent);
Vue.component('CheckComponent', CheckComponent);
Vue.component('InputComponent', InputComponent);
Vue.component('SelectComponent', SelectComponent);
Vue.component('TextareaComponent', TextareaComponent);

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
      140}px`;
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
  @media (min-width: 1024px) {
    width: 24rem;
    min-width: 24rem;
  }
}
</style>
