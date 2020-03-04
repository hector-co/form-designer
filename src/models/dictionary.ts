export class Dictionary<TKey, TValue> {
  tuples: { key: TKey, value: TValue }[];

  constructor() {
    this.tuples = [];
  }

  add(key: TKey, value: TValue) {
    if (this.has(key))
      throw new Error(`Duplicated key '${key}'`);
    this.tuples.push({ key, value });
  }

  set(key: TKey, value: TValue) {
    const tuple = this.tuples.find(m => m.key === key);
    if (!tuple)
      throw new Error(`Key not found '${key}'`);
    tuple.value = value;
  }

  has(key: TKey): boolean {
    return !!this.tuples.find(m => m.key === key);
  }

  get(key: TKey): TValue {
    const tuple = this.tuples.find(m => m.key === key);
    if (!tuple)
      throw new Error(`Key not found '${key}'`);
    return tuple.value;
  }
}
