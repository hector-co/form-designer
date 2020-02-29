import { ResponsiveSizes, LayoutModel, ContentModel, TypographyModel, ICssModel, ColorModel, BorderModel } from '.';

function getCss(cssMap: Map<ResponsiveSizes, ICssModel>): string {
  return (cssMap.get(ResponsiveSizes.All)!.getCss('') +
    cssMap.get(ResponsiveSizes.Small)!.getCss('sm:') +
    cssMap.get(ResponsiveSizes.Medium)!.getCss('md:') +
    cssMap.get(ResponsiveSizes.Large)!.getCss('lg:') +
    cssMap.get(ResponsiveSizes.Large)!.getCss('xl:'));
}

function getAttribute(name: string, value: string) {
  if (!value || !value.trim()) return '';
  return `${name}="${value.trim()}" `;
}

function mapWithResponsiveSizes<T>(factory: () => T): Map<ResponsiveSizes, T> {
  const dict = new Map<ResponsiveSizes, T>();
  dict.set(ResponsiveSizes.All, factory());
  dict.set(ResponsiveSizes.Small, factory());
  dict.set(ResponsiveSizes.Medium, factory());
  dict.set(ResponsiveSizes.Large, factory());

  return dict;
}

export abstract class PropertiesModel {
  id: string;
  name: string;
  baseCssClasses: string;
  layouts: Map<ResponsiveSizes, LayoutModel>;
  backgroundColors: Map<ResponsiveSizes, ColorModel>;
  borders: Map<ResponsiveSizes, BorderModel>;

  constructor() {
    this.id = '';
    this.name = '';
    this.baseCssClasses = '';

    this.layouts = mapWithResponsiveSizes(() => new LayoutModel());
    this.backgroundColors = mapWithResponsiveSizes(() => new ColorModel('bg'));
    this.borders = mapWithResponsiveSizes(() => new BorderModel());
  }

  getAttributes() {
    return getAttribute('id', this.id) +
      getAttribute('name', this.name) +
      getAttribute('class', this.getCss());
  }

  getCss() {
    return `${this.baseCssClasses}${getCss(this.layouts)}${getCss(this.backgroundColors)}${getCss(this.borders)} `;
  }
}

export class ContainerPropertiesModel extends PropertiesModel {
  constructor() {
    super();
    this.baseCssClasses = 'container mx-auto ';
  }
}

export class GridPropertiesModel extends PropertiesModel {
  contents: Map<ResponsiveSizes, ContentModel>;

  constructor() {
    super();
    this.contents = mapWithResponsiveSizes(() => new ContentModel());
    this.baseCssClasses = 'flex ';
  }

  getCss() {
    return `${super.getCss()}${getCss(this.contents)} `;
  }
}

export class ColumnPropertiesModel extends PropertiesModel {
  constructor() {
    super();

    this.layouts.get(ResponsiveSizes.All)!.paddingTop = '1';
    this.layouts.get(ResponsiveSizes.All)!.paddingRight = '1';
    this.layouts.get(ResponsiveSizes.All)!.paddingBottom = '1';
    this.layouts.get(ResponsiveSizes.All)!.paddingLeft = '1';
    this.layouts.get(ResponsiveSizes.All)!.width = 'full';
  }
}

export class LabelPropertiesModel extends PropertiesModel {
  forId: string;
  text: string;
  typographies: Map<ResponsiveSizes, TypographyModel>;

  constructor() {
    super();
    this.forId = '';
    this.text = '';
    this.typographies = mapWithResponsiveSizes(() => new TypographyModel());
    this.baseCssClasses = 'block ';
  }

  getAttributes() {
    return super.getAttributes() +
      getAttribute('for', this.forId);
  }

  getCss() {
    return `${super.getCss()}${getCss(this.typographies)}`;
  }
}

export class SpanPropertiesModel extends PropertiesModel {
  text: string;
  typographies: Map<ResponsiveSizes, TypographyModel>;

  constructor() {
    super();
    this.text = '';
    this.typographies = mapWithResponsiveSizes(() => new TypographyModel());
  }

  getCss() {
    return `${super.getCss()}${getCss(this.typographies)}`;
  }
}

export class InputPropertiesModel extends PropertiesModel {
  type: string;
  value: string;
  typographies: Map<ResponsiveSizes, TypographyModel>;

