const { readFile } = require("../src/readFile");

describe("Promise - fs.readFile를 프로미스 패턴만 사용", () => {
    test("fs.readFile을 이용해 Promise를 반환하는 readFile 함수 만들기", (done) => {
        const promise = readFile("assets/first.json");

        expect(promise instanceof Promise).toBe(true);

        done();
    });

    test("assets/first.json을 불러오기", (done) => {
        readFile("assets/first.json").then((data) => {
            const first = JSON.parse(data);

            expect(first.hi).toBe("방가방가");

            done();
        });
    });

    test("assets/first.json에서 불러온 second_key를 이용해 second.json에서 key에 일치하는 오브젝트 찾기", (done) => {
        readFile("assets/first.json").then((data) => {
            const firstData = JSON.parse(data);
            const secondKey = firstData.second_key; // first.json에서 불러온 second_key (1)

            readFile("assets/second.json").then((data) => {
                const secondData = JSON.parse(data); // second.json
                const secondResult = secondData.filter((item) => item.key === secondKey);

                expect(secondResult[0].hi).toBe("Second 방가방가");

                done();
            });
        });
    });

    test("assets/second.json에서 불러온 third_key를 이용해 third.json에서 key에 일치하는 오브젝트 찾기", (done) => {
        readFile("assets/first.json").then((data) => {
            const firstData = JSON.parse(data);
            const secondKey = firstData.second_key; // first.json에서 불러온 second_key (1)

            readFile("assets/second.json").then((data) => {
                const secondData = JSON.parse(data); // second.json
                const secondResult = secondData.filter((item) => item.key === secondKey);

                readFile("assets/third.json").then((data) => {
                    const thirdData = JSON.parse(data);
                    const thirdKey = secondResult[0].third_key // second.json에서 불러온 third_key
                    const thirdResult = thirdData.filter((item) => item.key === thirdKey);

                    expect(thirdResult[0].hi).toBe("Third 방가방가");

                    done();
                });
            });
        });
    });
});
