import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {
  ResponsiveSizes,
  ContentModel,
  ComponentModel,
  mapWithResponsiveSizes,
  Dictionary,
  PropertiesModel,
  CssModel
} from '@/models';

Vue.use(Vuex);

interface IDesignerState {
  root: ComponentModel;
  selected: ComponentModel | null;
  counter: Dictionary<string, number>;
}

const container = new ComponentModel(null, 'Container', 'div');
container.role = 'Container';
container.properties.baseCssClasses = 'mx-auto';

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
    addInputWithLabel(state) {
      if (!state.selected) return;

      const grid = addComponents(state.selected, 'Grid', state.counter, 'div');
      grid.properties.layouts.get(ResponsiveSizes.All)!.marginBottom = '2';
      const contentCss = grid.properties.customCss.get('contents')!.get(ResponsiveSizes.All) as ContentModel;
      contentCss.flexWrap = '';
      contentCss.alignItems = 'center';

      const column1 = addComponents(grid, 'Column', state.counter);
      column1.properties.layouts.get(ResponsiveSizes.Medium)!.width = '1/3';

      const column2 = addComponents(grid, 'Column', state.counter);
      column2.properties.layouts.get(ResponsiveSizes.Medium)!.width = '2/3';

      const label = addComponents(column1, 'Label', state.counter);
      label.properties.layouts.get(ResponsiveSizes.Medium)!.marginRight = '2';
      label.properties.typographies.get(ResponsiveSizes.Medium)!.textAlign = 'right';

      const input = addComponents(column2, 'Input', state.counter);
      input.properties.id = input.id;
      label.properties.customProps.get('forId')!.value = input.properties.id;
    },
    addCheck(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      addComponents(state.selected, 'Check', state.counter);
    },
    addCheckWithLabel(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      const label = addComponents(state.selected, 'Label', state.counter);
      label.properties.text = '';

      const check = addComponents(label, 'Check', state.counter);
      check.properties.layouts.get(ResponsiveSizes.All)!.marginRight = '2';
      check.properties.layouts.get(ResponsiveSizes.All)!.marginTop = '4';
      check.properties.layouts.get(ResponsiveSizes.All)!.marginBottom = '3';

      addComponents(label, 'Span', state.counter);
    },
    addButton(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      addComponents(state.selected, 'Button', state.counter);
    },
    addTable(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      const table = addComponents(state.selected, 'Table', state.counter);

      addComponents(table, 'TableHead', state.counter, 'thead');

      addComponents(table, 'TableBody', state.counter, 'tbody');
    },
    addTableRow(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      addComponents(state.selected, 'TableRow', state.counter, 'tr');
    },
    addHeaderCell(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      addComponents(state.selected, 'HeaderCell', state.counter, 'th');
    },
    addDataCell(state) {
      if (!state.selected || !(state.selected instanceof ComponentModel)) return;

      addComponents(state.selected, 'DataCell', state.counter, 'td');
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
    }
  }
};

