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
  SelectComponentModel
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
      addComponent(new ColumnComponentModel(), grid, state.counter);
    },
    addColumn(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;
      addComponent(new ColumnComponentModel(), state.selected, state.counter);
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
      addComponent(new InputComponentModel(), state.selected, state.counter);
    },
    addTextarea(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;
      addComponent(new TextareaComponentModel(), state.selected, state.counter);
    },
    addSelect(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;
      addComponent(new SelectComponentModel(), state.selected, state.counter);
    },
    setSelectOptions(state, options) {
      if (!state.selected || !(state.selected instanceof SelectComponentModel)) return;
      state.selected.properties.options = options;
    },
    addInputWithLabel(state) {
      if (!state.selected || !(state.selected instanceof BaseContainerComponentModel)) return;

      const grid = addComponent(new GridComponentModel(), state.selected, state.counter) as GridComponentModel;
      grid.properties.layouts.get(ResponsiveSizes.All)!.marginBottom = '2';
      grid.properties.contents.get(ResponsiveSizes.All)!.flexWrap = '';
      grid.properties.contents.get(ResponsiveSizes.All)!.alignItems = 'center';

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
      label.properties.forId = input.properties.id;
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
