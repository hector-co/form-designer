import { Dictionary } from '.';

export enum ResponsiveSizes {
  All,
  Small,
  Medium,
  Large
}

export function mapWithResponsiveSizes<T>(factory: (prefix: ResponsiveSizes) => T): Dictionary<ResponsiveSizes, T> {
  const dict = new Dictionary<ResponsiveSizes, T>();
  dict.add(ResponsiveSizes.All, factory(ResponsiveSizes.All));
  dict.add(ResponsiveSizes.Small, factory(ResponsiveSizes.Small));
  dict.add(ResponsiveSizes.Medium, factory(ResponsiveSizes.Medium));
  dict.add(ResponsiveSizes.Large, factory(ResponsiveSizes.Large));

  return dict;
}

export abstract class CssModel {
  responsiveSize: ResponsiveSizes;
  abstract get cssArray(): string[];

  constructor(responsiveSize: ResponsiveSizes) {
    this.responsiveSize = responsiveSize;
  }

  get prefix(): string {
    switch (this.responsiveSize) {
      case ResponsiveSizes.All:
        return '';
      case ResponsiveSizes.Small:
        return 'sm:';
      case ResponsiveSizes.Medium:
        return 'md:';
      case ResponsiveSizes.Large:
        return 'lg:';
    }
  }
}

export class LayoutModel extends CssModel {
  width: string;
  height: string;
  maxWidth: string;
  maxHeight: string;
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;

  constructor(responsiveSize: ResponsiveSizes) {
    super(responsiveSize);
    this.width = '';
    this.height = '';
    this.maxWidth = '';
    this.maxHeight = '';

    this.paddingTop = '';
    this.paddingRight = '';
    this.paddingBottom = '';
    this.paddingLeft = '';

    this.marginTop = '';
    this.marginRight = '';
    this.marginBottom = '';
    this.marginLeft = '';
  }

  get cssArray(): string[] {
    const result: string[] = [];

    if (this.width)
      result.push(`${this.prefix}w-${this.width}`);
    if (this.height)
      result.push(`${this.prefix}h-${this.height}`);
    if (this.maxWidth)
      result.push(`${this.prefix}max-w-${this.maxWidth}`);
    if (this.maxHeight)
      result.push(`${this.prefix}max-h-${this.maxHeight}`);
    const padding = LayoutModel
      .getCssWithPosition(`${this.prefix}p`, this.paddingTop, this.paddingRight, this.paddingBottom, this.paddingLeft);
    result.push(...padding);
    const margin = LayoutModel
      .getCssWithPosition(`${this.prefix}m`, this.marginTop, this.marginRight, this.marginBottom, this.marginLeft);
    result.push(...margin);

    return result;
  }

  static getCssWithPosition(
    prefix: string, top: string = '', right: string = '', bottom: string = '', left: string = ''): string[] {
    if (top && top === right && top === bottom && top === left)
      return [`${prefix}-${top}`];

    const result: string[] = [];
    if (top && top === bottom)
      result.push(`${prefix}y-${top}`);
    else {
      if (top)
        result.push(`${prefix}t-${top}`);
      if (bottom)
        result.push(`${prefix}b-${bottom}`);
    }

    if (right && right === left)
      result.push(`${prefix}x-${right}`);
    else {
      if (right)
        result.push(`${prefix}r-${right}`);
      if (left)
        result.push(`${prefix}l-${left}`);
    }

    return result;
  }
}

export class ContentModel extends CssModel {
  flex: boolean;
  flexWrap: string;
  justify: string;
  alignItems: string;

  constructor(responsiveSize: ResponsiveSizes) {
    super(responsiveSize);
    this.flex = false;
    this.flexWrap = '';
    this.justify = '';
    this.alignItems = '';
  }

  get cssArray(): string[] {
    const result: string[] = [];
    if (this.flex && this.responsiveSize === ResponsiveSizes.All)
      result.push(`${this.prefix}flex`);
    if (this.flexWrap)
      result.push(`${this.prefix}flex-${this.flexWrap}`);
    if (this.justify)
      result.push(`${this.prefix}justify-${this.justify}`);
    if (this.alignItems)
      result.push(`${this.prefix}items-${this.alignItems}`);

    return result;
  }
}

export class TypographyModel extends CssModel {
  textAlign: string;
  verticalAlign: string;
  textSize: string;
  fontWeight: string;
  textColor: ColorModel;
  fontStyle: string;

  constructor(responsiveSize: ResponsiveSizes) {
    super(responsiveSize);
    this.textAlign = '';
    this.verticalAlign = '';
    this.textSize = '';
    this.fontWeight = '';
    this.textColor = new ColorModel(responsiveSize, 'text');
    this.fontStyle = '';
  }

  get cssArray(): string[] {
    const result: string[] = [];

    if (this.textAlign)
      result.push(`${this.prefix}text-${this.textAlign}`);
    if (this.verticalAlign)
      result.push(`${this.prefix}align-${this.verticalAlign}`);
    if (this.textSize)
      result.push(`${this.prefix}text-${this.textSize}`);
    if (this.fontStyle)
      result.push(`${this.prefix}${this.fontStyle}`);
    if (this.fontWeight)
      result.push(`${this.prefix}font-${this.fontWeight}`);
    result.push(...this.textColor.cssArray);

    return result;
  }
}

export class ColorModel extends CssModel {
  type: string;
  color: string;
  hover: string;

  constructor(responsiveSize: ResponsiveSizes, type: string) {
    super(responsiveSize);
    this.type = type;
    this.color = '';
    this.hover = '';
  }

  get cssArray(): string[] {
    const result: string[] = [];

    if (this.color)
      result.push(`${this.prefix}${this.type}-${this.color}`);
    if (this.hover)
      result.push(`${this.prefix}hover:${this.type}-${this.hover}`);

    return result;
  }
}

export class BorderModel extends CssModel {
  style: string;
  width: string;
  color: ColorModel;
  radius: string;

  constructor(responsiveSize: ResponsiveSizes) {
    super(responsiveSize);
    this.style = '';
    this.width = '';
    this.color = new ColorModel(responsiveSize, 'border');
    this.radius = '';
  }

  get cssArray(): string[] {
    const result: string[] = [];

    if (this.style)
      result.push(`${this.prefix}border-${this.style}`);
    if (this.width)
      result.push(this.width === '1' ? `${this.prefix}border` : `${this.prefix}border-${this.width}`);
    if (this.radius)
      result.push(this.radius === '1' ? `${this.prefix}rounded` : `${this.prefix}rounded-${this.radius}`);
    result.push(...this.color.cssArray);

    return result;
  }
}

export class InteractivityModel extends CssModel {
  cursor: string;

  constructor(responsiveSize: ResponsiveSizes) {
    super(responsiveSize);
    this.cursor = '';
  }

  get cssArray(): string[] {
    const result: string[] = [];

    if (this.cursor)
      result.push(`${this.prefix}cursor-${this.cursor}`);

    return result;
  }
}
