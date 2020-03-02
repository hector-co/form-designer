<template>
  <div id="app">
    <a href="https://github.com/hector-co/form-designer" class="github-corner" aria-label="View source on GitHub">
      <svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;"
        aria-hidden="true"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor"
          style="transform-origin: 130px 106px;"
          class="octo-arm"
        />
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor"
          class="octo-body"
        />
      </svg>
    </a>
    <div class="flex flex-wrap">
      <div class="w-full mb-2 p-3 bg-gray-100">
        <label class="block text-xl font-bold">
          Basic form designer using
          <a
            class="text-blue-500"
            target="_blank"
            href="https://tailwindcss.com/"
          >tailwind css</a> classes
        </label>
      </div>
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
          @click="moveDown"
          class="bg-green-500 hover:bg-green-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >up</button>
        <button
          @click="moveUp"
          class="bg-green-500 hover:bg-green-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >down</button>
        <button
          @click="deleteComponent"
          class="bg-red-500 hover:bg-red-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >del</button>
        <button
          @click="copyHtmlCode"
          class="bg-green-500 hover:bg-green-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >copyHtml</button>
      </div>
    </div>
    <div class="flex flex-wrap lg:flex-no-wrap">
      <div class="left-panel flex flex-wrap">
        <div class="tree-container mb-2 border w-full md:w-1/2 lg:w-full overflow-y-auto">
          <TreeView :model="root"></TreeView>
        </div>
        <div
          ref="propsContainer"
          class="properties-container w-full md:w-1/2 lg:w-full overflow-y-auto"
        >
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

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}
@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}
@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
</style>
