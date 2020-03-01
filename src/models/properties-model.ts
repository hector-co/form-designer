import { ResponsiveSizes, LayoutModel, TypographyModel, ICssModel, ColorModel, BorderModel, Dictionary } from '.';

function getCss(cssMap: Dictionary<ResponsiveSizes, ICssModel>): string[] {
  return [
    ...cssMap.get(ResponsiveSizes.All)!.cssArray,
    ...cssMap.get(ResponsiveSizes.Small)!.cssArray,
    ...cssMap.get(ResponsiveSizes.Medium)!.cssArray,
    ...cssMap.get(ResponsiveSizes.Large)!.cssArray];
}

export function mapWithResponsiveSizes<T>(factory: (prefix: string) => T): Dictionary<ResponsiveSizes, T> {
  const dict = new Dictionary<ResponsiveSizes, T>();
  dict.add(ResponsiveSizes.All, factory(''));
  dict.add(ResponsiveSizes.Small, factory('sm'));
  dict.add(ResponsiveSizes.Medium, factory('md'));
  dict.add(ResponsiveSizes.Large, factory('lg'));

  return dict;
}

export class PropertiesModel {
  id: string;
  name: string;
  text: string;
  baseCssClasses: string;
  layouts: Dictionary<ResponsiveSizes, LayoutModel>;
  typographies: Dictionary<ResponsiveSizes, TypographyModel>;
  backgroundColors: Dictionary<ResponsiveSizes, ColorModel>;
  borders: Dictionary<ResponsiveSizes, BorderModel>;
  customProps: Dictionary<string,
    { attributeName: string, value: any, attributeMap: (value: any) => string | undefined }>;
  customCss: Dictionary<string, Dictionary<ResponsiveSizes, ICssModel>>;

  constructor(baseCssClass: string = '') {
    this.id = '';
    this.name = '';
    this.text = '';
    this.baseCssClasses = baseCssClass;

    this.layouts = mapWithResponsiveSizes((prefix) => new LayoutModel(prefix));
    this.typographies = mapWithResponsiveSizes((prefix) => new TypographyModel(prefix));
    this.backgroundColors = mapWithResponsiveSizes((prefix) => new ColorModel(prefix, 'bg'));
    this.borders = mapWithResponsiveSizes((prefix) => new BorderModel(prefix));

    this.customProps = new Dictionary<string,
      { attributeName: string, value: any, attributeMap: (value: any) => | undefined }>();
    this.customCss = new Dictionary<string, Dictionary<ResponsiveSizes, ICssModel>>();
  }

  getAttributes() {
    const attrs: any = {};

    if (this.id)
      attrs['id'] = this.id;
    if (this.id)
      attrs['name'] = this.name;

    this.customProps.tuples.forEach(p => {
      const mapped = p.value.attributeMap(p.value.value);
      if (mapped !== undefined)
        attrs[p.value.attributeName] = mapped;
      else if (p.value.value)
        attrs[p.value.attributeName] = p.value.value;
    });

    return attrs;
  }

  get cssArray() {
    const result: string[] = [];

    if (this.baseCssClasses)
      result.push(this.baseCssClasses);
    result.push(...getCss(this.layouts));
    result.push(...getCss(this.typographies));
    result.push(...getCss(this.backgroundColors));
    result.push(...getCss(this.borders));

    this.customCss.tuples.forEach(c => {
      result.push(...getCss(c.value));
    });

    return result;
  }

  addCustomProperty<TValue>(
    name: string, value: TValue, attributeName: string = '',
    attributeMap: (value: TValue) => string | undefined = () => undefined) {
    const customValue = {
      attributeName: attributeName ? attributeName : name,
      value,
      attributeMap
    };
    this.customProps.add(name, customValue);
  }

  addCustomCss(name: string, value: Dictionary<ResponsiveSizes, ICssModel>) {
    this.customCss.add(name, value);
  }
}
