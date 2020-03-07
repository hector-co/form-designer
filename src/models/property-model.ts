export class PropertyModel {
  name: string;
  value: any;
  attributeName: string;
  attributeMap: (value: any) => string | undefined;
  forHtml: boolean;
  bindInDesigner: boolean;

  constructor(
    name: string, value?: any, attributeName?: string, attributeMap?: (value: any) => string | undefined,
    forHtml: boolean = true, bindInDesigner: boolean = false) {
    this.name = name;
    this.value = value;
    this.attributeName = attributeName ? attributeName : name;
    this.attributeMap = attributeMap ? attributeMap : () => undefined;
    this.forHtml = forHtml;
    this.bindInDesigner = bindInDesigner;
  }

  get calculated(): any {
    const mapped = this.attributeMap(this.value);
    if (mapped !== undefined)
      return mapped;
    return this.value;
  }
}