  constructor() {
    super();
    this.type = 'text';
    this.value = '';
    this.typographies = mapWithResponsiveSizes(() => new TypographyModel());

    this.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
    this.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
    this.layouts.get(ResponsiveSizes.All)!.paddingLeft = '2';
    this.layouts.get(ResponsiveSizes.All)!.paddingRight = '2';
    this.layouts.get(ResponsiveSizes.All)!.width = 'full';

    this.borders.get(ResponsiveSizes.All)!.width = '1';
  }

  getAttributes() {
    return super.getAttributes() +
      getAttribute('type', this.type) +
      getAttribute('value', this.value);
  }

  getCss() {
    return `${super.getCss()}${getCss(this.typographies)}`;
  }
}

export class CheckPropertiesModel extends PropertiesModel {
  type: string;
  value: string;
  checked: boolean;

  constructor() {
    super();
    this.type = 'checkbox';
    this.value = '';
    this.checked = false;
  }

  getAttributes() {
    return super.getAttributes() +
      getAttribute('type', this.type) +
      getAttribute('value', this.value) +
      (this.checked ? getAttribute('checked', 'checked') : '');
  }
}

export class ButtonPropertiesModel extends PropertiesModel {
  text: string;
  typographies: Map<ResponsiveSizes, TypographyModel>;

  constructor() {
    super();
    this.text = '';
    this.typographies = mapWithResponsiveSizes(() => new TypographyModel());

    this.typographies.get(ResponsiveSizes.All)!.textColor.color = 'white';
    this.backgroundColors.get(ResponsiveSizes.All)!.color = 'blue-500';
    this.backgroundColors.get(ResponsiveSizes.All)!.hover = 'blue-700';

    this.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
    this.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
    this.layouts.get(ResponsiveSizes.All)!.paddingLeft = '4';
    this.layouts.get(ResponsiveSizes.All)!.paddingRight = '4';
  }

  getCss() {
    return `${super.getCss()}${getCss(this.typographies)}`;
  }
}

export class TextareaPropertiesModel extends PropertiesModel {
  text: string;
  rows: string;
  typographies: Map<ResponsiveSizes, TypographyModel>;

  constructor() {
    super();
    this.baseCssClasses = 'block ';
    this.text = '';
    this.rows = '';
    this.typographies = mapWithResponsiveSizes(() => new TypographyModel());

    this.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
    this.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
    this.layouts.get(ResponsiveSizes.All)!.paddingLeft = '2';
    this.layouts.get(ResponsiveSizes.All)!.paddingRight = '2';
    this.layouts.get(ResponsiveSizes.All)!.width = 'full';

    this.borders.get(ResponsiveSizes.All)!.width = '1';
  }

  getAttributes() {
    return super.getAttributes() +
      getAttribute('rows', this.rows);
  }

  getCss() {
    return `${super.getCss()}${getCss(this.typographies)}`;
  }
}

export class SelectPropertiesModel extends PropertiesModel {
  typographies: Map<ResponsiveSizes, TypographyModel>;

  constructor() {
    super();
    this.typographies = mapWithResponsiveSizes(() => new TypographyModel());

    this.layouts.get(ResponsiveSizes.All)!.paddingTop = '2';
    this.layouts.get(ResponsiveSizes.All)!.paddingBottom = '2';
    this.layouts.get(ResponsiveSizes.All)!.paddingLeft = '2';
    this.layouts.get(ResponsiveSizes.All)!.paddingRight = '2';
    this.layouts.get(ResponsiveSizes.All)!.width = 'full';

    this.borders.get(ResponsiveSizes.All)!.width = '1';
  }

  getAttributes() {
    return super.getAttributes();
  }

  getCss() {
    return `${super.getCss()}${getCss(this.typographies)}`;
  }
}

export class OptionPropertiesModel extends PropertiesModel {
  value: string;
  text: string;
  selected: boolean;
  typographies: Map<ResponsiveSizes, TypographyModel>;

  constructor() {
    super();
    this.value = '';
    this.text = '';
    this.selected = false;
    this.typographies = mapWithResponsiveSizes(() => new TypographyModel());
  }

  getAttributes() {
    return super.getAttributes() +
      getAttribute('value', this.value) +
      (this.selected ? getAttribute('selected', 'selected') : '');
  }
}
