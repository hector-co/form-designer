import { ComponentModel } from '@/models/component-model';
import { ResponsiveSizes, CssModel, Dictionary } from '@/models';
import { addComponent } from './add-component';

export function fromStateJson(root: ComponentModel, currentState: any, counter: Dictionary<string, number>) {
  applyProperties(root, currentState.props);
  applyCss(root, currentState.css);
  addFromStateJson(root, currentState.children, counter);
}

export function addFromStateJson(
  parent: ComponentModel, children: Array<any>, counter: Dictionary<string, number>) {
  if (!children) return;
  children.forEach(c => {
    const newComp = addComponent(parent, c.typeName, counter, c.tagName, c.baseCssClasses, !!c.autoCloseTag, false);
    applyProperties(newComp, c.props);
    applyCss(newComp, c.css);

    addFromStateJson(newComp, c.children, counter);
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
