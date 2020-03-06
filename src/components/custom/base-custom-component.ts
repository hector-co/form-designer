import { Vue, Prop, Component } from 'vue-property-decorator';
import { ComponentModel } from '@/models';

@Component
export class BaseCustomComponent extends Vue {
  @Prop()
  model!: ComponentModel;

  select() {
    this.$store.commit('select', this.model);
  }

  get isSelected(): boolean {
    return this.model === this.$store.state.selected;
  }

  get cssArray(): string[] {
    return [this.isSelected ? 'selected' : '', ...this.model.cssArray];
  }
}
