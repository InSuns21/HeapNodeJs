/**
 * 1次元配列を使ったHeapの実装です。
 */
class Heap {
  /**
   * Heapを構築します。
   * @param {Array.<*>} arr
   * @param {function} [iterateeOpt] アイテムから順序を決める数値を返す関数。
   */
  constructor(
    arr,
    iterateeOpt = (n) => {
      return n;
    }
  ) {
    this._list = [];
    this._iteratee = iterateeOpt;

    for (const item of arr) {
      this.insert(item);
    }
  }

  /**
   * 要素を追加します。
   * @param {*} item
   */
  insert(item) {
    this._list.push(item);
    this._percolateUp();
  }
  /**
   * Heapの配列表現を返します。
   * @param {*} item
   */
  getHeapList() {
    return this._list;
  }

  /**
   *
   * @returns 最小値をHeapから取り出します。
   */
  popMin() {
    if (this._list.length === 0) {
      return null;
    }
    if (this._list.length === 1) {
      return this._list.pop();
    }
    const res = this._list[0];
    this._list[0] = this._list.pop();
    this._percolateDown();

    return res;
  }
  /**
   * Heapの配列データをソートして返します。
   * @returns ソートした配列データ
   */
  sort(heapSave = false) {
    const tmp = heapSave ? [...this._list] : null;
    const sorted = [];
    while (this._list.length > 0) {
      const val = this.popMin();
      sorted.push(val);
    }
    if (heapSave) {
      this._list = tmp;
    }
    return sorted;
  }

  _percolateUp() {
    let index = this._list.length - 1;
    let pIndex = Math.floor((index - 1) / 2);
    while (
      index !== 0 &&
      this._iteratee(this._list[index]) < this._iteratee(this._list[pIndex])
    ) {
      Heap._swap(this._list, index, pIndex);
      index = pIndex;
      pIndex = Math.floor((index - 1) / 2);
    }
  }

  _percolateDown(optIndex = 0) {
    if (this._list.length === 2) {
      if (this._iteratee(this._list[0]) > this._iteratee(this._list[1])) {
        Heap._swap(this._list, 0, 1);
      }
    }

    let index = optIndex;
    while (2 * index + 2 <= this._list.length - 1) {
      const child_left_index = 2 * index + 1;
      const child_right_index = 2 * index + 2;
      const child_left = this._list[child_left_index];
      const child_right = this._list[child_right_index];

      if (
        this._iteratee(this._list[index]) >
        Math.min(this._iteratee(child_left), this._iteratee(child_right))
      ) {
        if (this._iteratee(child_left) < this._iteratee(child_right)) {
          Heap._swap(this._list, index, child_left_index);
          index = child_left_index;
        } else {
          Heap._swap(this._list, index, child_right_index);
          index = child_right_index;
        }
      }
    }
  }

  static _swap(arr, i, j) {
    const tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
  }
}

module.exports.Heap = Heap;
