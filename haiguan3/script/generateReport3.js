const report = async () => {
  await $to_frame({
    by: "id",
    value: "main",
  });
  await $click({ by: "id", value: "ext-gen25" });
  await $timeout(10);
  await $send_keys({ by: "id", value: "ext-gen323", txt: "xiaowenfeng@gy.intra.customs.gov.cn" });
  const obj = await window.py("view.values");
  const { searchTime } = obj;
  await $send_keys({
    by: "id",
    value: "ext-gen501",
    txt: `${dayjs(searchTime[0]).format("YYYY年MM月DD日")}至${dayjs(searchTime[1]).format(
      "YYYY年MM月DD日"
    )}重复旅客信息`,
  });
  await $upload_file({
    name: "upfile",
    file: `C:\\重复旅客生成\\dist\\${new Date().getFullYear()}年${
      new Date().getMonth() + 1
    }月${new Date().getDate()}日.xlsx`,
  });
  await $click({ by: "id", value: "ext-gen482" });

  await $pet.talk({ txt: `工作完成，下班咯！`, timeout: 20 });
};

const main = async () => {
  await report();
  $finish();
};

main();
