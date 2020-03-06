import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {
  ComponentModel,
  Dictionary
} from '@/models';
import utils from '@/utils';

Vue.use(Vuex);

interface IDesignerState {
  root: ComponentModel;
  selected: ComponentModel | null;
  selectedFor: ComponentModel | null;
  operation: string;
  counter: Dictionary<string, number>;
}

const container = new ComponentModel(null, 'Container', 'div');
container.role = 'Container';
container.baseCssClasses = 'mx-auto';

const store: StoreOptions<IDesignerState> = {
  // strict: true,
  state: {
    root: container,
    selected: null,
    selectedFor: null,
    operation: '',
    counter: new Dictionary<string, number>(),
  },
  mutations: {
    select(state, component) {
      state.selected = component;
    },
    addGrid(state) {
      if (!state.selected) return;

      const grid = utils.addComponent(state.selected, 'Grid', state.counter, 'div');
      utils.addComponent(grid, 'Column', state.counter, 'div');
    },
    addColumn(state) {
      if (!state.selected) return;

      utils.addComponent(state.selected, 'Column', state.counter, 'div');
    },
    addLabel(state) {
      if (!state.selected) return;

      utils.addComponent(state.selected, 'Label', state.counter);
    },
    addSpan(state) {
      if (!state.selected) return;

      utils.addComponent(state.selected, 'Span', state.counter);
    },
    addInput(state) {
      if (!state.selected) return;

      utils.addComponent(state.selected, 'Input', state.counter);
    },
    addTextarea(state) {
      if (!state.selected) return;

      utils.addComponent(state.selected, 'Textarea', state.counter);
    },
    addSelect(state) {
      if (!state.selected) return;

      utils.addComponent(state.selected, 'Select', state.counter);
    },
    addOption(state) {
      if (!state.selected) return;

      utils.addComponent(state.selected, 'Option', state.counter);
    },
    addCheck(state) {
      if (!state.selected) return;

      utils.addComponent(state.selected, 'Check', state.counter);
    },
    addButton(state) {
      if (!state.selected) return;

      utils.addComponent(state.selected, 'Button', state.counter);
    },
    addAnchor(state) {
      if (!state.selected) return;

      utils.addComponent(state.selected, 'Anchor', state.counter, 'a');
    },
    addTable(state) {
      if (!state.selected) return;

      const table = utils.addComponent(state.selected, 'Table', state.counter);

      utils.addComponent(table, 'TableHead', state.counter, 'thead');

      utils.addComponent(table, 'TableBody', state.counter, 'tbody');
    },
    addTableRow(state) {
      if (!state.selected) return;

      utils.addComponent(state.selected, 'TableRow', state.counter, 'tr');
    },
    addHeaderCell(state) {
      if (!state.selected) return;

      utils.addComponent(state.selected, 'HeaderCell', state.counter, 'th');
    },
    addDataCell(state) {
      if (!state.selected) return;

      utils.addComponent(state.selected, 'DataCell', state.counter, 'td');
    },
    deleteSelected(state) {
      if (!state.selected || !state.selected.parent || state.selected.typeName === 'TableHead' ||
        state.selected.typeName === 'TableBody') return;

      if (state.selected === state.selectedFor) {
        state.selectedFor = null;
        state.operation = '';
      }

      const parent = state.selected.parent;
      const index = parent!.children.indexOf(state.selected);
      parent!.children.splice(index, 1);

      state.selected = parent;
    },
    copySelected(state) {
      if (!state.selected) return;

      state.selectedFor = state.selected;
      state.operation = 'paste';
    },
    cutSelected(state) {
      if (!state.selected) return;

      state.selectedFor = state.selected;
      state.operation = 'cut';
    },
    pasteToSelected(state) {
      if (!state.selected || !state.selectedFor) return;

      const selectedFor = state.selectedFor;
      const parent = selectedFor.parent!;
      const newParent = state.selected!;

      if (state.operation === 'cut' && state.selected !== state.selectedFor && !isAncestorOf(selectedFor, newParent)) {
        const index = parent.children.indexOf(selectedFor!);
        parent.children.splice(index, 1);
        selectedFor.parent = newParent;
        newParent.children.push(selectedFor!);
        state.selectedFor = null;
        state.operation = '';
      } else if (state.operation === 'paste') {
        const jsonComp = utils.toStateJson(state.selectedFor);
        utils.addFromStateJson(state.selected, [JSON.parse(jsonComp)], state.counter);
      }
    },
    moveDown(state) {
      if (!state.selected || !state.selected.parent || state.selected.typeName === 'TableHead' ||
        state.selected.typeName === 'TableBody') return;

      const parent = state.selected.parent;
      const index = parent!.children.indexOf(state.selected);
      if (index === 0) return;
      parent!.children.splice(index, 1);
      parent!.children.splice(index - 1, 0, state.selected);
    },
    moveUp(state) {
      if (!state.selected || !state.selected.parent || state.selected.typeName === 'TableHead' ||
        state.selected.typeName === 'TableBody') return;

      const parent = state.selected.parent;
      const index = parent!.children.indexOf(state.selected);
      if (index === parent.children.length - 1) return;
      parent!.children.splice(index, 1);
      parent!.children.splice(index + 1, 0, state.selected);
    },
    saveState(state) {
      window.localStorage.setItem('designer-state', utils.toStateJson(state.root));
    },
    savePreview(state) {
      window.localStorage.setItem('form-preview', utils.toHtml(state.root));
    },
    loadState(state) {
      clearState(state);
      const currentState = window.localStorage.getItem('designer-state')!;
      utils.fromStateJson(state.root, JSON.parse(currentState), state.counter);
    },
    clearState(state) {
      clearState(state);
    },
    loadExample1(state) {
      clearState(state);
      const example = require('@/examples/example1.json');
      utils.fromStateJson(state.root, example, state.counter);
    },
    loadExample2(state) {
      clearState(state);
      const example = require('@/examples/example2.json');
      utils.fromStateJson(state.root, example, state.counter);
    }
  }
};

function isAncestorOf(parent: ComponentModel, child: ComponentModel) {
  while (child.parent != null) {
    if (child.parent === parent)
      return true;
    child = child.parent;
  }
  return false;
}

export default new Vuex.Store<IDesignerState>(store);

function clearState(state: IDesignerState) {
  const stateContainer = new ComponentModel(null, 'Container', 'div');
  stateContainer.role = 'Container';
  stateContainer.baseCssClasses = 'mx-auto';

  state.root = stateContainer;
  state.selected = null;
  state.counter = new Dictionary<string, number>();
}
