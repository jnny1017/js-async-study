const fs = require("fs");
const { readFile } = require("../src/readFile");

describe("async/await - readFile함수를 async/await 만 사용하여 테스트 통과하기", () => {
    test("assets/first.json을 불러오기", async function () {
        const data = await readFile("assets/first.json");

        const first = JSON.parse(data);

        expect(first.hi).toContain("방가방가");
    });

    test("assets/first.json에서 불러온 second_key를 이용해 second.json에서 key에 일치하는 오브젝트 찾기",  async function () {
        // first
        const data = await readFile("assets/first.json");
        const firstData = JSON.parse(data);
        const secondKey = firstData.second_key; // first.json에서 불러온 second_key (1)

        // second
        const data2 = await readFile("assets/second.json");
        const secondData = JSON.parse(data2);

        const result = secondData.filter((item) => item.key === secondKey);

        expect(result[0].hi).toBe("Second 방가방가");
    });

  test("assets/second.json에서 불러온 third_key를 이용해 third.json에서 key에 일치하는 오브젝트 찾기", async function () {
    // first
    const data = await readFile("assets/first.json");
    const firstData = JSON.parse(data);
    const secondKey = firstData.second_key; // first.json에서 불러온 second_key (1)

    // second
    const data2 = await readFile("assets/second.json");
    const secondData = JSON.parse(data2);
    const secondResult = secondData.filter((item) => item.key === secondKey);

    // third
    const data3 = await readFile("assets/third.json");
    const thirdData = JSON.parse(data3);
    const thirdKey = secondResult[0].third_key // second.json에서 불러온 third_key
    const thirdResult = thirdData.filter((item) => item.key === thirdKey);

    expect(thirdResult[0].hi).toBe("Third 방가방가");
  });
});
