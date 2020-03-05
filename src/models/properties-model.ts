import { ResponsiveSizes, LayoutModel, TypographyModel, CssModel, ColorModel, BorderModel, Dictionary } from '.';

function getCss(cssMap: Dictionary<ResponsiveSizes, CssModel>): string[] {
  return [
    ...cssMap.get(ResponsiveSizes.All)!.cssArray,
    ...cssMap.get(ResponsiveSizes.Small)!.cssArray,
    ...cssMap.get(ResponsiveSizes.Medium)!.cssArray,
    ...cssMap.get(ResponsiveSizes.Large)!.cssArray];
}

export function mapWithResponsiveSizes<T>(factory: (prefix: ResponsiveSizes) => T): Dictionary<ResponsiveSizes, T> {
  const dict = new Dictionary<ResponsiveSizes, T>();
  dict.add(ResponsiveSizes.All, factory(ResponsiveSizes.All));
  dict.add(ResponsiveSizes.Small, factory(ResponsiveSizes.Small));
  dict.add(ResponsiveSizes.Medium, factory(ResponsiveSizes.Medium));
  dict.add(ResponsiveSizes.Large, factory(ResponsiveSizes.Large));

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
    { attributeName: string, value: any, attributeMap: (value: any) => string | undefined, bindInDesigner: boolean }>;
  customCss: Dictionary<string, Dictionary<ResponsiveSizes, CssModel>>;

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
      { attributeName: string, value: any, attributeMap: (value: any) => | undefined, bindInDesigner: boolean }>();
    this.customCss = new Dictionary<string, Dictionary<ResponsiveSizes, CssModel>>();
  }

  getAttributes(includeText: boolean = false, includeNonBindedInDesigner: boolean = false) {
    const attrs: any = {};

    if (this.id)
      attrs['id'] = this.id;
    if (this.id)
      attrs['name'] = this.name;
    if (this.text && includeText)
      attrs['text'] = this.text;

    const tuples = includeNonBindedInDesigner
      ? this.customProps.tuples
      : this.customProps.tuples.filter(p => p.value.bindInDesigner);

    tuples.forEach(p => {
      const mapped = p.value.attributeMap(p.value.value);
      if (mapped !== undefined)
        attrs[p.value.attributeName] = mapped;
      else if (p.value.value)
        attrs[p.value.attributeName] = p.value.value;
    });

    return attrs;
  }

  getCss() {
    const css: any = {};
    PropertiesModel.addCssToObject(css, 'layouts', this.layouts);
    PropertiesModel.addCssToObject(css, 'typographies', this.typographies);
    PropertiesModel.addCssToObject(css, 'backgroundColors', this.backgroundColors);
    PropertiesModel.addCssToObject(css, 'borders', this.borders);

    this.customCss.tuples.forEach(c => {
      PropertiesModel.addCssToObject(css, c.key, c.value);
    });

    return css;
  }

  private static addCssToObject(css: any, key: string, cssDictionary: Dictionary<ResponsiveSizes, CssModel>) {
    css[key] = {
      all: cssDictionary.get(ResponsiveSizes.All),
      small: cssDictionary.get(ResponsiveSizes.Small),
      medium: cssDictionary.get(ResponsiveSizes.Medium),
      large: cssDictionary.get(ResponsiveSizes.Large)
    };
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
    attributeMap: (value: TValue) => string | undefined = () => undefined, bindInDesigner: boolean = true) {
    const customValue = {
      attributeName: attributeName ? attributeName : name,
      value,
      attributeMap,
      bindInDesigner
    };
    this.customProps.add(name, customValue);
  }

  addCustomCss(name: string, value: Dictionary<ResponsiveSizes, CssModel>) {
    this.customCss.add(name, value);
  }
}
