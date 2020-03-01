// export enum ResponsiveSizes {
//   All = '',
//   Small = 'sm',
//   Medium = 'md',
//   Large = 'lg'
// }

export enum ResponsiveSizes {
  All,
  Small,
  Medium,
  Large
}

export interface ICssModel {
  prefix: string;
  readonly cssArray: string[];
}

export class LayoutModel implements ICssModel {
  prefix: string;
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

  constructor(prefix: string) {
    this.prefix = prefix;
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
    if (padding)
      result.push(padding);
    const margin = LayoutModel
      .getCssWithPosition(`${this.prefix}m`, this.marginTop, this.marginRight, this.marginBottom, this.marginLeft);
    if (margin)
      result.push(margin);

    return result;
  }

  static getCssWithPosition(
    prefix: string, top: string = '', right: string = '', bottom: string = '', left: string = '') {
    if (top && top === right && top === bottom && top === left)
      return `${prefix}-${top} `;

    let result = '';
    if (top && top === bottom)
      result += `${prefix}y-${top} `;
    else
      result += (top ? `${prefix}t-${top} ` : '') + (bottom ? `${prefix}b-${bottom} ` : '');

    if (right && right === left)
      result += `${prefix}x-${right} `;
    else
      result += (right ? `${prefix}r-${right} ` : '') + (left ? `${prefix}l-${left} ` : '');

    return result;
  }
}

export class ContentModel implements ICssModel {
  prefix: string;
  flexWrap: string;
  justify: string;
  alignItems: string;

  constructor(prefix: string) {
    this.prefix = prefix;
    this.flexWrap = '';
    this.justify = '';
    this.alignItems = '';
  }

  get cssArray(): string[] {
    const result: string[] = [];
    if (this.flexWrap)
      result.push(`${this.prefix}flex-${this.flexWrap}`);
    if (this.justify)
      result.push(`${this.prefix}justify-${this.justify}`);
    if (this.alignItems)
      result.push(`${this.prefix}items-${this.alignItems}`);

    return result;
  }
}

export class TypographyModel implements ICssModel {
  prefix: string;
  textAlign: string;
  verticalAlign: string;
  textSize: string;
  fontWeight: string;
  textColor: ColorModel;
  fontStyle: string;

  constructor(prefix: string) {
    this.prefix = prefix;
    this.textAlign = '';
    this.verticalAlign = '';
    this.textSize = '';
    this.fontWeight = '';
    this.textColor = new ColorModel(prefix, 'text');
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

export class ColorModel implements ICssModel {
  prefix: string;
  type: string;
  color: string;
  hover: string;

  constructor(prefix: string, type: string) {
    this.prefix = prefix;
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

export class BorderModel implements ICssModel {
  prefix: string;
  style: string;
  width: string;
  color: ColorModel;

  constructor(prefix: string) {
    this.prefix = prefix;
    this.style = '';
    this.width = '';
    this.color = new ColorModel(prefix, 'border');
  }

  get cssArray(): string[] {
    const result: string[] = [];

    if (this.style)
      result.push(`${this.prefix}border-${this.style}`);
    if (this.width)
      result.push(this.width === '1' ? `${this.prefix}border` : `${this.prefix}border-${this.width}`);
    result.push(...this.color.cssArray);

    return result;
  }
}
