import { ComponentModel } from '@/models';

export function toHtml(component: ComponentModel, level: number = 0) {
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

function getSpaces(count: number): string {
  return ' '.repeat(count * 2);
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
