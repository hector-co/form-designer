export class PropertyModel {
  name: string;
  value: any;
  attributeName: string;
  attributeMap: (value: any) => string | undefined;
  bindInDesigner: boolean;

  constructor(
    name: string, value?: any, attributeName?: string, attributeMap?: (value: any) => string | undefined,
    bindInDesigner: boolean = false) {
    this.name = name;
    this.value = value;
    this.attributeName = attributeName ? attributeName : name;
    this.attributeMap = attributeMap ? attributeMap : () => undefined;
    this.bindInDesigner = bindInDesigner;
  }

  get calculated(): any {
    const mapped = this.attributeMap(this.value);
    if (mapped !== undefined)
      return mapped;
    return this.value;
  }
}

//   getAttributes(includeText: boolean = false, includeNonBindedInDesigner: boolean = false) {
//     const attrs: any = {};

//     if (this.id)
//       attrs['id'] = this.id;
//     if (this.id)
//       attrs['name'] = this.name;
//     if (this.text && includeText)
//       attrs['text'] = this.text;

//     const tuples = includeNonBindedInDesigner
//       ? this.customProps.tuples
//       : this.customProps.tuples.filter(p => p.value.bindInDesigner);

//     tuples.forEach(p => {
//       const mapped = p.value.attributeMap(p.value.value);
//       if (mapped !== undefined)
//         attrs[p.value.attributeName] = mapped;
//       else if (p.value.value)
//         attrs[p.value.attributeName] = p.value.value;
//     });

//     return attrs;
//   }
