import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {
  ResponsiveSizes,
  ContentModel,
  ComponentModel,
  mapWithResponsiveSizes,
  Dictionary
} from '@/models';

Vue.use(Vuex);

interface IDesignerState {
  root: ComponentModel;
  selected: ComponentModel | null;
  counter: Dictionary<string, number>;
}

const container = new ComponentModel(null, 'Container', 'div');
container.role = 'Container';
container.properties.baseCssClasses = 'container mx-auto';

const store: StoreOptions<IDesignerState> = {
  // strict: true,
  state: {
    root: container,
    selected: null,
    counter: new Dictionary<string, number>()
  },
  mutations: {
    select(state, component) {
      state.selected = component;
    },
    addGrid(state) {
      if (!state.selected) return;

      const grid = addComponent(state.selected, 'Grid', state.counter, 'div');
      addComponent(grid, 'Column', state.counter, 'div');
    },
    addColumn(state) {
      if (!state.selected) return;

      addComponent(state.selected, 'Column', state.counter, 'div');
    },
    addLabel(state) {
      if (!state.selected) return;

      addComponent(state.selected, 'Label', state.counter);
    },
    addSpan(state) {
      if (!state.selected) return;

      addComponent(state.selected, 'Span', state.counter);
    },
    addInput(state) {
      if (!state.selected) return;

      addComponent(state.selected, 'Input', state.counter);
    },
    addTextarea(state) {
      if (!state.selected) return;

      addComponent(state.selected, 'Textarea', state.counter);
    },
    addSelect(state) {
      if (!state.selected) return;

      addComponent(state.selected, 'Select', state.counter);
    },
    addOption(state) {
      if (!state.selected) return;

      addComponent(state.selected, 'Option', state.counter);
    },
    addInputWithLabel(state) {
      if (!state.selected) return;

      const grid = addComponent(state.selected, 'Grid', state.counter, 'div');
      grid.properties.layouts.get(ResponsiveSizes.All)!.marginBottom = '2';
      const contentCss = grid.properties.customCss.get('contents')!.get(ResponsiveSizes.All) as ContentModel;
      contentCss.flexWrap = '';
      contentCss.alignItems = 'center';

      const column1 = addComponent(grid, 'Column', state.counter);
      column1.properties.layouts.get(ResponsiveSizes.Medium)!.width = '1/3';

      const column2 = addComponent(grid, 'Column', state.counter);
      column2.properties.layouts.get(ResponsiveSizes.Medium)!.width = '2/3';

      const label = addComponent(column1, 'Label', state.counter);
      label.properties.layouts.get(ResponsiveSizes.Medium)!.marginRight = '2';
      label.properties.typographies.get(ResponsiveSizes.Medium)!.textAlign = 'right';

      const input = addComponent(column2, 'Input', state.counter);
      input.properties.id = input.id;
      label.properties.customProps.get('forId')!.value = input.properties.id;
    },
    addCheck(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      addComponent(state.selected, 'Check', state.counter);
    },
    addCheckWithLabel(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      const label = addComponent(state.selected, 'Label', state.counter);
      label.properties.text = '';

      const check = addComponent(label, 'Check', state.counter);
      check.properties.layouts.get(ResponsiveSizes.All)!.marginRight = '2';
      check.properties.layouts.get(ResponsiveSizes.All)!.marginTop = '4';
      check.properties.layouts.get(ResponsiveSizes.All)!.marginBottom = '3';

      addComponent(label, 'Span', state.counter);
    },
    addButton(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      addComponent(state.selected, 'Button', state.counter);
    },
    addTable(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      const table = addComponent(state.selected, 'Table', state.counter);

      addComponent(table, 'TableHead', state.counter, 'thead');

      addComponent(table, 'TableBody', state.counter, 'tbody');
    },
    addTableRow(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      addComponent(state.selected, 'TableRow', state.counter, 'tr');
    },
    addHeaderCell(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      addComponent(state.selected, 'HeaderCell', state.counter, 'th');
    },
    addDataCell(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      addComponent(state.selected, 'DataCell', state.counter, 'td');
    },
    delete(state) {
      if (!state.selected || !state.selected.parent || state.selected.typeName === 'TableHead' ||
        state.selected.typeName === 'TableBody') return;

      const parent = state.selected.parent;
      const index = parent!.children.indexOf(state.selected);
      parent!.children.splice(index, 1);

      state.selected = parent;
    },
    moveDown(state) {
      if (!state.selected || !state.selected.parent || state.selected.typeName === 'TableHead' ||
        state.selected.typeName === 'TableBody') return;

      const parent = state.selected.parent;
      const index = parent!.children.indexOf(state.selected);
      if (index === 0) return;
      parent!.children.splice(index, 1);
      parent!.children.splice(index - 1, 0, state.selected);
    },
    moveUp(state) {
      if (!state.selected || !state.selected.parent || state.selected.typeName === 'TableHead' ||
        state.selected.typeName === 'TableBody') return;

      const parent = state.selected.parent;
      const index = parent!.children.indexOf(state.selected);
      if (index === parent.children.length - 1) return;
      parent!.children.splice(index, 1);
      parent!.children.splice(index + 1, 0, state.selected);
    }
  }
};

