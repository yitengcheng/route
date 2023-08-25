// 抽样及异常抽样
const sampling = async (date, number) => {
  await $set_focus();
  let result = {};
  document.getElementsByClassName("el-submenu")[10].children[0].click();

  await $timeout(0.5);

  document.getElementsByClassName("el-submenu")[10].children[1].children[0].click();
  await $timeout(5);
  document.getElementsByClassName("el-input__inner")[4].value = date.format("YYYY-MM-DD HH:mm:ss");
  document.getElementsByClassName("el-input__inner")[5].value = date.format("YYYY-MM-DD HH:mm:ss");
  document.getElementsByTagName("button")[0].click();
  await $timeout(10);
  let chouyang = 0;
  let yichang = 0;
  while (document.getElementsByTagName("button")[7].disabled) {
    let tbody = document.getElementsByTagName("tbody")[0]?.children ?? [];
    for (const tr of tbody) {
      if (tr.children[26].children[0].innerHTML) {
        chouyang++;
      }
      if (tr.children[27].children[0].innerHTML) {
        yichang++;
      }
    }
  }
  result["抽样数"] = chouyang;
  result["异常抽样数"] = yichang;

  console.log("----------抽样", result);
  return result;
};

const report = async () => {
  let searchDates = await $pool.get({
    name: "searchDates",
  });
  let index = 0;
  let data = [];
  for (const searchDate of searchDates) {
    await $pet.talk({ txt: `开始查询${dayjs(searchDate).format("YYYY年MM月DD日")}抽样数据` });
    let sample = await sampling(dayjs(searchDate), index);
    await $pet.talk({ txt: `结束抽样数据查询` });
    data.push({
      ...sample,
    });
    index++;
  }
  await $pet.talk({ txt: `数据查询完成，等待报告生成` });
  let otherData = await $pool.get({
    name: "data",
  });
  let excelData = [];
  for (let j = 0; j < otherData.length; j++) {
    let element = otherData[j];
    excelData.push({ ...element, ...data[j] });
  }
  let templatePath = "C:/数据查询/模板/模板.xlsx";
  let savePath = `C:/数据查询/dist/${dayjs(searchDates[0]).format("YYYY年MM月DD日")}至${dayjs(
    searchDates[searchDates.length - 1]
  ).format("YYYY年MM月DD日")}数据汇总.xlsx`;
  await $excel.read_excel({
    file: templatePath,
    header: 2,
  });
  await $excel.twrite({
    value: excelData,
  });
  await $excel.save({
    file: savePath,
  });
  await $pet.talk({ txt: `报告生成完毕` });
  $finish();
};

const main = async () => {
  await report();
};

main();
