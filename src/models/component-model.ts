import {
  PropertiesModel,
  ContainerPropertiesModel,
  GridPropertiesModel,
  ColumnPropertiesModel,
  LabelPropertiesModel,
  InputPropertiesModel,
  CheckPropertiesModel,
  SpanPropertiesModel,
  ButtonPropertiesModel,
  TextareaPropertiesModel,
  SelectPropertiesModel,
  OptionPropertiesModel
} from '.';

function getSpaces(count: number): string {
  return ' '.repeat(count * 2);
}

function getHtml(
  level: number, tagName: string, autoclose: boolean, properties: PropertiesModel, children: IComponentModel[] = [],
  content: string = '') {
  let html = `${getSpaces(level)}<${tagName} ${properties.getAttributes().trim()}`;
  if (autoclose) return `${html} />`;
  else html += '>\n';
  if ((!children || !children.length) && !content)
    return `${html}\n${getSpaces(level)}</${tagName}>`;

  if (children && children.length)
    html += children.map(c => c.getHtml(level + 1)).join('\n') + '\n';

  if (content)
    html += `${getSpaces(level + 1)}${content}\n`;

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
  component: string;
  typeName: string;
  id: string;
  name: string;
  tagName: string;
  autoCloseTag: boolean;
  abstract properties: T;

  constructor() {
    this.parent = null;
    this.component = '';
    this.typeName = '';
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
  extends BaseContainerComponentModel<ContainerPropertiesModel, IComponentModel> {
  properties: ContainerPropertiesModel;

  constructor() {
    super();
    this.component = 'ContainerComponent';
    this.typeName = 'Container';
    this.name = 'Container';
    this.properties = new ContainerPropertiesModel();
  }
}

export class GridComponentModel
  extends BaseContainerComponentModel<GridPropertiesModel, IComponentModel> {
  properties: GridPropertiesModel;

  constructor() {
    super();
    this.component = 'GridComponent';
    this.typeName = 'Grid';
    this.name = 'Grid';
    this.properties = new GridPropertiesModel();
  }
}

export class ColumnComponentModel
  extends BaseContainerComponentModel<ColumnPropertiesModel, IComponentModel> {
  properties: ColumnPropertiesModel;

  constructor() {
    super();
    this.component = 'ColumnComponent';
    this.typeName = 'Column';
    this.name = 'Column';
    this.properties = new ColumnPropertiesModel();
  }
}

export class LabelComponentModel
  extends BaseContainerComponentModel<LabelPropertiesModel, IComponentModel> {
  properties: LabelPropertiesModel;

  constructor() {
    super();
    this.component = 'LabelComponent';
    this.typeName = 'Label';
    this.name = 'Label';
    this.tagName = 'label';
    this.properties = new LabelPropertiesModel();
  }

  getHtml(level: number = 0) {
    return getHtml(level, this.tagName, this.autoCloseTag, this.properties, this.children, this.properties.text);
  }
}

export class SpanComponentModel extends BaseComponentModel<SpanPropertiesModel> {
  properties: SpanPropertiesModel;

  constructor() {
    super();
    this.component = 'SpanComponent';
    this.typeName = 'Span';
    this.name = 'Span';
    this.tagName = 'span';
    this.properties = new SpanPropertiesModel();
  }

  getHtml(level: number = 0) {
    return getHtml(level, this.tagName, this.autoCloseTag, this.properties, [], this.properties.text);
  }
}

export class InputComponentModel extends BaseComponentModel<InputPropertiesModel> {
  properties: InputPropertiesModel;

  constructor() {
    super();
    this.component = 'InputComponent';
    this.typeName = 'Input';
    this.name = 'Input';
    this.tagName = 'input';
    this.autoCloseTag = true;
    this.properties = new InputPropertiesModel();
  }
}

export class CheckComponentModel extends BaseComponentModel<CheckPropertiesModel> {
  properties: CheckPropertiesModel;

  constructor() {
    super();
    this.component = 'CheckComponent';
    this.typeName = 'Check';
    this.name = 'Check';
    this.tagName = 'input';
    this.autoCloseTag = true;
    this.properties = new CheckPropertiesModel();
  }
}

export class ButtonComponentModel
  extends BaseContainerComponentModel<ButtonPropertiesModel, IComponentModel> {
  properties: ButtonPropertiesModel;

  constructor() {
    super();
    this.component = 'ButtonComponent';
    this.typeName = 'Button';
    this.name = 'Button';
    this.tagName = 'button';
    this.properties = new ButtonPropertiesModel();
  }

  getHtml(level: number = 0) {
    return getHtml(level, this.tagName, this.autoCloseTag, this.properties, [], this.properties.text);
  }
}

export class TextareaComponentModel extends BaseComponentModel<TextareaPropertiesModel> {
  properties: TextareaPropertiesModel;

  constructor() {
    super();
    this.component = 'TextareaComponent';
    this.typeName = 'Textarea';
    this.name = 'Textarea';
    this.tagName = 'textarea';
    this.properties = new TextareaPropertiesModel();
  }

  getHtml(level: number = 0) {
    return getHtml(level, this.tagName, this.autoCloseTag, this.properties, [], this.properties.text);
  }
}

export class SelectComponentModel
  extends BaseContainerComponentModel<SelectPropertiesModel, OptionComponentModel> {
  properties: SelectPropertiesModel;

  constructor() {
    super();
    this.component = 'SelectComponent';
    this.typeName = 'Select';
    this.name = 'Select';
    this.tagName = 'select';
    this.properties = new SelectPropertiesModel();
  }
}

export class OptionComponentModel extends BaseComponentModel<OptionPropertiesModel> {
  properties: OptionPropertiesModel;

  constructor() {
    super();
    this.component = 'OptionComponent';
    this.typeName = 'Option';
    this.name = 'Option';
    this.tagName = 'option';
    this.properties = new OptionPropertiesModel();
  }

  getHtml(level: number = 0) {
    return getHtml(level, this.tagName, this.autoCloseTag, this.properties, [], this.properties.text);
  }
}
