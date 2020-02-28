<template>
  <select :value="value" class="w-full text-gray-700 px-2 py-2 text-xs" @change="colorChanged">
    <option v-for="option in options" :key="option.value" :value="option.value">{{option.text}}</option>
  </select>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class SelectColorComponent extends Vue {
  @Prop()
  value!: string;

  options: { value: string; text: string }[];

  constructor() {
    super();
    this.options = [];
  }

  setOptions() {
    const colors = [
      'blue',
      'green',
      'orange',
      'red',
      'gray',
      'yellow',
      'teal',
      'purple',
      'pink'
    ];
    this.options.push({ value: '', text: '(default)' });
    this.options.push({ value: 'black', text: 'black' });
    this.options.push({ value: 'white', text: 'white' });

    colors.forEach(c => {
      this.options.push({ value: `${c}-100`, text: `${c}-100` });
      this.options.push({ value: `${c}-300`, text: `${c}-300` });
      this.options.push({ value: `${c}-500`, text: `${c}-500` });
      this.options.push({ value: `${c}-700`, text: `${c}-700` });
    });

    this.options.push({ value: 'transparent', text: 'transparent' });
  }

  colorChanged(event: any) {
    this.$emit('color-selected', event.target.value);
  }

  mounted() {
    this.setOptions();
  }
}
</script>
