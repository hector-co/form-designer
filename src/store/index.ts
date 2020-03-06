import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {
  ResponsiveSizes,
  ContentModel,
  ComponentModel,
  mapWithResponsiveSizes,
  Dictionary,
  CssModel,
  LayoutModel,
  BorderModel,
  TypographyModel,
  ColorModel,
  PropertyModel
} from '@/models';

Vue.use(Vuex);

interface IDesignerState {
  root: ComponentModel;
  selected: ComponentModel | null;
  selectedFor: ComponentModel | null;
  operation: string;
  counter: Dictionary<string, number>;
}

const container = new ComponentModel(null, 'Container', 'div');
container.role = 'Container';
container.baseCssClasses = 'mx-auto';

const store: StoreOptions<IDesignerState> = {
  // strict: true,
  state: {
    root: container,
    selected: null,
    selectedFor: null,
    operation: '',
    counter: new Dictionary<string, number>(),
  },
  mutations: {
    select(state, component) {
      state.selected = component;
    },
    addGrid(state) {
      if (!state.selected) return;

      const grid = addComponents(state.selected, 'Grid', state.counter, 'div');
      addComponents(grid, 'Column', state.counter, 'div');
    },
    addColumn(state) {
      if (!state.selected) return;

      addComponents(state.selected, 'Column', state.counter, 'div');
    },
    addLabel(state) {
      if (!state.selected) return;

      addComponents(state.selected, 'Label', state.counter);
    },
    addSpan(state) {
      if (!state.selected) return;

      addComponents(state.selected, 'Span', state.counter);
    },
    addInput(state) {
      if (!state.selected) return;

      addComponents(state.selected, 'Input', state.counter);
    },
    addTextarea(state) {
      if (!state.selected) return;

      addComponents(state.selected, 'Textarea', state.counter);
    },
    addSelect(state) {
      if (!state.selected) return;

      addComponents(state.selected, 'Select', state.counter);
    },
    addOption(state) {
      if (!state.selected) return;

      addComponents(state.selected, 'Option', state.counter);
    },
    addCheck(state) {
      if (!state.selected) return;

      addComponents(state.selected, 'Check', state.counter);
    },
    addButton(state) {
      if (!state.selected) return;

      addComponents(state.selected, 'Button', state.counter);
    },
    addAnchor(state) {
      if (!state.selected) return;

      addComponents(state.selected, 'Anchor', state.counter, 'a');
    },
    addTable(state) {
      if (!state.selected) return;

      const table = addComponents(state.selected, 'Table', state.counter);

      addComponents(table, 'TableHead', state.counter, 'thead');

      addComponents(table, 'TableBody', state.counter, 'tbody');
    },
    addTableRow(state) {
      if (!state.selected) return;

      addComponents(state.selected, 'TableRow', state.counter, 'tr');
    },
    addHeaderCell(state) {
      if (!state.selected) return;

      addComponents(state.selected, 'HeaderCell', state.counter, 'th');
    },
    addDataCell(state) {
      if (!state.selected) return;

      addComponents(state.selected, 'DataCell', state.counter, 'td');
    },
    deleteSelected(state) {
      if (!state.selected || !state.selected.parent || state.selected.typeName === 'TableHead' ||
        state.selected.typeName === 'TableBody') return;

      if (state.selected === state.selectedFor) {
        state.selectedFor = null;
        state.operation = '';
      }

      const parent = state.selected.parent;
      const index = parent!.children.indexOf(state.selected);
      parent!.children.splice(index, 1);

      state.selected = parent;
    },
    copySelected(state) {
      if (!state.selected) return;

      state.selectedFor = state.selected;
      state.operation = 'paste';
    },
    cutSelected(state) {
      if (!state.selected) return;

      state.selectedFor = state.selected;
      state.operation = 'cut';
    },
    pasteToSelected(state) {
      if (!state.selected || !state.selectedFor) return;

      const selectedFor = state.selectedFor;
      const parent = selectedFor.parent!;
      const newParent = state.selected!;

      if (state.operation === 'cut' && state.selected !== state.selectedFor && !isAncestorOf(selectedFor, newParent)) {
        const index = parent.children.indexOf(selectedFor!);
        parent.children.splice(index, 1);
        selectedFor.parent = newParent;
        newParent.children.push(selectedFor!);
        state.selectedFor = null;
        state.operation = '';
      } else if (state.operation === 'paste') {
        const jsonComp = toJson(state.selectedFor);
        loadComponents(state.selected, [JSON.parse(jsonComp)], state.counter);
      }
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
    },
    saveState(state) {
      window.localStorage.setItem('designer-state', toJson(state.root));
    },
    savePreview(state) {
      window.localStorage.setItem('form-preview', toHtml(state.root));
    },
    loadState(state) {
      const currentState = window.localStorage.getItem('designer-state')!;
      loadState(state, JSON.parse(currentState));
    },
    clearState(state) {
      clearState(state);
    },
    loadExample1(state) {
      const example = require('@/examples/example1.json');
      loadState(state, example);
    },
    loadExample2(state) {
      const example = require('@/examples/example2.json');
      loadState(state, example);
    }
  }
};

