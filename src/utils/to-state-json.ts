import { ComponentModel, PropertyModel, Dictionary, ResponsiveSizes, CssModel } from '@/models';

export function toStateJson(component: ComponentModel): string {
  const newComp = jsonPrepare(component);
  return JSON.stringify(newComp);
}

function jsonPrepare(component: ComponentModel): string {
  const newComp = removeEmptyValues(component, [], ['id', 'parent', 'children', 'properties', 'css']);

  const props = removeEmptyValues(propsToObject(component.properties));
  if (!isEmpty(props))
    newComp.props = props;

  const css = removeEmptyValues(cssToObject(component.css), [], ['responsiveSize', 'type', 'cssArray']);
  if (!isEmpty(css))
    newComp.css = css;

  if (!isEmpty(component.children)) {
    newComp.children = [];
    component.children.forEach(c => {
      newComp.children.push(jsonPrepare(c));
    });
  }

  return newComp;
}

function propsToObject(properties: Dictionary<string, PropertyModel>) {
  const result: any = {};

  properties.tuples.map(t => t.value).reduce((acc, value) => {
    if (value.value)
      acc[value.name] = value.value;
    return acc;
  }, result);

  return result;
}

function cssToObject(css: Dictionary<string, Dictionary<ResponsiveSizes, CssModel>>) {
  const result: any = {};

  css.tuples.reduce((acc, value) => {
    acc[value.key] = {};

    value.value.tuples.reduce((cssAcc, cssValue) => {
      cssAcc[ResponsiveSizes[cssValue.key].toLowerCase()] = cssValue.value;
      return cssAcc;
    }, acc[value.key]);

    return acc;
  }, result);

  return result;
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

    if (isEmpty(obj[k], fieldsToRemoveAlways))
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

function isEmpty(value: any, ignoredFields: string[] = []): boolean {
  if (value === null || value === undefined || value === '' || value === false)
    return true;

  if (value instanceof Array)
    return value.length === 0;

  if (value instanceof Object) {
    if (Object.keys(value).length === 0)
      return true;
    let objResult = true;
    Object.keys(value).forEach(k => {
      if (ignoredFields.indexOf(k) >= 0) return;
      if (!isEmpty(value[k])) {
        objResult = false;
        return;
      }
    });
    return objResult;
  }

  return false;
}
