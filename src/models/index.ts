import { PropertiesModel } from './properties-model';
import { ComponentModel } from './component-model';

export * from './component-model';
export * from './properties-model';
export * from './css-model';

function getSpaces(count: number): string {
  return ' '.repeat(count * 2);
}

export function toHtml(
  component: ComponentModel, level: number = 0) {
  let html = `${getSpaces(level)}<${component.tagName} ${toHtmlAttributes(component.properties).trim()}`;
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

function toHtmlAttributes(properties: PropertiesModel) {
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

export class Dictionary<TKey, TValue> {
  tuples: { key: TKey, value: TValue }[];

  constructor() {
    this.tuples = [];
  }

  add(key: TKey, value: TValue) {
    if (this.has(key))
      throw new Error(`Duplicated key '${key}'`);
    this.tuples.push({ key, value });
  }

  set(key: TKey, value: TValue) {
    const tuple = this.tuples.find(m => m.key === key);
    if (!tuple)
      throw new Error(`Key not found '${key}'`);
    tuple.value = value;
  }

  has(key: TKey): boolean {
    return !!this.tuples.find(m => m.key === key);
  }

  get(key: TKey): TValue {
    const tuple = this.tuples.find(m => m.key === key);
    if (!tuple)
      throw new Error(`Key not found '${key}'`);
    return tuple.value;
  }
}