function addComponent(
  parent: ComponentModel, typeName: string, counter: Dictionary<string, number>,
  tagName: string = '', autoCloseTag: boolean = false): ComponentModel {
  if (!counter.has(typeName)) counter.add(typeName, 0);
  const counterValue = counter.get(typeName)! + 1;

  const component = new ComponentModel(parent, typeName, tagName, autoCloseTag);
  component.id = `${typeName}_${counterValue}`;
  component.parent = parent;
  parent.children.push(component);

  switch (typeName.toLowerCase()) {
    case 'grid':
      component.tagName = 'div';
      component.properties.baseCssClasses = 'flex';
      component.properties.addCustomCss('contents', mapWithResponsiveSizes((prefix) => new ContentModel(prefix)));
      component.role = 'Grid';
      break;
    case 'column':
      if (!tagName) component.tagName = 'div';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '1';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '1';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '1';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '1';
      component.properties.layouts.get(ResponsiveSizes.All)!.width = 'full';
      component.role = 'Column';
      break;
    case 'label':
      component.properties.baseCssClasses = 'block';
      component.properties.text = `${typeName}_${counterValue}`;
      component.properties.addCustomProperty('forId', '', 'for');
      break;
    case 'span':
      component.properties.text = `${typeName}_${counterValue}`;
      break;
    case 'input':
      component.autoCloseTag = true;
      component.component = 'InputComponent';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.width = 'full';
      component.properties.borders.get(ResponsiveSizes.All)!.width = '1';
      component.properties.addCustomProperty('type', 'text');
      component.properties.addCustomProperty('value', '');
      break;
    case 'textarea':
      component.properties.baseCssClasses = 'block';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.width = 'full';
      component.properties.borders.get(ResponsiveSizes.All)!.width = '1';
      component.properties.addCustomProperty('rows', '');
      break;
    case 'select':
      component.component = 'SelectComponent';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.width = 'full';
      component.properties.borders.get(ResponsiveSizes.All)!.width = '1';
      break;
    case 'option':
      component.properties.addCustomProperty('value', '');
      component.properties.addCustomProperty('selected', false, 'selected',
        (value) => value ? 'selected' : undefined);
      break;
    case 'check':
      component.tagName = 'input';
      component.component = 'CheckComponent';
      component.autoCloseTag = true;
      component.properties.addCustomProperty('type', 'checkbox');
      component.properties.addCustomProperty('value', '');
      component.properties.addCustomProperty('checked', false, 'checked',
        (value) => value ? 'checked' : undefined);
      break;
    case 'button':
      component.properties.text = `${typeName}_${counterValue}`;
      component.properties.typographies.get(ResponsiveSizes.All)!.textColor.color = 'white';
      component.properties.backgroundColors.get(ResponsiveSizes.All)!.color = 'blue-500';
      component.properties.backgroundColors.get(ResponsiveSizes.All)!.hover = 'blue-700';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '4';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '4';
      break;
  }

  counter.set(typeName, counterValue);
  return component;
}

export default new Vuex.Store<IDesignerState>(store);
