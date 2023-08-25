const main = async () => {
  await $wait({ condition: 5, by: "name", value: "logo" });
  const obj = await window.py("view.values");
  const { excelPath, sheet } = obj;
  // 判断是否处于数据建模页面
  let flagLi = document.getElementsByTagName("li")?.[7];
  if (flagLi?.className !== "ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-open") {
    await $click({ by: "tag name", value: "li", array: 7 });
    await $timeout(3);
    await $click({ by: "tag name", value: "li", array: 8 });
  }
  // 点击新增表
  document.getElementsByClassName("ant-btn ant-btn-primary")[3].click();
  let tableName = excelPath[0];
  let nameIndex = tableName.lastIndexOf("/");
  tableName = tableName.substring(nameIndex + 1);
  // 填写表信息
  let { pinyin } = pinyinPro;
  let tmp = pinyin(tableName.replace(".xlsx", ""), {
    pattern: "initial",
    type: "array",
  });
  let reg = /[\t\r\f\n\s()、（）/]*/g;
  await $send_keys({
    by: "id",
    value: "tableName",
    txt: tmp.join("").replace(reg, ""),
  });
  await $send_keys({
    by: "id",
    value: "tableTxt",
    txt: tableName.replace(".xlsx", ""),
  });
  // 新增字段
  await $excel.read_excel({
    file: excelPath[0]?.trim(),
    sheet: sheet?.label,
  });
  let keyWords = ["序号"];
  let tableLabel = await $excel.finds({ values: keyWords });
  for (const label of tableLabel) {
    if (label) {
      document.getElementsByTagName("button")?.[23]?.click();
      tmp = pinyin(label, { pattern: "initial", type: "array" });
      let inputNode = await $find_elements({
        by: "tag name",
        value: "input",
      });
      for (const input of inputNode.reverse()) {
        let tmpNode = new DOMParser().parseFromString(input.html, "text/html");
        let placeholder = tmpNode?.children[0]?.children[1]?.children[0]?.placeholder;
        if (placeholder === "请输入字段长度") {
          await $send_keys({
            element: input.el,
            txt: "500",
          });
        }
        if (placeholder === "请输入字段备注") {
          await $send_keys({
            element: input.el,
            txt: label,
          });
        }
        if (placeholder === "请输入字段名称") {
          await $send_keys({
            element: input.el,
            txt: tmp.join("").replace(reg, ""),
          });
          break;
        }
      }
    }
  }
  // 填写字段信息
  // let tbody = document.getElementsByClassName("tbody")[0].children[1].children;
  // let labelIndex = 0;
  // for (let index = 0; index < tbody.length; index++) {
  //   const tr = tbody[index];
  //   if (index >= 7) {
  //     tmp = pinyin(tableLabel[labelIndex], { toneType: "none", type: "array" });
  //     tr.children[3].children[0].children[0].value = tmp.join("").replace(reg, "");
  //     tr.children[4].children[0].children[0].value = tableLabel[labelIndex];
  //     tr.children[5].children[0].children[0].value = 500; // 字段长度
  //     labelIndex++;
  //   }
  // }

  // 点击确定
  document
    .getElementsByClassName("ant-btn ant-btn-primary")
    [document.getElementsByClassName("ant-btn ant-btn-primary").length - 1].click();
  $finish();
};

main();
