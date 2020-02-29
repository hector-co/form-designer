import { Vue, Prop, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { ComponentModel } from '@/models';

@Component({
  computed: {
    ...mapState(['root'])
  }
})
export class BaseCustomComponent extends Vue {
  @Prop()
  model!: ComponentModel;

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
