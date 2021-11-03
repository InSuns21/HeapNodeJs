const { Heap } = require("../Heap");

describe("Heapのテスト", () => {
  describe("数値", () => {
    it("insert", () => {
      const arr = [3, 1, 88, 15, 2, 61, 17, 2, 2, 18, 21];
      const heap = new Heap(arr);
      heap.insert(100);
      expect(heap.getHeapList()).toEqual([
        1, 2, 17, 2, 3, 88, 61, 15, 2, 18, 21, 100,
      ]);
    });

    it("popMin", () => {
      const arr = [3, 1, 88, 15, 2, 61, 17, 2, 2, 18, 21, 100];
      const heap = new Heap(arr);
      {
        const min = heap.popMin();
        expect(min).toEqual(1);
        expect(heap.getHeapList()).toEqual([
          2, 2, 17, 2, 3, 88, 61, 15, 100, 18, 21,
        ]);
      }

      {
        const min = heap.popMin();
        expect(min).toEqual(2);
        expect(heap.getHeapList()).toEqual([
          2, 2, 17, 15, 3, 88, 61, 21, 100, 18,
        ]);
      }
    });

    it("sort", () => {
      const arr = [3, 1, 88, 15, 2, 61, 17, 2, 2, 18, 21];
      const heap = new Heap(arr);
      const sorted = heap.sort();
      expect(sorted).toEqual([1, 2, 2, 2, 3, 15, 17, 18, 21, 61, 88]);
    });
  });

  describe("オブジェクト", () => {
    let arr;
    beforeEach(() => {
      arr = [
        { num: 1, name: "AAA" },
        { num: 2, name: "BBB" },
        { num: 17, name: "CCC" },
        { num: 2, name: "DDD" },
        { num: 3, name: "EEE" },
        { num: 88, name: "FFF" },
        { num: 61, name: "GGG" },
        { num: 15, name: "HHH" },
        { num: 2, name: "III" },
        { num: 18, name: "JJJ" },
        { num: 21, name: "KKK" },
      ];
    });

    it("insert", () => {
      const heap = new Heap(arr, (obj) => {
        return obj.num;
      });
      heap.insert({ num: 100, name: "LLL" });
      expect(heap.getHeapList()).toEqual([
        { num: 1, name: "AAA" },
        { num: 2, name: "BBB" },
        { num: 17, name: "CCC" },
        { num: 2, name: "DDD" },
        { num: 3, name: "EEE" },
        { num: 88, name: "FFF" },
        { num: 61, name: "GGG" },
        { num: 15, name: "HHH" },
        { num: 2, name: "III" },
        { num: 18, name: "JJJ" },
        { num: 21, name: "KKK" },
        { num: 100, name: "LLL" },
      ]);
    });

    it("popMin", () => {
      const heap = new Heap(arr, (obj) => {
        return obj.num;
      });
      {
        const min = heap.popMin();
        expect(min).toEqual({
          num: 1,
          name: "AAA",
        });
        expect(heap.getHeapList()).toEqual([
          { num: 2, name: "BBB" },
          { num: 2, name: "DDD" },
          { num: 17, name: "CCC" },
          { num: 2, name: "III" },
          { num: 3, name: "EEE" },
          { num: 88, name: "FFF" },
          { num: 61, name: "GGG" },
          { num: 15, name: "HHH" },
          { num: 21, name: "KKK" },
          { num: 18, name: "JJJ" },
        ]);
      }

      {
        const min = heap.popMin();
        expect(min).toEqual({
          num: 2,
          name: "BBB",
        });
        expect(heap.getHeapList()).toEqual([
          { num: 2, name: "DDD" },
          { num: 2, name: "III" },
          { num: 17, name: "CCC" },
          { num: 15, name: "HHH" },
          { num: 3, name: "EEE" },
          { num: 88, name: "FFF" },
          { num: 61, name: "GGG" },
          { num: 18, name: "JJJ" },
          { num: 21, name: "KKK" },
        ]);
      }
    });

    it("sort", () => {
      const heap = new Heap(arr, (obj) => {
        return obj.num;
      });
      const sorted = heap.sort();
      expect(sorted).toEqual([
        { num: 1, name: "AAA" },
        { num: 2, name: "BBB" },
        { num: 2, name: "DDD" },
        { num: 2, name: "III" },
        { num: 3, name: "EEE" },
        { num: 15, name: "HHH" },
        { num: 17, name: "CCC" },
        { num: 18, name: "JJJ" },
        { num: 21, name: "KKK" },
        { num: 61, name: "GGG" },
        { num: 88, name: "FFF" },
      ]);
    });
  });
});
