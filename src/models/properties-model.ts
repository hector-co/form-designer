import { ResponsiveSizes, LayoutModel, ContentModel, TypographyModel, ICssModel, ColorModel, BorderModel } from '.';

function getCss(cssMap: Map<ResponsiveSizes, ICssModel>): string {
  return (cssMap.get(ResponsiveSizes.All)!.getCss('') +
    cssMap.get(ResponsiveSizes.Small)!.getCss('sm:') +
    cssMap.get(ResponsiveSizes.Medium)!.getCss('md:') +
    cssMap.get(ResponsiveSizes.Large)!.getCss('lg:') +
    cssMap.get(ResponsiveSizes.Large)!.getCss('xl:'));
}

export function mapWithResponsiveSizes<T>(factory: () => T): Map<ResponsiveSizes, T> {
  const dict = new Map<ResponsiveSizes, T>();
  dict.set(ResponsiveSizes.All, factory());
  dict.set(ResponsiveSizes.Small, factory());
  dict.set(ResponsiveSizes.Medium, factory());
  dict.set(ResponsiveSizes.Large, factory());

  return dict;
}

export function getAttribute(name: string, value: string) {
  if (!value || !value.trim()) return '';
  return `${name}="${value.trim()}" `;
}

export class PropertiesModel {
  id: string;
  name: string;
  text: string;
  baseCssClasses: string;
  layouts: Map<ResponsiveSizes, LayoutModel>;
  typographies: Map<ResponsiveSizes, TypographyModel>;
  backgroundColors: Map<ResponsiveSizes, ColorModel>;
  borders: Map<ResponsiveSizes, BorderModel>;
  customProps: Map<string, { attributeName: string, value: any, attributeMap: (value: any) => string }>;
  customCss: Map<string, Map<ResponsiveSizes, ICssModel>>;

  constructor(baseCssClass: string = '') {
    this.id = '';
    this.name = '';
    this.text = '';
    this.baseCssClasses = baseCssClass;

    this.layouts = mapWithResponsiveSizes(() => new LayoutModel());
    this.typographies = mapWithResponsiveSizes(() => new TypographyModel());
    this.backgroundColors = mapWithResponsiveSizes(() => new ColorModel('bg'));
    this.borders = mapWithResponsiveSizes(() => new BorderModel());

    this.customProps = new Map<string, { attributeName: string, value: any, attributeMap: (value: any) => string }>();
    this.customCss = new Map<string, Map<ResponsiveSizes, ICssModel>>();
  }

  getAttributes() {
    let customAttrValues = '';
    this.customProps.forEach(p => {
      const mapped = p.attributeMap(p.value);
      customAttrValues += mapped ? mapped : getAttribute(p.attributeName, p.value);
    });

    return getAttribute('id', this.id) +
      getAttribute('name', this.name) +
      getAttribute('class', this.getCss()) +
      customAttrValues;
  }

  getCss() {
    let customCss = '';
    this.customCss.forEach(c => {
      customCss += getCss(c);
    });
    return (this.baseCssClasses ? `${this.baseCssClasses} ` : '') + `${getCss(this.layouts)}${getCss(this.typographies)}${getCss(this.backgroundColors)}${getCss(this.borders)}${customCss} `;
  }

  addCustomProperty<TValue>(
    name: string, value: TValue, attributeName: string = '', attributeMap: (value: TValue) => string = () => '') {
    const customValue = {
      attributeName: attributeName ? attributeName : name,
      value,
      attributeMap
    };
    this.customProps.set(name, customValue);
  }

  addCustomCss(name: string, value: Map<ResponsiveSizes, ICssModel>) {
    this.customCss.set(name, value);
  }
}
