const { readFile } = require("../src/readFile");

describe("async/await - readFile함수를 async/await 만 사용하여 테스트 통과하기", () => {
    test("assets/first.json을 불러오기", async function () {
        const data = await readFile("assets/first.json");

        const first = JSON.parse(data);

        expect(first.hi).toBe("방가방가");
    });

    test("assets/first.json에서 불러온 second_key를 이용해 second.json에서 key에 일치하는 오브젝트 찾기",  async function () {
        const [data, data2] = await Promise.all([readFile("assets/first.json"), readFile("assets/second.json")]);

        // first
        const firstData = JSON.parse(data);
        const secondKey = firstData.second_key; // first.json에서 불러온 second_key (1)

        // second
        const secondData = JSON.parse(data2);

        const result = secondData.find((item) => item.key === secondKey);

        expect(result.hi).toBe("Second 방가방가");
    });

    test("assets/second.json에서 불러온 third_key를 이용해 third.json에서 key에 일치하는 오브젝트 찾기", async function () {
        const [data, data2, data3] = await Promise.all([readFile("assets/first.json"), readFile("assets/second.json"), readFile("assets/third.json")]);

        // first
        const firstData = JSON.parse(data);
        const secondKey = firstData.second_key; // first.json에서 불러온 second_key (1)

        // second
        const secondData = JSON.parse(data2);
        const secondResult = secondData.find((item) => item.key === secondKey);

        // third
        const thirdData = JSON.parse(data3);
        const thirdKey = secondResult.third_key // second.json에서 불러온 third_key

        const thirdResult = thirdData.find((item) => item.key === thirdKey);

        expect(thirdResult.hi).toBe("Third 방가방가");
    });
});
