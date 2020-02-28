export enum ResponsiveSizes {
  All,
  Small,
  Medium,
  Large
}

export interface ICssModel {
  getCss(prefix: string): string;
}

export class LayoutModel implements ICssModel {
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

  constructor() {
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

  getCss(prefix: string) {
    return (this.width ? `${prefix}w-${this.width} ` : '') +
      (this.height ? `${prefix}h-${this.height} ` : '') +
      (this.maxWidth ? `${prefix}max-w-${this.maxWidth} ` : '') +
      (this.maxHeight ? `${prefix}max-h-${this.maxHeight} ` : '') +
      LayoutModel.getCssWithPosition(
        `${prefix}p`, this.paddingTop, this.paddingRight, this.paddingBottom, this.paddingLeft) +
      LayoutModel.getCssWithPosition(
        `${prefix}m`, this.marginTop, this.marginRight, this.marginBottom, this.marginLeft);
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
  flexWrap: string;
  justify: string;
  alignItems: string;

  constructor() {
    this.flexWrap = '';
    this.justify = '';
    this.alignItems = '';
  }

  getCss(prefix: string) {
    return (this.flexWrap ? `${prefix}flex-${this.flexWrap} ` : '') +
      (this.justify ? `${prefix}justify-${this.justify} ` : '') +
      (this.alignItems ? `${prefix}items-${this.alignItems} ` : '');
  }
}

export class TypographyModel implements ICssModel {
  textAlign: string;
  verticalAlign: string;
  textSize: string;
  fontWeight: string;
  textColor: ColorModel;
  fontStyle: string;

  constructor() {
    this.textAlign = '';
    this.verticalAlign = '';
    this.textSize = '';
    this.fontWeight = '';
    this.textColor = new ColorModel('text');
    this.fontStyle = '';
  }

  getCss(prefix: string) {
    return (this.textAlign ? `${prefix}text-${this.textAlign} ` : '') +
      (this.verticalAlign ? `${prefix}align-${this.verticalAlign} ` : '') +
      (this.textSize ? `${prefix}text-${this.textSize} ` : '') +
      (this.fontStyle ? `${prefix}${this.fontStyle} ` : '') +
      this.textColor.getCss(prefix) +
      (this.fontWeight ? `${prefix}font-${this.fontWeight} ` : '');
  }
}

export class ColorModel implements ICssModel {
  type: string;
  color: string;
  hover: string;

  constructor(type: string) {
    this.type = type;
    this.color = '';
    this.hover = '';
  }

  getCss(prefix: string) {
    return (this.color ? `${prefix}${this.type}-${this.color} ` : '') +
      (this.hover ? `${prefix}hover:${this.type}-${this.hover} ` : '');
  }
}

export class BorderModel implements ICssModel {
  style: string;
  width: string;
  color: ColorModel;

  constructor() {
    this.style = '';
    this.width = '';
    this.color = new ColorModel('border');
  }

  getCss(prefix: string) {
    return (this.style ? `${prefix}border-${this.style} ` : '') +
      (this.width ? this.width === '1' ? `${prefix}border ` : `${prefix}border-${this.width} ` : '') +
      this.color.getCss(prefix);
  }
}
