<template>
  <div class="designer">
    <div class="flex flex-wrap">
      <div class="w-full mb-2 p-3 bg-gray-100">
        <label class="block text-xl font-bold">
          Basic form designer using some
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
        <button
          @click="addCheck"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >check</button>
        <button
          @click="addButton"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >button</button>
        <button
          @click="addAnchor"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >a</button>
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
          @click="deleteSelected"
          class="bg-red-500 hover:bg-red-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >del</button>
        <button
          @click="clearState"
          class="bg-red-500 hover:bg-red-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >clear</button>
        <button
          @click="loadState"
          class="bg-teal-500 hover:bg-teal-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >loadState</button>
        <button
          @click="saveState"
          class="bg-teal-500 hover:bg-teal-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >saveState</button>
        <button
          @click="preview"
          class="bg-teal-500 hover:bg-teal-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >preview</button>
        <button
          @click="copyHtmlCode"
          class="bg-teal-500 hover:bg-teal-700 text-white py-2 px-2 mx-1 my-1 text-xs"
        >copyHtml</button>
      </div>
    </div>
    <div class="flex flex-wrap lg:flex-no-wrap">
      <div class="left-panel flex flex-wrap w-full lg:w-0">
        <div class="tree-container lg:mb-2 border w-full md:w-1/2 lg:w-full overflow-y-auto">
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
        <div ref="compsContainer" class="mx-1 px-1 mt-2 lg:mt-0 py-1 border overflow-y-auto">
          <DefaultComponent :model="root"></DefaultComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapMutations } from 'vuex';
import { ComponentModel } from '@/models';
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
  },
  methods: {
    ...mapMutations([
      'addGrid',
      'addColumn',
      'addLabel',
      'addSpan',
      'addInput',
      'addTextarea',
      'addSelect',
      'addOption',
      'addCheck',
      'addButton',
      'addAnchor',
      'addTable',
      'addTableRow',
      'addHeaderCell',
      'addDataCell',
      'moveUp',
      'moveDown',
      'deleteSelected',
      'clearState',
      'loadState'
    ])
  }
})
export default class Designer extends Vue {
  root!: ComponentModel;
  selected!: ComponentModel;
  htmlCode: string;

  constructor() {
    super();
    this.htmlCode = '';
  }

  saveState() {
    this.$store.commit('saveState');
    this.$store.commit('savePreview');
  }

  preview() {
    this.$store.commit('savePreview');
    const routeData = this.$router.resolve({ name: 'preview' });
    window.open(routeData.href, '_blank');
  }

  copyHtmlCode() {
    this.$store.commit('savePreview');
    const el = document.createElement('textarea');
    el.value = window.localStorage.getItem('form-preview')!;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  mounted() {
    if (this.$route.query['s']) {
      if (this.$route.query['s'] === 'example1')
        this.$store.commit('loadExample1');
      else if (this.$route.query['s'] === 'example2')
        this.$store.commit('loadExample2');
      this.$router.replace('/');
    } else this.$store.commit('loadState');

    window.onresize = this.adjustSizes;
    this.adjustSizes();
  }

  adjustSizes() {
    const screenwidth = document.documentElement.clientWidth;
    if (screenwidth < 1024) {
      (this.$refs.propsContainer as HTMLElement).style.maxHeight = '16rem';
      (this.$refs.compsContainer as HTMLElement).style.maxHeight = 'auto';
    } else {
      const maxHeight = document.documentElement.clientHeight;
      (this.$refs
        .propsContainer as HTMLElement).style.maxHeight = `${maxHeight -
        256 -
        120}px`;
      (this.$refs
        .compsContainer as HTMLElement).style.maxHeight = `${maxHeight -
        112}px`;
    }
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

.tree-container,
.properties-container {
  max-height: 16rem;
  min-height: 16rem;
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
