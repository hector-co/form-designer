import { PropertiesModel } from '.';

function getSpaces(count: number): string {
  return ' '.repeat(count * 2);
}

function getHtml(
  level: number, tagName: string, autoclose: boolean, properties: PropertiesModel, children: ComponentModel[] = []) {
  let html = `${getSpaces(level)}<${tagName} ${properties.getAttributes().trim()}`;
  if (autoclose) return `${html} />`;
  else html += '>\n';

  if ((!children || !children.length) && !properties.text)
    return `${html}\n${getSpaces(level)}</${tagName}>`;

  if (children && children.length)
    html += children.map(c => c.getHtml(level + 1)).join('\n') + '\n';

  if (properties.text)
    html += `${getSpaces(level + 1)}${properties.text}\n`;

  return `${html}${getSpaces(level)}</${tagName}>`;
}

export class ComponentModel implements ComponentModel {
  parent?: ComponentModel | null;
  typeName: string;
  component: string;
  id: string;
  name: string;
  tagName: string;
  autoCloseTag: boolean;
  properties: PropertiesModel;
  children: ComponentModel[];

  constructor(parent: ComponentModel | null, typeName: string, tagName: string = '', autoCloseTag: boolean = false) {
    this.parent = parent;
    this.typeName = typeName;

    this.name = typeName;
    this.tagName = tagName ? tagName : typeName.toLowerCase();
    this.component = this.tagName;
    this.autoCloseTag = autoCloseTag;

    this.id = '';
    this.properties = new PropertiesModel();
    this.children = [];
  }

  getHtml(level: number = 0) {
    return getHtml(level, this.tagName, this.autoCloseTag, this.properties, this.children);
  }
}