function isAncestorOf(parent: ComponentModel, child: ComponentModel) {
  while (child.parent != null) {
    if (child.parent === parent)
      return true;
    child = child.parent;
  }
  return false;
}

function addComponents(
  parent: ComponentModel, typeName: string, counter: Dictionary<string, number>,
  tagName: string = '', baseCssClasses: string = '', autoCloseTag: boolean = false,
  addDefaultValues: boolean = true): ComponentModel {
  if (!counter.has(typeName)) counter.add(typeName, 0);
  const counterValue = counter.get(typeName)! + 1;

  const component = new ComponentModel(parent, typeName, tagName, baseCssClasses, autoCloseTag);
  component.id = `${typeName}_${counterValue}`;
  component.parent = parent;
  parent.children.push(component);

  switch (typeName.toLowerCase()) {
    case 'grid':
      component.tagName = 'div';
      component.role = 'Grid';
      component.css.add('content', mapWithResponsiveSizes((prefix) => new ContentModel(prefix)));

      if (!addDefaultValues) break;
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).width = 'full';
      component.getCss<ContentModel>('content', ResponsiveSizes.All).flex = true;
      break;
    case 'column':
      if (!tagName) component.tagName = 'div';
      component.css.add('content', mapWithResponsiveSizes((prefix) => new ContentModel(prefix)));
      component.role = 'Column';

      if (!addDefaultValues) break;
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).width = 'full';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingTop = '1';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingBottom = '1';

      if ((parent && parent.typeName === 'Column') || (parent.parent && parent.parent.typeName === 'Column')) break;
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingRight = '1';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingLeft = '1';
      break;
    case 'label':
      component.baseCssClasses = 'block';
      component.addProperty('for', '');

      if (!addDefaultValues) break;
      component.properties.get('text').value = `${typeName}_${counterValue}`;
      break;
    case 'span':
      if (!addDefaultValues) break;
      component.properties.get('text').value = `${typeName}_${counterValue}`;
      break;
    case 'input':
      component.autoCloseTag = true;
      component.component = 'InputComponent';
      component.addProperty('type', 'text');
      component.addProperty('value', '');

      if (!addDefaultValues) break;
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingTop = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingBottom = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingLeft = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingRight = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).width = 'full';
      component.getCss<BorderModel>('border', ResponsiveSizes.All).width = '1';
      break;
    case 'textarea':
      component.baseCssClasses = 'block';
      component.component = 'TextareaComponent';
      component.addProperty('rows', '');

      if (!addDefaultValues) break;
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingTop = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingBottom = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingLeft = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingRight = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).width = 'full';
      component.getCss<BorderModel>('border', ResponsiveSizes.All).width = '1';
      break;
    case 'select':
      component.component = 'SelectComponent';

      if (!addDefaultValues) break;
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingTop = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingBottom = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingLeft = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingRight = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).width = 'full';
      component.getCss<BorderModel>('border', ResponsiveSizes.All).width = '1';
      break;
    case 'option':
      component.addProperty('value', '');
      component.addProperty('selected', false, 'selected',
        (value) => value ? 'selected' : undefined);
      break;
    case 'check':
      component.tagName = 'input';
      component.component = 'CheckComponent';
      component.autoCloseTag = true;
      component.addProperty('type', 'checkbox');
      component.addProperty('value', '');
      component.addProperty('checked', false, 'checked',
        (value) => value ? 'checked' : undefined);
      break;
    case 'button':
      if (!addDefaultValues) break;
      component.properties.get('text').value = `${typeName}_${counterValue}`;
      component.getCss<TypographyModel>('typography', ResponsiveSizes.All).textColor.color = 'white';
      component.getCss<ColorModel>('backgroundColor', ResponsiveSizes.All).color = 'blue-500';
      component.getCss<ColorModel>('backgroundColor', ResponsiveSizes.All).hover = 'blue-700';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingTop = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingBottom = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingLeft = '4';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingRight = '4';
      break;
    case 'anchor':
      component.addProperty('href', '', 'href', undefined, false);
      component.addProperty('target', '', 'target',
        (value) => value === '' ? undefined : '_blank', false);
      if (!addDefaultValues) break;
      component.properties.get('text').value = `${typeName}_${counterValue}`;
      break;
  }

  counter.set(typeName, counterValue);
  return component;
}

export default new Vuex.Store<IDesignerState>(store);

function getSpaces(count: number): string {
  return ' '.repeat(count * 2);
}

