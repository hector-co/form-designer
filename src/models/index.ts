import { PropertiesModel } from './properties-model';
import { ComponentModel } from './component-model';

export * from './component-model';
export * from './properties-model';
export * from './css-model';
export * from './dictionary';

function getSpaces(count: number): string {
  return ' '.repeat(count * 2);
}

export function toHtml(
  component: ComponentModel, level: number = 0) {
  let html = `${getSpaces(level)}<${component.tagName} ${propsToHtmlAttributes(component.properties).trim()}`;
  if (component.autoCloseTag) return `${html} />`;
  else html += '>\n';

  if ((!component.children || !component.children.length) && !component.properties.text)
    return `${html}\n${getSpaces(level)}</${component.tagName}>`;

  if (component.children && component.children.length)
    html += component.children.map(c => toHtml(c, level + 1)).join('\n') + '\n';

  if (component.properties.text)
    html += `${getSpaces(level + 1)}${component.properties.text}\n`;

  return `${html}${getSpaces(level)}</${component.tagName}>`;
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

export function toJson(component: ComponentModel): string {
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
  const newComp = removeEmptyValues(component, [], ['parent', 'children', 'properties']);
  newComp.children = [];
  component.children.forEach(c => {
    newComp.children.push(jsonPrepare(c));
  });
  newComp.props = removeEmptyValues(component.properties.getAttributes());
  newComp.css = removeEmptyValues(component.properties.getCss(), [], ['responsiveSize', 'type', 'cssArray']);

  return newComp;
}
