import { Vue, Prop, Component } from 'vue-property-decorator';
import { ComponentModel, ResponsiveSizes } from '@/models';

@Component
export class BaseCustomComponent extends Vue {
  @Prop()
  model!: ComponentModel;
  @Prop()
  responsiveSize!: ResponsiveSizes;

  select() {
    this.$store.commit('select', this.model);
  }

  get isSelected(): boolean {
    return this.model === this.$store.state.selected;
  }

  get cssArray(): string[] {
    let result: string[] = [];

    if (this.responsiveSize === ResponsiveSizes.All)
      result = [this.isSelected ? 'selected' : '', ...this.model.cssArraySmall];
    else if (this.responsiveSize === ResponsiveSizes.Medium)
      result = [this.isSelected ? 'selected' : '', ...this.model.cssArrayMedium];
    if (this.responsiveSize === ResponsiveSizes.Large)
      result = [this.isSelected ? 'selected' : '', ...this.model.cssArrayLarge];

    return result;
  }
}
