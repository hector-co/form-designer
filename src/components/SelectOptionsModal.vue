<template>
  <div class="select-options p-2">
    <button
      @click="addOption"
      class="py-1 px-2 bg-blue-500 hover:bg-blue-700 text-sm text-white"
    >Add option</button>
    <table class="w-full mb-2">
      <thead>
        <tr>
          <th width="30px" class="text-sm text-gray-700 p-2 bg-gray-100"></th>
          <th width="100px" class="text-sm text-gray-700 p-2 bg-gray-100">Value</th>
          <th class="text-sm text-gray-700 p-2 bg-gray-100">Text</th>
          <th width="100px" class="text-sm text-gray-700 p-2 bg-gray-100 text-center">Selected</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="option in options" :key="option.key">
          <td class="text-center">
            <span
              @click="removeOption(option)"
              class="cursor-pointer text-red-500 font-bold text-xl"
            >&times;</span>
          </td>
          <td>
            <input v-model="option.value" class="w-full p-1 border text-sm" type="text" />
          </td>
          <td>
            <input v-model="option.text" class="w-full p-1 border text-sm" type="text" />
          </td>
          <td class="text-center">
            <input
              v-model="option.selected"
              type="checkbox"
              @change="selectedOption($event, option)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex flex-wrap justify-end">
      <div class="w-full p-1 lg:w-1/4 xl:w-1/4">
        <button
          @click="save"
          class="w-full py-1 bg-blue-500 hover:bg-blue-700 text-sm text-white"
        >Ok</button>
      </div>
      <div class="w-full py-1 lg:w-1/4 xl:w-1/4">
        <button
          @click="$emit('close')"
          class="w-full py-1 bg-red-500 hover:bg-red-700 text-sm text-white"
        >Cancel</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { SelectOption, SelectComponentModel } from '../models';

@Component({
  computed: {
    ...mapState(['selected'])
  }
})
export default class SelectOptionsModal extends Vue {
  options: SelectOption[];
  selected!: SelectComponentModel;

  constructor() {
    super();
    this.options = [];
  }

  removeOption(option: SelectOption) {
    const index = this.options.indexOf(option);
    if (index < 0) return;
    this.options.splice(index, 1);
  }

  addOption() {
    const option = new SelectOption();
    let counter = 1;
    while (this.options.find(o => o.key === `key-${counter}`)) counter++;
    option.key = `key-${counter}`;
    this.options.push(option);
  }

  selectedOption(event: Event, option: SelectOption) {
    const target = event.target as HTMLInputElement;
    this.options.forEach(o => (o.selected = false));
    option.selected = target.checked;
  }

  save() {
    this.$store.commit('setSelectOptions', this.options);
    this.$emit('close');
  }

  mounted() {
    this.options = this.selected.properties.options.map(o => {
      const option = new SelectOption();
      option.key = o.key;
      option.value = o.value;
      option.text = o.text;
      option.selected = o.selected;
      return option;
    });
  }
}
</script>
<style lang="scss">
.select-options {
  overflow-y: auto;
  height: 300px;
}
</style>
