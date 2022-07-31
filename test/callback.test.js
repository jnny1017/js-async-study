const fs = require("fs");

describe("Callback - fs.readFile를 콜백 패턴만 사용", () => {
  test("assets/first.json을 불러오기", (done) => {
    fs.readFile("assets/first.json", (err, data) => {
        if (err) {
            done(err);
            return;
        }

        const first = JSON.parse(data);

        expect(first.hi).toBe("방가방가");

        done();
    });
  });

  test("assets/first.json에서 불러온 second_key를 이용해 second.json에서 key에 일치하는 오브젝트 찾기", (done) => {
      fs.readFile("assets/first.json", (err, data) => {
        if (err) {
            done(err);
            return;
        }

        const firstData = JSON.parse(data);
        const secondKey = firstData.second_key; // first.json에서 불러온 second_key (1)

        fs.readFile("assets/second.json", (err, data) => {
            if (err) {
                done(err);
                return;
            }

            const secondData = JSON.parse(data); // second.json
            const result = secondData.find((item) => item.key === secondKey);

            expect(result.hi).toBe("Second 방가방가");

            done();
        });
    });
});

  test("assets/second.json에서 불러온 third_key를 이용해 third.json에서 key에 일치하는 오브젝트 찾기", (done) => {
      fs.readFile("assets/first.json", (err, data) => {
        if (err) {
            done(err);
            return;
        }

        const firstData = JSON.parse(data);
        const secondKey = firstData.second_key; // first.json에서 불러온 second_key (1)

        fs.readFile("assets/second.json", (err, data) => {
            if (err) {
                done(err);
                return;
            }

            const secondData = JSON.parse(data); // second.json
            const secondResult = secondData.filter((item) => item.key === secondKey);

            expect(secondResult[0].hi).toBe("Second 방가방가");

            done();

            fs.readFile("assets/third.json", (err, data) => {
                if (err) {
                    done(err);
                    return;
                }

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
