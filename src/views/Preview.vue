<template>
  <div class="preview">
    <div v-html="htmlContent"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Preview extends Vue {
  htmlContent: string | null = '';

  mounted() {
    this.htmlContent = window.localStorage.getItem('form-preview');
  }
}
</script>