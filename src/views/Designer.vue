<template>
  <div class="mx-auto">
    <div class="w-full flex">
      <div class="w-full p-4 mb-2 bg-gray-100">
        <label class="block text-2xl font-bold">
          <span>Basic form designer using some</span>
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            class="text-blue-500 cursor-pointer mx-1"
          >tailwind css</a>
          <span>classes</span>
        </label>
      </div>
    </div>
    <div class="w-full flex flex-wrap lg:flex-no-wrap">
      <div class="w-full mb-2 lg:w-auto border-gray-200">
        <div class="left-panel w-full flex flex-wrap md:flex-no-wrap lg:flex-wrap">
          <div
            id="tree-container"
            class="tree-container w-full p-1 mb-1 md:w-5/12 lg:w-full border overflow-y-auto"
          >
            <TreeView :model="root"></TreeView>
          </div>
          <div
            id="props-container"
            ref="propsContainer"
            class="w-full mb-1 md:w-7/12 lg:w-full overflow-y-auto"
          >
            <PropertiesView :model="selected" :responsiveSize="responsiveSize"></PropertiesView>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-wrap md:flex-no-wrap">
        <div class="w-full px-1 mb-1 md:w-20">
          <button
            @click="addGrid"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-blue-500 hover:bg-blue-700"
          >grid</button>
          <button
            @click="addColumn"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-blue-500 hover:bg-blue-700"
          >column</button>
          <button
            @click="addLabel"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-blue-500 hover:bg-blue-700"
          >label</button>
          <button
            @click="addSpan"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-blue-500 hover:bg-blue-700"
          >span</button>
          <button
            @click="addInput"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-blue-500 hover:bg-blue-700"
          >input</button>
          <button
            @click="addTextarea"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-blue-500 hover:bg-blue-700"
          >textarea</button>
          <button
            @click="addCheck"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-blue-500 hover:bg-blue-700"
          >check</button>
          <button
            @click="addSelect"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-blue-500 hover:bg-blue-700"
          >select</button>
          <button
            @click="addOption"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-orange-500 hover:bg-orange-700"
          >option</button>
          <button
            @click="addButton"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-blue-500 hover:bg-blue-700"
          >button</button>
          <button
            @click="addAnchor"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-blue-500 hover:bg-blue-700"
          >a</button>
          <button
            @click="addTable"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-blue-500 hover:bg-blue-700"
          >table</button>
          <button
            @click="addTableRow"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-orange-500 hover:bg-orange-700"
          >tr</button>
          <button
            @click="addHeaderCell"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-orange-500 hover:bg-orange-700"
          >th</button>
          <button
            @click="addDataCell"
            class="w-16 py-1 px-2 mb-1 mr-1 md:mr-0 text-sm text-white bg-orange-500 hover:bg-orange-700"
          >td</button>
        </div>
        <div class="w-full pr-1">
          <div class="w-full flex flex-wrap">
            <div class="w-full px-1 mb-2 md:w-2/3 md:mb-1 lg:pl-0">
              <button
                @click="copySelected"
                class="w-12 p-1 mr-1 text-sm text-white bg-green-500 hover:bg-green-700"
              >copy</button>
              <button
                @click="cutSelected"
                class="w-12 p-1 mr-1 text-sm text-white bg-green-500 hover:bg-green-700"
              >cut</button>
              <button
                @click="pasteToSelected"
                class="w-12 p-1 mr-1 text-sm text-white bg-green-500 hover:bg-green-700"
              >paste</button>
              <button
                @click="moveUp"
                class="w-12 p-1 mr-1 text-sm text-white bg-green-500 hover:bg-green-700"
              >up</button>
              <button
                @click="moveDown"
                class="w-12 p-1 mr-1 text-sm text-white bg-green-500 hover:bg-green-700"
              >down</button>
              <button
                @click="deleteSelected"
                class="w-12 p-1 mr-1 text-sm text-white bg-red-500 hover:bg-red-700"
              >del</button>
              <button
                @click="clearState"
                class="w-12 p-1 mr-1 text-sm text-white bg-red-500 hover:bg-red-700"
              >clear</button>
            </div>
            <div class="w-full pl-1 mb-1 md:w-1/3 md:mb-1 flex md:justify-end">
              <button
                @click="saveState"
                class="w-12 p-1 mr-1 text-sm text-white bg-teal-500 hover:bg-teal-700"
              >save</button>
              <button
                @click="loadState"
                class="w-12 p-1 mr-1 text-sm text-white bg-teal-500 hover:bg-teal-700"
              >load</button>
              <button
                @click="preview"
                class="w-12 p-1 mr-1 text-sm text-white bg-teal-500 hover:bg-teal-700"
              >view</button>
              <button
                @click="copyHtmlCode"
                class="w-12 p-1 text-sm text-white bg-teal-500 hover:bg-teal-700"
              >html</button>
            </div>
            <div
              ref="compsContainer"
              class="w-full p-1 ml-1 lg:ml-0 border-2 bg-teal-100 overflow-x-auto overflow-y-auto"
            >
              <div class="flex flex-wrap hidden md:block">
                <div class="w-full p-1 flex justify-center mb-2">
                  <button
                    class="w-24 py-1 px-2 mr-1 text-sm text-white bg-gray-500 hover:bg-blue-600"
                    @click="setSize(0)"
                    :class="{'bg-blue-700':responsiveSize==0}"
                  >small</button>
                  <button
                    class="w-24 py-1 px-2 mr-1 text-sm text-white bg-gray-500 hover:bg-blue-600"
                    @click="setSize(2)"
                    :class="{'bg-blue-700':responsiveSize==2}"
                  >medium</button>
                  <button
                    class="w-24 py-1 px-2 mr-1 text-sm text-white bg-gray-500 hover:bg-blue-600 md:hidden lg:block"
                    @click="setSize(3)"
                    :class="{'bg-blue-700':responsiveSize==3}"
                  >large</button>
                </div>
              </div>
              <div ref="compsLayout" class="mx-auto w-full bg-white">
                <DefaultComponent :model="root" :responsiveSize="responsiveSize"></DefaultComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapState, mapMutations } from 'vuex';
