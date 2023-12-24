const report = async () => {
  // 开始
  await $pet.talk({ txt: `开始工作`, timeout: 20 });
  // 点击菜单
  await clickCheckMenu();
  await clickZhuanguanMenu();
  await clickFengfaMenu();

  // 输入查询时间

  const obj = await window.py("view.values");
  const { searchTime } = obj;
  let searchDates = [dayjs(searchTime[0])];
  let i = 1;
  while (dayjs(searchTime[0]).add(i, "day").isBefore(dayjs(searchTime[1]))) {
    searchDates.push(dayjs(searchTime[0]).add(i, "day"));
    i++;
  }
  for (const searchDate of searchDates) {
    // 邮件详情
    await clickCheckMenu();
    await enterSearchTime(searchDate, 1, 3, 4, 0);
    let iframePost = document.getElementsByTagName("iframe")[1];
    let flag = iframePost.contentWindow.document.getElementsByClassName("mini-tools-close")?.[2];
    let results = [];
    let finallyMainNumber = [];
    if (flag) {
      flag.click();
      await $to_default_content();
    } else {
      let totalPage = await $find_elements({ by: "class name", value: "mini-pager-right", array: 0 });
      totalPage = totalPage.html.innerText.replace(/每页 100 条, 共|条/gi, "") * 1;
      let total = new Array(Math.ceil(totalPage / 100)).fill("1");
      for (const page of total) {
        let iframe = document.getElementsByTagName("iframe")[1];
        let parcelNumberList = iframe.contentWindow.document.getElementsByClassName("mini-grid-row");
        for (const parcelNumber of parcelNumberList) {
          parcelNumber.getElementsByTagName("a")[1].click();
          await $to_default_content();
          await $timeout(5);
          await $to_frame({
            by: "tag name",
            value: "iframe",
            array: 4,
          });
          let tbodyNode = await $find_elements({ by: "tag name", value: "tbody", arrary: 2 });
          let index = 0;

          let tmp = new DOMParser().parseFromString(tbodyNode[2].html, "text/html");
          tmp = tmp.children[0].children[1].children;
          results.push({
            邮件号: tmp[0].title,
            邮件主管海关: tmp[1].title,
            创建日期: tmp[2].title,
            进出境标志: tmp[3].title,
            国别: tmp[4].title,
            进出境日期: tmp[5].title,
            申报类别: tmp[6].title,
            邮件种类: tmp[7].title,
            验放指令: tmp[8].title,
            原寄局: tmp[9].title,
            寄达局: tmp[10].title,
            特殊邮件标志: tmp[11].title,
            寄件人姓名: tmp[12].title,
            寄件人电话: tmp[13].title,
            寄件人地址: tmp[14].title,
            寄件人企业: tmp[15].title,
            寄件人证件类型: tmp[16].title,
            寄件人证件号: tmp[17].title,
            收件人姓名: tmp[18].title,
            收件人电话: tmp[19].title,
            收件人地址: tmp[20].title,
            收件人企业: tmp[21].title,
            收件人证件类型: tmp[22].title,
            收件人证件号: tmp[23].title,
            "申报总价(外币)": tmp[24].title,
            申报币制: tmp[25].title,
            申报人民币价值: tmp[26].title,
            税单号: tmp[27].title,
            完税价格: tmp[28].title,
            税额: tmp[29].title,
            邮资: tmp[30].title,
            邮资币制: tmp[31].title,
            件数: tmp[32].title,
            申报单位名称: tmp[33].title,
            申报单位代码: tmp[34].title,
            邮件总重量: tmp[35].title,
            主要物品名称: tmp[36].title,
            处置要求: tmp[37].title,
            申报来源: tmp[38].title,
          });
          await $to_default_content();
          await $click({ by: "id", value: "3" });
          await $to_frame({
            by: "tag name",
            value: "iframe",
            array: 1,
          });
        }
        await $click({ by: "id", value: "mini-55" });
        await $timeout(5);
      }
    }

    // 总包号
    await $to_default_content();
    await clickZhuanguanMenu();
    await enterSearchTime(searchDate, 2, 6, 7, 10);
    totalPage = await $find_elements({ by: "class name", value: "mini-pager-right", array: 2 });
    totalPage = totalPage.html.innerText.replace(/每页 100 条, 共|条/gi, "") * 1;
    total = new Array(Math.ceil(totalPage / 100)).fill("1");
    let mainNumberList = [];
    for (const page of total) {
      let iframe = document.getElementsByTagName("iframe")[2];
      let parcelNumberList = iframe.contentWindow.document.getElementsByClassName("mini-grid-row");
      let tmpIndex = 0;
      for (const parcelNumber of parcelNumberList) {
        if (tmpIndex > 19) {
          let tmp = parcelNumber.getElementsByTagName("a")[0].innerText;
          mainNumberList.push(tmp.substring(7, 37));
        }
        tmpIndex++;
      }
      await $click({ by: "id", value: "mini-69" });
      await $timeout(5);
    }
    await $to_default_content();

    await clickFengfaMenu();
    await $timeout(1);

    for (let mainNumber of mainNumberList) {
      // 封发列表
      await $to_frame({
        by: "tag name",
        value: "iframe",
        array: 3,
      });
      let iframe = document.getElementsByTagName("iframe")[3];
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
        txt: mainNumber,
      });
      iframe.contentWindow.document.getElementsByClassName("mini-button-plain")[0].click();
      await $timeout(3);
      // 点击查看封发详情
      let fengfa = iframe.contentWindow.document.getElementsByClassName("mini-grid-row")[0];

      if (fengfa) {
        fengfa.getElementsByTagName("a")[0].click();
        await $timeout(5);
        await $to_default_content();
        // 封发详情
        await $to_frame({
          by: "tag name",
          value: "iframe",
          array: 4,
        });
        totalPage = await $find_elements({ by: "class name", value: "mini-pager-right", array: 0 });
        totalPage = totalPage.html.innerText.replace(/每页 100 条, 共|条/gi, "") * 1;
        total = new Array(Math.ceil(totalPage / 100)).fill("1");

        for (const page of total) {
          let iframe = document.getElementsByTagName("iframe")[4];
          let parcelNumberList = iframe.contentWindow.document.getElementsByClassName("mini-grid-row");
          for (const parcelNumber of parcelNumberList) {
            let tmp = parcelNumber.getElementsByTagName("a")[0].innerText;
            finallyMainNumber.push({ 总包号: mainNumber, 邮件号: tmp });
          }
          await $click({ by: "id", value: "mini-18" });
          await $timeout(5);
        }
      }
      await $to_default_content();
      await $click({
        by: "id",
        value: "3",
      });
    }
    await $to_default_content();
    let templatePath = "C:/一局四中心邮递物品/模板/邮件数据采集模板.xlsx";
    let savePath = `D:/历史数据/dist/${dayjs(searchDate).format("YYYYMMDD")}/邮件详情/${dayjs(searchDate).format(
      "00时00分00秒"
    )}至${dayjs(searchDate).format("23时59分59秒")}.xlsx`;
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
    templatePath = "C:/一局四中心邮递物品/模板/总包号与邮件号.xlsx";
    savePath = `D:/历史数据/dist/${dayjs(searchDate).format("YYYYMMDD")}/总包号/${dayjs(searchDate).format(
      "00时00分00秒"
    )}至${dayjs(searchDate).format("23时59分59秒")}.xlsx`;
    await $excel.read_excel({
      file: templatePath,
      header: 1,
    });
    await $excel.twrite({
      value: finallyMainNumber,
    });
    await $excel.save({
      file: savePath,
    });
  }
  await $pet.talk({ txt: `工作结束`, timeout: 20 });
  $finish();
};

