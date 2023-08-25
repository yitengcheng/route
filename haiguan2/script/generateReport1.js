// 征税
const taxation = async (date, number) => {
  let result = {};
  firstOpen(9);
  // 征税单数
  document.getElementById("P_TAX_QUERY").children[0].click();
  await $timeout(10);
  await $to_frame({
    by: "tag name",
    value: "iframe",
    array: 1,
  });
  await pressSearchDate(date, number === 0);
  await $click({
    by: "id",
    value: "queryBtn",
  });
  await $timeout(5);
  let tmpNode = await $find_elements({ by: "class name", value: "pagination-info", array: 0 });
  result["征税单数"] =
    new DOMParser()
      .parseFromString(tmpNode.outerHTML, "text/html")
      .children[0].innerText.replace(/显示第 1 到第 10 条记录，总共|条记录/gi, "") * 1 || 0;
  tmpNode = await $find_elements({ by: "tag name", value: "tbody", array: 0 });
  tmpNode = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText.split(" ");
  let goods = [];
  let amounts = [];
  let tr = 0;
  for (let index = 0; index < tmpNode.length; index = index + 12) {
    goods.push(tmpNode[5 + tr * 12] * 1 || 0);
    amounts.push(tmpNode[6 + tr * 12] * 1 || 0);
    tr++;
  }
  result["征税金额"] = _.sum(amounts);
  result["征税物品项数"] = _.sum(goods);
  await outIfram();

  // 征税金额
  /*document.getElementById("P_TAX_DIAGRAM").children[0].click();
  await $timeout(10);
  await $to_frame({
    by: "tag name",
    value: "iframe",
    array: 2,
  });
  await pressSearchDate(date, number === 0);
  await $click({
    by: "id",
    value: "diagramBtn",
  });
  await $timeout(10);
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 7 });
  result["征税金额"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  await outIfram();*/
  console.log("--------征税", result);
  return result;
};
// 查验相关统计
const inspection = async (date) => {
  let result = {};
  firstOpen(9);
  // 查验作业单统计
  document.getElementById("P_CHECK_DIAGRAM").children[0].click();
  await $timeout(10);
  await $to_frame({
    by: "tag name",
    value: "iframe",
    array: 3,
  });
  await pressSearchDate(date, false);
  await $click({
    by: "id",
    value: "queryBtn",
  });
  await $timeout(10);
  let tmpNode = await $find_elements({ by: "tag name", value: "td", array: 1 });
  result["进境查验单数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 15 });
  result["进境查验物品数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 2 });
  result["出境查验单数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 16 });
  result["出境查验物品数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 9 });
  result["自愿放弃单数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 23 });
  result["自愿放弃物品数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 5 });
  result["退运单数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 19 });
  result["退运物品数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 4 });
  result["移交缉私单数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 18 });
  result["移交缉私物品数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  await outIfram();
  console.log("-------------查验", result);
  return result;
};

// 仓库（业务展示）
const stockClerk = async (date) => {
  let result = {};
  firstOpen(9);
  document.getElementById("P_STORE_DIAGRAM").children[0].click();
  await $timeout(10);
  await $to_frame({
    by: "tag name",
    value: "iframe",
    array: 4,
  });
  await $send_keys({
    by: "id",
    value: "iStartDate1",
    txt: date.format("YYYY-MM-DD"),
  });
  await $send_keys({
    by: "id",
    value: "iEndDate1",
    txt: date.format("YYYY-MM-DD"),
  });
  await $click({
    by: "id",
    value: "diagramBtn",
  });
  await $timeout(10);
  let tmpNode = await $find_elements({ by: "tag name", value: "td", array: 1 });
  result["入仓单数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 5 });
  result["出仓单数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 11 });
  result["入仓重量"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 13 });
  result["出仓重量"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 31 });
  result["入仓植物数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 33 });
  result["入仓植物数重量"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 37 });
  result["入仓植物产品重量"] =
    new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 23 });
  result["入仓动物数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 25 });
  result["入仓动物重量"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 27 });
  result["入仓动物产品数"] = new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 29 });
  result["入仓动物产品重量"] =
    new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  await outIfram();
  console.log("--------仓库", result);
  return result;
};
// 截留
const interception = async (date) => {
  let result = {};
  firstOpen(9);
  document.getElementById("P_IQ_DIAGRAM2").children[0].click();
  await $timeout(10);
  await $to_frame({
    by: "tag name",
    value: "iframe",
    array: 5,
  });
  await pressSearchDate(date, false);
  await $click({
    by: "id",
    value: "query",
  });
  await $timeout(10);
  let tmpNode = await $find_elements({ by: "tag name", value: "td", array: 22 });
  result["禁止进境物截获批次"] =
    new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  tmpNode = await $find_elements({ by: "tag name", value: "td", array: 46 });
  result["有害生物截获批次"] =
    new DOMParser().parseFromString(tmpNode.outerHTML, "text/html").children[0].innerText * 1;
  await outIfram();
  console.log("----------截留", result);
  return result;
};

// 进境旅客及机组数据
const enterCoutry = async (date, number) => {
  let tmpMenu = await $node({ key: "jinjing", event: "click_input" });
  if (!tmpMenu) {
    let tmp = await $node({ key: "beian", event: "click_input" });
    await $mouse({ action: "scroll", param: { coords: tmp.rectangle.c, wheel_dist: 10 } });
    await $mouse({ action: "scroll", param: { coords: tmp.rectangle.c, wheel_dist: -5 } });
  }

  if (number === 0) {
    // await $groups({ key: "jcheckbox_select" });
    await $node({ key: "daishenghe", event: { action: "select", param: "已通过" } });
  }
  await $node({ key: "dateStart", input: { type: "date_1", value: date.format("YYYY-MM-DD") } });
  await $node({ key: "dateEnd", input: { type: "date_1", value: date.format("YYYY-MM-DD") } });
  await $node({ key: "chaxun", event: "click_input" });
  let pageNumber = await $node({ key: "totalPageNumber" });
  pageNumber = pageNumber.texts.replace(/第1页\/共|页/gi, "");
  let total = new Array(pageNumber).fill("1");
  let tmp = [];
  for (const item of total) {
    let table = await $node({ key: "table" });
    tmp.push(...table);
    await $node({ key: "nextPage", event: "click_input" });
  }
  let result = {};
  let i = 0;
  let j = 0;

  for (const item of tmp) {
    if (item["国际旅客人数"] * 1 > 0) {
      i += item["国际旅客人数"] * 1;
    }
    if (item["机组人数"] * 1 > 0) {
      j += item["机组人数"] * 1;
    }
  }
  result["进境旅客"] = i;
  result["进境机组"] = j;
  return result;
};

// 出境旅客及机组数据
const outCoutry = async (date, number) => {
  let tmpMenu = await $node({ key: "chujing", event: "click_input" });
  if (!tmpMenu) {
    let tmp = await $node({ key: "beian", event: "click_input" });
    await $mouse({ action: "scroll", param: { coords: tmp.rectangle.c, wheel_dist: 10 } });
    await $mouse({ action: "scroll", param: { coords: tmp.rectangle.c, wheel_dist: -5 } });
  }
  if (number === 0) {
    // await $groups({ key: "ccheckbox_select" });
    await $node({ key: "daishenghe", event: { action: "select", param: "已通过" } });
  }

  await $node({ key: "dateStart", input: { type: "date_1", value: date.format("YYYY-MM-DD") } });
  await $node({ key: "dateEnd", input: { type: "date_1", value: date.format("YYYY-MM-DD") } });
  await $node({ key: "chaxun", event: "click_input" });
  let pageNumber = await $node({ key: "totalPageNumber" });
  pageNumber = pageNumber.texts.replace(/第1页\/共|页/gi, "");
  let total = new Array(pageNumber).fill("1");
  let tmp = [];
  for (const item of total) {
    let table = await $node({ key: "table" });
    tmp.push(...table);
    await $node({ key: "nextPage", event: "click_input" });
  }
  let result = {};
  let i = 0;
  let j = 0;

  for (const item of tmp) {
    if (item["国际旅客人数"] * 1 > 0) {
      i += item["国际旅客人数"] * 1;
    }
    if (item["机组人数"] * 1 > 0) {
      j += item["机组人数"] * 1;
    }
  }
  result["出境旅客"] = i;
  result["出境机组"] = j;
  return result;
};

// 抽样及异常抽样
const sampling = async () => {
  document.getElementById("deskmenu").children[13].children[0].click();
  document.getElementById("P_WS_DEAL").children[0].click();
  await $timeout(20);
  await $to_tab({ index: 1 });
  $finish();
};

const report = async () => {
  let searchDates = await $pool.get({
    name: "searchDates",
  });
  let index = 0;
  let data = [];
  for (const searchDate of searchDates) {
    await $pet.talk({ txt: `开始查询${dayjs(searchDate).format("YYYY年MM月DD日")}征税数据` });
    let taxat = await taxation(dayjs(searchDate), index);
    await $pet.talk({ txt: `结束征税数据查询` });

    await $pet.talk({ txt: `开始查询${dayjs(searchDate).format("YYYY年MM月DD日")}查验数据` });
    let check = await inspection(dayjs(searchDate));
    await $pet.talk({ txt: `结束查验数据查询` });

    await $pet.talk({ txt: `开始查询${dayjs(searchDate).format("YYYY年MM月DD日")}仓库数据` });
    let stock = await stockClerk(dayjs(searchDate));
    await $pet.talk({ txt: `结束仓库数据查询` });

    await $pet.talk({ txt: `开始查询${dayjs(searchDate).format("YYYY年MM月DD日")}截留数据` });
    let intercep = await interception(dayjs(searchDate));
    await $pet.talk({ txt: `结束截留数据查询` });

    await $pet.talk({ txt: `开始查询${dayjs(searchDate).format("YYYY年MM月DD日")}进境旅客及机组数据` });
    let enter = await enterCoutry(dayjs(searchDate), index);
    await $pet.talk({ txt: `结束进境旅客及机组数据查询` });

    await $pet.talk({ txt: `开始查询${dayjs(searchDate).format("YYYY年MM月DD日")}出境旅客及机组数据` });
    let out = await outCoutry(dayjs(searchDate), index);
    await $pet.talk({ txt: `结束出境旅客及机组数据查询` });
    data.push({
      时间: dayjs(searchDate).format("YYYY年MM月DD日"),
      ...taxat,
      ...check,
      ...stock,
      ...intercep,
      ...enter,
      ...out,
    });
    index++;
  }
  await $pool.set({ name: "data", value: data });
  await sampling();
};

// 输入查询时间至点击查询（web业务展示）
const pressSearchDate = async (date, label) => {
  let tmpNode = await $find_elements({ by: "id", value: "startDate1", script: "$dom.readonly = false" });
  tmpNode = await $find_elements({ by: "id", value: "endDate1", script: "$dom.readonly = false" });
  tmpNode = await $find_elements({
    by: "id",
    value: "startDate1",
    script: `$dom.value = "${date.format("YYYY-MM-DD")}"`,
  });
  tmpNode = await $find_elements({
    by: "id",
    value: "endDate1",
    script: `$dom.value = "${date.format("YYYY-MM-DD")}"`,
  });
  if (label) {
    await $click({
      by: "id",
      value: "switch2",
    });
  }
};

// 判断一级目录是否打开
const firstOpen = (index) => {
  // 判断一级目录是否处于展开状态
  if (document.getElementById("deskmenu").children[index].className !== "active") {
    document.getElementById("deskmenu").children[index].children[0].click();
  }
};

const outIfram = async () => {
  await $to_default_content();
};

const main = async () => {
  await report();
};

main();