import { ComponentModel, ResponsiveSizes } from '@/models';
import TreeView from '@/components/TreeView.vue';
import PropertiesView from '@/components/properties-css/PropertiesView.vue';
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
    ...mapState(['root', 'selected', 'responsiveSize'])
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
      'copySelected',
      'cutSelected',
      'pasteToSelected',
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
  responsiveSize!: ResponsiveSizes;
  htmlCode: string;
  maxWidth: number;

  constructor() {
    super();
    this.htmlCode = '';
    this.maxWidth = 768;
  }

  setSize(responsiveSize: ResponsiveSizes) {
    this.$store.commit('setResponsiveSize', responsiveSize);
    this.adjustSizes();
  }

  @Watch('responsiveSize')
  responsiveSizeChange() {
    this.adjustSizes();
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

  getResponsiveSizePixels() {
    switch (this.responsiveSize) {
      case ResponsiveSizes.All:
      case ResponsiveSizes.Small:
        return 640;
      case ResponsiveSizes.Medium:
        return 768;
      case ResponsiveSizes.Large:
        return 1024;
        break;
    }
  }

  adjustSizes() {
    const screenwidth = document.documentElement.clientWidth;
    const width = this.getResponsiveSizePixels();

    (this.$refs.compsLayout as HTMLElement).style.width = `${
      screenwidth < width ? screenwidth : width
    }px`;
    if (screenwidth < 768) {
      (this.$refs.compsContainer as HTMLElement).style.width = `auto`;
    } else if (screenwidth < 1024) {
      (this.$refs.propsContainer as HTMLElement).style.maxHeight = '16rem';
      (this.$refs.compsContainer as HTMLElement).style.maxHeight = 'auto';
      (this.$refs.compsContainer as HTMLElement).style.width = `${screenwidth -
        80}px`;
    } else {
      const maxHeight = document.documentElement.clientHeight;
      (this.$refs
        .propsContainer as HTMLElement).style.maxHeight = `${maxHeight -
        256 -
        93}px`;
      (this.$refs
        .compsContainer as HTMLElement).style.maxHeight = `${maxHeight -
        120}px`;
      (this.$refs.compsContainer as HTMLElement).style.width = `${screenwidth -
        404}px`;
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

.left-panel {
  @media (min-width: 1024px) {
    width: 20rem !important;
    min-width: 20rem;
  }
}

.tree-container,
.properties-container {
  max-height: 16rem;
  min-height: 16rem;
}
</style>
