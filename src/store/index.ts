import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {
  IComponentModel, BaseContainerComponentModel, ContainerComponentModel, GridComponentModel,
  ColumnComponentModel,
  LabelComponentModel,
  InputComponentModel,
  ResponsiveSizes,
  CheckComponentModel,
  SpanComponentModel,
  ButtonComponentModel,
  TextareaComponentModel,
  SelectComponentModel,
  OptionComponentModel,
  ContentModel
} from '@/models';

Vue.use(Vuex);

interface IDesignerState {
  root: ContainerComponentModel;
  selected: IComponentModel | null;
  counter: Map<string, number>;
}

const store: StoreOptions<IDesignerState> = {
  // strict: true,
  state: {
    root: new ContainerComponentModel(),
    selected: null,
    counter: new Map<string, number>()
  },
  mutations: {
    select(state, component) {
      state.selected = component;
    },
    setHtmlIdAndName(state, { htmlId, htmlName }) {
      if (!state.selected) return;
      // state.selected.htmlId = htmlId;
      // state.selected.htmlName = htmlName;
    },
    addGrid(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;
      const grid = addComponent(new GridComponentModel(), state.selected, state.counter);

      const column = addComponent(new ColumnComponentModel(), grid, state.counter) as ColumnComponentModel;
      column.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '1';
      column.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '1';
      column.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '1';
      column.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '1';
      column.properties.layouts.get(ResponsiveSizes.All)!.width = 'full';
    },
    addColumn(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;

      const column = addComponent(new ColumnComponentModel(), state.selected, state.counter) as ColumnComponentModel;
      column.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '1';
      column.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '1';
      column.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '1';
      column.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '1';
      column.properties.layouts.get(ResponsiveSizes.All)!.width = 'full';
    },
    addLabel(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;
      const label = addComponent(new LabelComponentModel(), state.selected, state.counter) as LabelComponentModel;
      label.properties.text = label.name;
    },
    addSpan(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;
      const span = addComponent(new SpanComponentModel(), state.selected, state.counter) as SpanComponentModel;
      span.properties.text = span.name;
    },
    addInput(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;

      const input = addComponent(new InputComponentModel(), state.selected, state.counter) as InputComponentModel;
      input.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
      input.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
      input.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '2';
      input.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '2';
      input.properties.layouts.get(ResponsiveSizes.All)!.width = 'full';
      input.properties.borders.get(ResponsiveSizes.All)!.width = '1';
    },
    addTextarea(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;

      const textarea =
        addComponent(new TextareaComponentModel(), state.selected, state.counter) as TextareaComponentModel;
      textarea.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
      textarea.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
      textarea.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '2';
      textarea.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '2';
      textarea.properties.layouts.get(ResponsiveSizes.All)!.width = 'full';
      textarea.properties.borders.get(ResponsiveSizes.All)!.width = '1';
    },
    addSelect(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;

      const select = addComponent(new SelectComponentModel(), state.selected, state.counter) as SelectComponentModel;
      select.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
      select.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
      select.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '2';
      select.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '2';
      select.properties.layouts.get(ResponsiveSizes.All)!.width = 'full';
      select.properties.borders.get(ResponsiveSizes.All)!.width = '1';
    },
    addOption(state) {
      if (!state.selected || !(state.selected instanceof SelectComponentModel)) return;
      addComponent(new OptionComponentModel(), state.selected, state.counter);
    },
    addInputWithLabel(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;

      const grid = addComponent(new GridComponentModel(), state.selected, state.counter) as GridComponentModel;
      grid.properties.layouts.get(ResponsiveSizes.All)!.marginBottom = '2';
      const contentCss = grid.properties.customCss.get('contents')!.get(ResponsiveSizes.All) as ContentModel;
      contentCss.flexWrap = '';
      contentCss.alignItems = 'center';

      const column1 = addComponent(new ColumnComponentModel(), grid, state.counter) as ColumnComponentModel;
      column1.properties.layouts.get(ResponsiveSizes.Medium)!.width = '1/3';

      const column2 = addComponent(new ColumnComponentModel(), grid, state.counter) as ColumnComponentModel;
      column2.properties.layouts.get(ResponsiveSizes.Medium)!.width = '2/3';

      const label = addComponent(new LabelComponentModel(), column1, state.counter) as LabelComponentModel;
      label.properties.layouts.get(ResponsiveSizes.Medium)!.marginRight = '2';
      label.properties.typographies.get(ResponsiveSizes.Medium)!.textAlign = 'right';
      label.properties.text = label.name;

      const input = addComponent(new InputComponentModel(), column2, state.counter) as InputComponentModel;
      input.properties.id = input.id;
      label.properties.customProps.get('forId')!.value = input.properties.id;
    },
    addCheck(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;
      addComponent(new CheckComponentModel(), state.selected, state.counter);
    },
    addCheckWithLabel(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;
      const label = addComponent(new LabelComponentModel(), state.selected, state.counter);

      const check = addComponent(new CheckComponentModel(), label, state.counter) as CheckComponentModel;
      check.properties.layouts.get(ResponsiveSizes.All)!.marginRight = '2';
      check.properties.layouts.get(ResponsiveSizes.All)!.marginTop = '4';
      check.properties.layouts.get(ResponsiveSizes.All)!.marginBottom = '3';

      const span = addComponent(new SpanComponentModel(), label, state.counter) as SpanComponentModel;
      span.properties.text = span.name;
    },
    addButton(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;

      const button = addComponent(new ButtonComponentModel(), state.selected, state.counter) as ButtonComponentModel;
      button.properties.text = button.name;
      button.properties.typographies.get(ResponsiveSizes.All)!.textColor.color = 'white';
      button.properties.backgroundColors.get(ResponsiveSizes.All)!.color = 'blue-500';
      button.properties.backgroundColors.get(ResponsiveSizes.All)!.hover = 'blue-700';
      button.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
      button.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
      button.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '4';
      button.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '4';
    },
    delete(state) {
      if (!state.selected || !state.selected.parent ||
        !(state.selected.parent instanceof BaseContainerComponentModel)) return;

      const parent = state.selected.parent;
      const index = parent!.children.indexOf(state.selected);
      parent!.children.splice(index, 1);

      state.selected = parent;
    },
    moveDown(state) {
      if (!state.selected || !state.selected.parent ||
        !(state.selected.parent instanceof BaseContainerComponentModel)) return;

      const parent = state.selected.parent;
      const index = parent!.children.indexOf(state.selected);
      if (index === 0) return;
      parent!.children.splice(index, 1);
      parent!.children.splice(index - 1, 0, state.selected);
    },
    moveUp(state) {
      if (!state.selected || !state.selected.parent ||
        !(state.selected.parent instanceof BaseContainerComponentModel)) return;

      const parent = state.selected.parent;
      const index = parent!.children.indexOf(state.selected);
      if (index === parent.children.length - 1) return;
      parent!.children.splice(index, 1);
      parent!.children.splice(index + 1, 0, state.selected);
    }
  }
};

function addComponent(
  component: IComponentModel, parent: IComponentModel | null, counter: Map<string, number>)
  : IComponentModel | null {
  if (!parent || !(parent instanceof BaseContainerComponentModel)) return null;

  const typeName = component.typeName;
  if (!counter.has(typeName)) counter.set(typeName, 0);
  const counterValue = counter.get(typeName)! + 1;

  component.id = `${typeName}_${counterValue}`;
  component.name = `${typeName}_${counterValue}`;
  component.parent = parent;
  parent.children.push(component);

  counter.set(typeName, counterValue);

  return component;
}

export default new Vuex.Store<IDesignerState>(store);
