const report = async () => {
  await $pet.talk({ txt: `开始工作，生成重复旅客报告` ,timeout:20});
  await $to_frame({
    by: "tag name",
    value: "iframe",
    array: 1,
  });
  await $to_frame({
    by: "tag name",
    value: "iframe",
    array: 0,
  });
  await $to_frame({
    by: "tag name",
    value: "iframe",
    array: 1,
  });
  let totalPage = await $find_elements({ by: "tag name", value: "span", array: 39 });
  totalPage = new DOMParser().parseFromString(totalPage.outerHTML, "text/html");
  totalPage = totalPage.children[0].innerText.replace(/共|页/gi, "") * 1;
  // totalPage = totalPage.outerHTML.innerText.replace(/共|页/gi, "") * 1;
  let passengerDatas = [];
  let total = new Array(totalPage).fill("1");
  for (const page of total) {
    let trPyton = await $find_elements({ by: "tag name", value: "tbody", array: 4 });
    console.log("----------", trPyton.outerHTML);
    let trNode = new DOMParser().parseFromString(trPyton.outerHTML, "text/html");
    // let trNode = trPyton.outerHTML.children;
    let tr = 0;
    for (let index = 0; index < trNode.children[0].children[1].children.length; index = index + 9) {
      passengerDatas.push({
        姓名: trNode.children[0].children[1].children[1 + tr * 9].innerText,
        证件号: trNode.children[0].children[1].children[4 + tr * 9].innerText,
        航班: trNode.children[0].children[1].children[5 + tr * 9].innerText,
      });
      tr++;
    }
    // console.log("------trNode", trNode);
    // for (const tr of trNode) {
    //   passengerDatas.push({
    //     姓名: tr.children[1].innerText,
    //     证件号: tr.children[4].innerText,
    //     航班: tr.children[5].innerText,
    //   });
    // }
    await $click({ by: "tag name", value: "span", array: 42 });
    await $timeout(5);
  }
  let groups = _.groupBy(passengerDatas, (n) => {
    return n["证件号"];
  });
  let result = _.uniq(
    _.flatten(
      _.filter(groups, (n) => {
        return n.length > 1;
      })
    )
  );
  let templatePath = "C:/重复旅客生成/模板/模板.xlsx";
  let savePath = `C:/重复旅客生成/dist/${new Date().getFullYear()}年${
    new Date().getMonth() + 1
  }月${new Date().getDate()}日.xlsx`;
  await window.py("excel.read_excel", {
    file: templatePath,
    header: 2,
  });
  await window.py("excel.twrite", {
    value: result,
  });
  await window.py("excel.save", {
    file: savePath,
  });
  await $pet.talk({ txt: `工作结束啦 ` });
};

const main = async () => {
  await report();
  $finish();
};

main();
