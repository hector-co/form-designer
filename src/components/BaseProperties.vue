<template>
  <div v-if="model">
    <table class="table-fixed w-full mb-2">
      <tbody>
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Comp. type</td>
          <td class="w-7/12 border">
            <input
              v-model="model.typeName"
              class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
              type="text"
              readonly
            />
          </td>
        </tr>
        <tr>
          <td class="bg-gray-100 border px-4 py-2 text-xs">Comp. name</td>
          <td class="border">
            <input
              v-model="model.name"
              class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
              type="text"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table-fixed w-full mb-2">
      <tbody>
        <tr>
          <td class="w-5/12 bg-gray-100 border px-4 py-2 text-xs">Id</td>
          <td class="w-7/12 border">
            <input
              v-model="model.properties.id"
              class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
              type="text"
            />
          </td>
        </tr>
        <tr>
          <td class="bg-gray-100 border px-4 py-2 text-xs">Name</td>
          <td class="border">
            <input
              v-model="model.properties.name"
              class="w-full py-2 px-3 text-gray-700 leading-tight text-xs"
              type="text"
            />
          </td>
        </tr>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IComponentModel } from '@/models';

@Component
export default class BaseProperties extends Vue {
  @Prop()
  model!: IComponentModel;
}
</script>
