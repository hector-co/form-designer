import { PropertiesModel } from '.';

export class ComponentModel implements ComponentModel {
  parent?: ComponentModel | null;
  typeName: string;
  component: string;
  id: string;
  tagName: string;
  role: string;
  autoCloseTag: boolean;
  properties: PropertiesModel;
  children: ComponentModel[];

  constructor(parent: ComponentModel | null, typeName: string, tagName: string = '', autoCloseTag: boolean = false) {
    this.parent = parent;
    this.typeName = typeName;

    this.tagName = tagName ? tagName : typeName.toLowerCase();
    this.component = this.tagName;
    this.autoCloseTag = autoCloseTag;

    this.id = '';
    this.role = '';
    this.properties = new PropertiesModel();
    this.children = [];
  }
}
