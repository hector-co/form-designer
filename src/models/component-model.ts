import {
  PropertiesModel,
  getAttribute,
  mapWithResponsiveSizes,
  ContentModel
} from '.';

function getSpaces(count: number): string {
  return ' '.repeat(count * 2);
}

function getHtml(
  level: number, tagName: string, autoclose: boolean, properties: PropertiesModel, children: IComponentModel[] = []) {
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

export interface IComponentModel {
  parent: IComponentModel | null;
  component: string;
  typeName: string;
  id: string;
  name: string;
  tagName: string;
  autoCloseTag: boolean;

  getHtml(level: number): string;
}

export abstract class BaseComponentModel<T extends PropertiesModel> implements IComponentModel {
  parent: IComponentModel | null;
  typeName: string;
  component: string;
  id: string;
  name: string;
  tagName: string;
  autoCloseTag: boolean;
  abstract properties: T;

  constructor() {
    this.parent = null;
    this.typeName = '';
    this.component = '';
    this.id = '';
    this.name = '';
    this.tagName = 'div';
    this.autoCloseTag = false;
  }

  getHtml(level: number = 0) {
    return getHtml(level, this.tagName, this.autoCloseTag, this.properties);
  }
}

export abstract class BaseContainerComponentModel
  <T extends PropertiesModel, C extends IComponentModel> extends BaseComponentModel<T> {
  children: C[];

  constructor() {
    super();
    this.children = [];
  }

  getHtml(level: number = 0) {
    return getHtml(level, this.tagName, this.autoCloseTag, this.properties, this.children);
  }
}

export class ContainerComponentModel
  extends BaseContainerComponentModel<PropertiesModel, IComponentModel> {
  properties: PropertiesModel;

  constructor() {
    super();
    this.component = 'ContainerComponent';
    this.typeName = 'Container';
    this.name = 'Container';
    this.properties = new PropertiesModel('container mx-auto');
  }
}

export class GridComponentModel
  extends BaseContainerComponentModel<PropertiesModel, IComponentModel> {
  properties: PropertiesModel;

  constructor() {
    super();
    this.component = 'GridComponent';
    this.typeName = 'Grid';
    this.name = 'Grid';
    this.properties = new PropertiesModel('flex');
    this.properties.addCustomCss('contents', mapWithResponsiveSizes(() => new ContentModel()));
  }
}

export class ColumnComponentModel
  extends BaseContainerComponentModel<PropertiesModel, IComponentModel> {
  properties: PropertiesModel;

  constructor() {
    super();
    this.component = 'ColumnComponent';
    this.typeName = 'Column';
    this.name = 'Column';
    this.properties = new PropertiesModel();
  }
}

export class LabelComponentModel
  extends BaseContainerComponentModel<PropertiesModel, IComponentModel> {
  properties: PropertiesModel;

  constructor() {
    super();
    this.component = 'LabelComponent';
    this.typeName = 'Label';
    this.name = 'Label';
    this.tagName = 'label';
    this.properties = new PropertiesModel('block');
    this.properties.addCustomProperty('forId', '', 'for');
  }
}

export class SpanComponentModel extends BaseComponentModel<PropertiesModel> {
  properties: PropertiesModel;

  constructor() {
    super();
    this.component = 'SpanComponent';
    this.typeName = 'Span';
    this.name = 'Span';
    this.tagName = 'span';
    this.properties = new PropertiesModel();
  }
}

export class InputComponentModel extends BaseComponentModel<PropertiesModel> {
  properties: PropertiesModel;

  constructor() {
    super();
    this.component = 'InputComponent';
    this.typeName = 'Input';
    this.name = 'Input';
    this.tagName = 'input';
    this.autoCloseTag = true;
    this.properties = new PropertiesModel();
    this.properties.addCustomProperty('type', 'text');
    this.properties.addCustomProperty('value', '');
  }
}

export class CheckComponentModel extends BaseComponentModel<PropertiesModel> {
  properties: PropertiesModel;

  constructor() {
    super();
    this.component = 'CheckComponent';
    this.typeName = 'Check';
    this.name = 'Check';
    this.tagName = 'input';
    this.autoCloseTag = true;
    this.properties = new PropertiesModel();
    this.properties.addCustomProperty('type', 'checkbox');
    this.properties.addCustomProperty('value', '');
    this.properties.addCustomProperty('checked', false, 'checked',
      (value) => value ? getAttribute('checked', 'checked') : '');
  }
}

export class ButtonComponentModel
  extends BaseContainerComponentModel<PropertiesModel, IComponentModel> {
  properties: PropertiesModel;

  constructor() {
    super();
    this.component = 'ButtonComponent';
    this.typeName = 'Button';
    this.name = 'Button';
    this.tagName = 'button';
    this.properties = new PropertiesModel('container mx-auto');
  }
}

export class TextareaComponentModel extends BaseComponentModel<PropertiesModel> {
  properties: PropertiesModel;

  constructor() {
    super();
    this.component = 'TextareaComponent';
    this.typeName = 'Textarea';
    this.name = 'Textarea';
    this.tagName = 'textarea';
    this.properties = new PropertiesModel('block');
    this.properties.addCustomProperty('rows', '');
  }
}

export class SelectComponentModel
  extends BaseContainerComponentModel<PropertiesModel, OptionComponentModel> {
  properties: PropertiesModel;

  constructor() {
    super();
    this.component = 'SelectComponent';
    this.typeName = 'Select';
    this.name = 'Select';
    this.tagName = 'select';
    this.properties = new PropertiesModel();
  }
}

export class OptionComponentModel extends BaseComponentModel<PropertiesModel> {
  properties: PropertiesModel;

  constructor() {
    super();
    this.component = 'OptionComponent';
    this.typeName = 'Option';
    this.name = 'Option';
    this.tagName = 'option';
    this.properties = new PropertiesModel();
    this.properties.addCustomProperty('value', '');
    this.properties.addCustomProperty('selected', false, 'selected',
      (value) => value ? getAttribute('selected', 'selected') : '');
  }
}
