import {
  LayoutModel,
  ResponsiveSizes,
  ColorModel,
  ComponentModel,
  Dictionary,
  mapWithResponsiveSizes,
  ContentModel,
  BorderModel,
  TypographyModel
} from '@/models';

export function addComponent(
  parent: ComponentModel, typeName: string, counter: Dictionary<string, number>,
  tagName: string = '', baseCssClasses: string = '', autoCloseTag: boolean = false,
  addDefaultValues: boolean = true): ComponentModel {
  if (!counter.has(typeName)) counter.add(typeName, 0);
  const counterValue = counter.get(typeName)! + 1;

  const component = new ComponentModel(parent, typeName, tagName, baseCssClasses, autoCloseTag);
  component.id = `${typeName}_${counterValue}`;
  component.parent = parent;
  parent.children.push(component);

  switch (typeName.toLowerCase()) {
    case 'grid':
      component.tagName = 'div';
      component.role = 'Grid';
      component.css.add('content', mapWithResponsiveSizes((prefix) => new ContentModel(prefix)));

      if (!addDefaultValues) break;
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).width = 'full';
      component.getCss<ContentModel>('content', ResponsiveSizes.All).flex = true;
      break;
    case 'column':
      if (!tagName) component.tagName = 'div';
      component.css.add('content', mapWithResponsiveSizes((prefix) => new ContentModel(prefix)));
      component.role = 'Column';

      if (!addDefaultValues) break;
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).width = 'full';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingTop = '1';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingBottom = '1';

      if ((parent && parent.typeName === 'Column') || (parent.parent && parent.parent.typeName === 'Column')) break;
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingRight = '1';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingLeft = '1';
      break;
    case 'label':
      component.baseCssClasses = 'block';
      component.addProperty('for', '');

      if (!addDefaultValues) break;
      component.properties.get('text').value = `${typeName}_${counterValue}`;
      break;
    case 'span':
      if (!addDefaultValues) break;
      component.properties.get('text').value = `${typeName}_${counterValue}`;
      break;
    case 'input':
      component.autoCloseTag = true;
      component.component = 'InputComponent';
      component.addProperty('type', 'text');
      component.addProperty('value', '');

      if (!addDefaultValues) break;
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingTop = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingBottom = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingLeft = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingRight = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).width = 'full';
      component.getCss<BorderModel>('border', ResponsiveSizes.All).width = '1';
      break;
    case 'textarea':
      component.baseCssClasses = 'block';
      component.component = 'TextareaComponent';
      component.addProperty('rows', '');

      if (!addDefaultValues) break;
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingTop = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingBottom = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingLeft = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingRight = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).width = 'full';
      component.getCss<BorderModel>('border', ResponsiveSizes.All).width = '1';
      break;
    case 'select':
      component.component = 'SelectComponent';

      if (!addDefaultValues) break;
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingTop = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingBottom = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingLeft = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingRight = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).width = 'full';
      component.getCss<BorderModel>('border', ResponsiveSizes.All).width = '1';
      break;
    case 'option':
      component.addProperty('value', '');
      component.addProperty('selected', false, 'selected',
        (value) => value ? 'selected' : undefined);
      break;
    case 'check':
      component.tagName = 'input';
      component.component = 'CheckComponent';
      component.autoCloseTag = true;
      component.addProperty('type', 'checkbox');
      component.addProperty('value', '');
      component.addProperty('checked', false, 'checked',
        (value) => value ? 'checked' : undefined);
      break;
    case 'button':
      if (!addDefaultValues) break;
      component.properties.get('text').value = `${typeName}_${counterValue}`;
      component.getCss<TypographyModel>('typography', ResponsiveSizes.All).textColor.color = 'white';
      component.getCss<ColorModel>('backgroundColor', ResponsiveSizes.All).color = 'blue-500';
      component.getCss<ColorModel>('backgroundColor', ResponsiveSizes.All).hover = 'blue-700';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingTop = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingBottom = '2';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingLeft = '4';
      component.getCss<LayoutModel>('layout', ResponsiveSizes.All).paddingRight = '4';
      break;
    case 'anchor':
      component.addProperty('href', '', 'href', undefined, false);
      component.addProperty('target', '', 'target',
        (value) => value === '' ? undefined : '_blank', false);
      if (!addDefaultValues) break;
      component.properties.get('text').value = `${typeName}_${counterValue}`;
      break;
  }

  counter.set(typeName, counterValue);
  return component;
}