// 点击菜单
const clickCheckMenu = async () => {
  document.getElementsByTagName("a")[7].click();
  await $timeout(3);
};
const clickZhuanguanMenu = async () => {
  document.getElementsByTagName("a")[188].click();
  await $timeout(3);
};
const clickFengfaMenu = async () => {
  document.getElementsByTagName("a")[129].click();
  await $timeout(3);
};
// 输入查询时间
const enterSearchTime = async (searchTime, iframeIndex, dayStartIndex, dayEndIndex, confirmIndex) => {
  await $to_frame({
    by: "tag name",
    value: "iframe",
    array: iframeIndex,
  });
  await $click({
    by: "class name",
    value: "mini-buttonedit-input",
    array: dayStartIndex,
  });
  await $timeout(1);
  await $send_keys({
    by: "class name",
    value: "mini-buttonedit-input",
    array: dayStartIndex,
    txt: dayjs(searchTime).format("YYYY-MM-DD 00:00:00"),
  });
  await $click({
    by: "class name",
    value: "mini-buttonedit-input",
    array: dayEndIndex,
  });
  await $timeout(1);
  await $send_keys({
    by: "class name",
    value: "mini-buttonedit-input",
    array: dayEndIndex,
    txt: dayjs(searchTime).format("YYYY-MM-DD 23:59:59"),
  });
  await $click({
    by: "class name",
    value: "mini-button-plain",
    array: confirmIndex,
  });
  await $timeout(5);
};

const main = async () => {
  await report();
  $finish();
};

main();
