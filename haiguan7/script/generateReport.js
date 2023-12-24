const report = async (path, file) => {
  // 开始
  await $pet.talk({ txt: `开始工作`, timeout: 20 });
  // 点击菜单
  await clickCheckMenu();
  // 读取excel
  await $excel.read_excel({ file: `${path}/${file.file}` });
  let inExcel = await $excel.table({ header: 1 });
  inExcel = _.map(inExcel, "mailnumber");
  let results = [];
  for (const mailnumber of inExcel) {
    await enterSearchConditions(mailnumber, 1, 0);
    let iframePost = document.getElementsByTagName("iframe")[1];
    let flag = iframePost.contentWindow.document.getElementsByClassName("mini-tools-close")?.[2];
    if (flag) {
      flag.click();
      await $to_default_content();
    } else {
      let iframe = document.getElementsByTagName("iframe")[1];
      let parcelNumberList = iframe.contentWindow.document.getElementsByClassName("mini-grid-row");
      results.push({ mailnumber, instruct: parcelNumberList[0].getElementsByTagName("div")[3].innerHTML });
    }
  }
  await $to_default_content();
  let templatePath = "C:/一局四中心邮递物品/模板/out_number.xlsx";
  let savePath = `C:/一局四中心邮递物品/dist/out/${dayjs().format("YYYYMMDD")}/${file.file}`;
  await $excel.read_excel({
    file: templatePath,
    header: 1,
  });
  await $excel.twrite({
    value: results,
  });
  await $excel.save({
    file: savePath,
  });
  await $pool.set({ name: "currentfile", value: file.file });
  await $pet.talk({ txt: `工作结束`, timeout: 20 });
  await $refresh();
  return;
};

// 点击菜单
const clickCheckMenu = async () => {
  document.getElementsByTagName("a")?.[7]?.click();
  await $timeout(3);
};
// 输入查询条件
const enterSearchConditions = async (mailNumber, iframeIndex, confirmIndex) => {
  await $to_frame({
    by: "tag name",
    value: "iframe",
    array: iframeIndex,
  });
  await $click({
    by: "class name",
    value: "mini-textbox-input",
    array: 0,
  });
  await $timeout(1);
  await $send_keys({
    by: "class name",
    value: "mini-textbox-input",
    array: 0,
    txt: mailNumber,
  });

  await $click({
    by: "class name",
    value: "mini-button-plain",
    array: confirmIndex,
  });
  await $timeout(3);
  await $to_default_content();
};

const main = async () => {
  let currentfile = await $pool.get({ name: "currentfile" });
  let filePath = `C:/一局四中心邮递物品/dist/in/${dayjs().format("YYYYMMDD")}`;
  let fileInfos = await $sys.file_info({ path: filePath });
  if (fileInfos.length > 0) {
    fileInfos = _.orderBy(
      fileInfos,
      (o) => {
        return new Date(o.ctime);
      },
      "desc"
    );
    if (fileInfos?.[0].file !== currentfile) {
      await report(filePath, fileInfos?.[0]);
    }
  }
  if (dayjs().format("mm:ss") == "00:00" || dayjs().format("mm:ss") == "30:00") {
    await $refresh();
  }

  $finish();
};

main();