function addComponents(
  parent: ComponentModel, typeName: string, counter: Dictionary<string, number>,
  tagName: string = '', autoCloseTag: boolean = false, addDefaultValues: boolean = true): ComponentModel {
  if (!counter.has(typeName)) counter.add(typeName, 0);
  const counterValue = counter.get(typeName)! + 1;

  const component = new ComponentModel(parent, typeName, tagName, autoCloseTag);
  component.id = `${typeName}_${counterValue}`;
  component.parent = parent;
  parent.children.push(component);

  switch (typeName.toLowerCase()) {
    case 'grid':
      component.tagName = 'div';
      component.role = 'Grid';
      component.properties.addCustomCss('contents', mapWithResponsiveSizes((prefix) => new ContentModel(prefix)));
      component.properties.baseCssClasses = 'flex';

      if (!addDefaultValues) break;
      component.properties.layouts.get(ResponsiveSizes.All)!.width = 'full';
      break;
    case 'column':
      if (!tagName) component.tagName = 'div';
      component.properties.baseCssClasses = 'flex';
      component.properties.addCustomCss('contents', mapWithResponsiveSizes((prefix) => new ContentModel(prefix)));
      component.role = 'Column';

      if (!addDefaultValues) break;
      (component.properties.customCss.get('contents').get(ResponsiveSizes.All) as ContentModel).flexWrap = 'wrap';
      component.properties.layouts.get(ResponsiveSizes.All)!.width = 'full';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '1';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '1';
      if (parent.parent && parent.parent.typeName === 'Column') break;
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '1';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '1';
      break;
    case 'label':
      component.properties.baseCssClasses = 'block';
      component.properties.addCustomProperty('forId', '', 'for', undefined, false);

      if (!addDefaultValues) break;
      component.properties.text = `${typeName}_${counterValue}`;
      break;
    case 'span':
      if (!addDefaultValues) break;
      component.properties.text = `${typeName}_${counterValue}`;
      break;
    case 'input':
      component.autoCloseTag = true;
      component.component = 'InputComponent';
      component.properties.addCustomProperty('type', 'text');
      component.properties.addCustomProperty('value', '');

      if (!addDefaultValues) break;
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.width = 'full';
      component.properties.borders.get(ResponsiveSizes.All)!.width = '1';
      break;
    case 'textarea':
      component.properties.baseCssClasses = 'block';
      component.component = 'TextareaComponent';
      component.properties.addCustomProperty('rows', '');

      if (!addDefaultValues) break;
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingLeft = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.paddingRight = '2';
      component.properties.layouts.get(ResponsiveSizes.All)!.width = 'full';
      component.properties.borders.get(ResponsiveSizes.All)!.width = '1';
      break;
    case 'select':
      component.component = 'SelectComponent';

      if (!addDefaultValues) break;
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
      if (!addDefaultValues) break;
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

function getSpaces(count: number): string {
  return ' '.repeat(count * 2);
}

function toHtml(
  component: ComponentModel, level: number = 0) {
  let html = `${getSpaces(level)}<${component.tagName} ${propsToHtmlAttributes(component.properties).trim()}`;
  if (component.autoCloseTag) return `${html} />`;
  else html += '>';

  if ((!component.children || !component.children.length) && !component.properties.text)
    return `${html}</${component.tagName}>`;

  if (component.children && component.children.length)
    html += '\n' + component.children.map(c => toHtml(c, level + 1)).join('\n');

  if (component.properties.text)
    html += '\n' + `${getSpaces(level + 1)}${component.properties.text}`;

  return `${html}\n${getSpaces(level)}</${component.tagName}>`;
}

function propToHtmlString(name: string, value: string) {
  if (!value || !value.trim()) return '';
  return `${name}="${value.trim()}" `;
}

function propsToHtmlAttributes(properties: PropertiesModel) {
  let customAttrValues = '';
  properties.customProps.tuples.forEach(p => {
    const mapped = p.value.attributeMap(p.value.value);
    if (mapped !== undefined)
      customAttrValues += propToHtmlString(p.value.attributeName, mapped);
    else if (p.value)
      customAttrValues += propToHtmlString(p.value.attributeName, p.value.value);
  });

  return propToHtmlString('id', properties.id) +
    propToHtmlString('name', properties.name) +
    propToHtmlString('class', properties.cssArray.join(' ')) +
    customAttrValues;
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
  newComp.children = [];
  component.children.forEach(c => {
    newComp.children.push(jsonPrepare(c));
  });
  newComp.props = removeEmptyValues(component.properties.getAttributes(true, true));
  newComp.css = removeEmptyValues(component.properties.getCss(), [], ['responsiveSize', 'type', 'cssArray']);

  return newComp;
}

function clearState(state: IDesignerState) {
  const stateContainer = new ComponentModel(null, 'Container', 'div');
  stateContainer.role = 'Container';
  stateContainer.properties.baseCssClasses = 'mx-auto';

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
    const newComp = addComponents(parent, c.typeName, counter, c.tagName, !!c.autoCloseTag, false);
    applyProperties(newComp, c.props);
    applyCss(newComp, c.css);

    loadComponents(newComp, c.children, counter);
  });
}

function applyProperties(component: ComponentModel, props: any) {
  if (props == null) return;
  Object.keys(props).forEach(key => {
    if (key === 'id')
      component.properties.id = props.id;
    else if (key === 'name')
      component.properties.name = props.name;
    else if (key === 'text')
      component.properties.text = props.text;
    else if (key === 'baseCssClasses')
      component.properties.baseCssClasses = props.baseCssClasses;
    else {
      if (component.properties.customProps.has(key)) {
        component.properties.customProps.get(key).value = props[key];
      } else {
        const tuple = component.properties.customProps.tuples.find(t => t.value.attributeName === key);
        if (!tuple) return;
        tuple.value.value = props[key];
      }
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
    if (key === 'layouts')
      setCssValues(component.properties.layouts, css.layouts);
    else if (key === 'typographies')
      setCssValues(component.properties.typographies, css.typographies);
    else if (key === 'backgroundColors')
      setCssValues(component.properties.backgroundColors, css.backgroundColors);
    else if (key === 'borders')
      setCssValues(component.properties.borders, css.borders);
    else if (component.properties.customCss.has(key))
      setCssValues(component.properties.customCss.get(key), css[key]);
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
