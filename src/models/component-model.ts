import {
  ResponsiveSizes,
  CssModel,
  LayoutModel,
  TypographyModel,
  ColorModel, BorderModel,
  InteractivityModel
} from '.';
import { PropertyModel, mapWithResponsiveSizes, Dictionary } from '.';

export class ComponentModel implements ComponentModel {
  parent?: ComponentModel | null;
  typeName: string;
  component: string;
  id: string;
  tagName: string;
  role: string;
  baseCssClasses: string;
  autoCloseTag: boolean;
  children: ComponentModel[];

  properties: Dictionary<string, PropertyModel>;
  css: Dictionary<string, Dictionary<ResponsiveSizes, CssModel>>;

  constructor(
    parent: ComponentModel | null, typeName: string, tagName: string = '', baseCssClasses: string = '',
    autoCloseTag: boolean = false) {
    this.parent = parent;
    this.typeName = typeName;

    this.tagName = tagName ? tagName : typeName.toLowerCase();
    this.component = this.tagName;
    this.baseCssClasses = baseCssClasses;
    this.autoCloseTag = autoCloseTag;

    this.id = '';
    this.role = '';
    this.children = [];

    this.properties = new Dictionary<string, PropertyModel>();
    this.properties.add('id', new PropertyModel('id', ''));
    this.properties.add('name', new PropertyModel('name', ''));
    this.properties.add('text', new PropertyModel('text', '', undefined, undefined, false));

    this.css = new Dictionary<string, Dictionary<ResponsiveSizes, CssModel>>();
    this.css.add('layout', mapWithResponsiveSizes((prefix) => new LayoutModel(prefix)));
    this.css.add('typography', mapWithResponsiveSizes((prefix) => new TypographyModel(prefix)));
    this.css.add('backgroundColor', mapWithResponsiveSizes((prefix) => new ColorModel(prefix, 'bg')));
    this.css.add('border', mapWithResponsiveSizes((prefix) => new BorderModel(prefix)));
    this.css.add('interactivity', mapWithResponsiveSizes((prefix) => new InteractivityModel(prefix)));
  }

  getCss<TCssModel extends CssModel>(key: string, size: ResponsiveSizes): TCssModel {
    return this.css.get(key).get(size) as TCssModel;
  }

  getPropertyValue<TValue>(key: string): TValue {
    return this.properties.get(key).value as TValue;
  }

  addProperty(
    name: string, value?: any, attributeName?: string, attributeMap?: (value: any) => string | undefined,
    forHtml: boolean = true, bindInDesigner: boolean = false) {
    this.properties.add(name, new PropertyModel(name, value, attributeName, attributeMap, forHtml, bindInDesigner));
  }

  get cssArray() {
    const result: string[] = [];

    if (this.baseCssClasses)
      result.push(this.baseCssClasses);

    this.css.tuples.forEach(cs => {
      result.push(...this.cssModelToArray(cs.value));
    });

    return result;
  }

  get cssArraySmall() {
    const result: string[] = [];

    if (this.baseCssClasses)
      result.push(this.baseCssClasses);

    this.css.tuples.forEach(cs => {
      result.push(...cs.value.get(ResponsiveSizes.All).cssArray);
    });

    return result;
  }

  get cssArrayMedium() {
    const result: string[] = [];

    if (this.baseCssClasses)
      result.push(this.baseCssClasses);

    this.css.tuples.forEach(cs => {
      result.push(...cs.value.get(ResponsiveSizes.All).cssArray);
      result.push(...cs.value.get(ResponsiveSizes.Medium).cssArray);
    });

    return result;
  }

  get cssArrayLarge() {
    return this.cssArray;
  }

  private cssModelToArray(cssMap: Dictionary<ResponsiveSizes, CssModel>): string[] {
    return [
      ...cssMap.get(ResponsiveSizes.All)!.cssArray,
      ...cssMap.get(ResponsiveSizes.Small)!.cssArray,
      ...cssMap.get(ResponsiveSizes.Medium)!.cssArray,
      ...cssMap.get(ResponsiveSizes.Large)!.cssArray];
  }

}