function toHtml(
  component: ComponentModel, level: number = 0) {
  let html = `${getSpaces(level)}<${component.tagName} ${htmlAttributes(component)}`;
  if (component.autoCloseTag) return `${html} />`;
  else html += '>';

  if ((!component.children || !component.children.length) && !component.properties.get('text').value)
    return `${html}</${component.tagName}>`;

  if (component.children && component.children.length)
    html += '\n' + component.children.map(c => toHtml(c, level + 1)).join('\n');

  if (component.properties.get('text').value)
    html += '\n' + `${getSpaces(level + 1)}${component.properties.get('text').value}`;

  return `${html}\n${getSpaces(level)}</${component.tagName}>`;
}

function htmlAttributes(component: ComponentModel): string {
  const propAtrs = component.properties.tuples.map(t => t.value)
    .map(p => toHtmlAttr(p.attributeName, p.calculated))
    .filter(v => v)
    .join(' ');
  const cssClasses = toHtmlAttr('class', component.cssArray.join(' '));

  return (`${cssClasses} ${propAtrs}`).trim();
}

function toHtmlAttr(name: string, value: string) {
  if (!value || !value.trim()) return '';
  return `${name}="${value.trim()}" `;
}

function toJson(component: ComponentModel): string {
  const newComp = jsonPrepare(component);
  return JSON.stringify(newComp);
}

function removeEmptyValues(obj: any, fieldsToIncludeAlways: string[] = [], fieldsToRemoveAlways: string[] = []): any {
  const newObj: any = {};
  Object.keys(obj).forEach(k => {
    if (fieldsToIncludeAlways.indexOf(k) >= 0) {
      newObj[k] = obj[k];
      return;
    }

    if (fieldsToRemoveAlways.indexOf(k) >= 0)
      return;

    if (obj[k] === null || obj[k] === undefined || obj[k] === '' || obj[k] === false)
      return;

    if (obj[k] instanceof Array && !obj[k].length)
      return;

    if (obj[k] instanceof Object) {
      const child = removeEmptyValues(obj[k], fieldsToIncludeAlways, fieldsToRemoveAlways);
      if (Object.keys(child).length > 0)
        newObj[k] = child;
      return;
    }

    newObj[k] = obj[k];
  });
  return newObj;
}

function jsonPrepare(component: ComponentModel): string {
  const newComp = removeEmptyValues(component, [], ['id', 'parent', 'children', 'properties']);
  // newComp.children = [];
  // component.children.forEach(c => {
  //   newComp.children.push(jsonPrepare(c));
  // });
  // newComp.props = removeEmptyValues(component.properties.getAttributes(true, true));
  // newComp.css = removeEmptyValues(component.properties.getCss(), [], ['responsiveSize', 'type', 'cssArray']);

  return newComp;
}

function clearState(state: IDesignerState) {
  const stateContainer = new ComponentModel(null, 'Container', 'div');
  stateContainer.role = 'Container';
  stateContainer.baseCssClasses = 'mx-auto';

  state.root = stateContainer;
  state.selected = null;
  state.counter = new Dictionary<string, number>();
}

function loadState(state: IDesignerState, currentState: any) {
  clearState(state);
  applyProperties(state.root, currentState.props);
  applyCss(state.root, currentState.css);
  loadComponents(state.root, currentState.children, state.counter);
}

function loadComponents(parent: ComponentModel, children: Array<any>, counter: Dictionary<string, number>) {
  if (!children) return;
  children.forEach(c => {
    const newComp = addComponents(parent, c.typeName, counter, c.tagName, c.baseCssClasses, !!c.autoCloseTag, false);
    applyProperties(newComp, c.props);
    applyCss(newComp, c.css);

    loadComponents(newComp, c.children, counter);
  });
}

function applyProperties(component: ComponentModel, props: any) {
  if (props == null) return;
  Object.keys(props).forEach(key => {
    if (component.properties.has(key)) {
      component.properties.get(key).value = props[key];
    } else {
      const tuple = component.properties.tuples.find(t => t.value.attributeName === key);
      if (!tuple) return;
      tuple.value.value = props[key];
    }
  });
}

function stringToResponsiveSize(value: string): ResponsiveSizes {
  if (!value) throw new Error(`Invalid string size '${value}'`);
  switch (value.toLowerCase()) {
    case 'all':
      return ResponsiveSizes.All;
    case 'small':
      return ResponsiveSizes.Small;
    case 'medium':
      return ResponsiveSizes.Medium;
    case 'large':
      return ResponsiveSizes.Large;
  }
  throw new Error(`Invalid string size '${value}'`);
}

function applyCss(component: ComponentModel, css: any) {
  if (css == null) return;
  Object.keys(css).forEach(key => {
    if (component.css.has(key))
      setCssValues(component.css.get(key), css[key]);
  });
}

function setCssValues(cssDictionary: Dictionary<ResponsiveSizes, CssModel>, values: any) {
  if (!values) return;
  Object.keys(values).forEach(key => {
    const size = stringToResponsiveSize(key);
    copyValues(cssDictionary.get(size), values[key]);
  });
}

function copyValues(target: any, source: any) {
  Object.keys(source).forEach(key => {
    if (target[key] instanceof Object)
      copyValues(target[key], source[key]);
    else
      target[key] = source[key];
  });
}
