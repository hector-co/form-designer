import { Vue, Prop, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { IComponentModel } from '@/models';

@Component({
  computed: {
    ...mapState(['root'])
  }
})
export class BaseComponent<T extends IComponentModel> extends Vue {
  @Prop()
  model!: T;

  select() {
    this.$store.commit('select', this.model);
  }

  get isSelected(): boolean {
    return this.model === this.$store.state.selected;
  }

  get layoutCss(): string {
    return `${this.isSelected ? 'selected' : ''} ` + (this.model as any).properties.getCss();
  }
}
