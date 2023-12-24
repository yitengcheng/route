const report = async (path, file) => {
  // 开始
  await $pet.talk({ txt: `开始工作`, timeout: 20 });
  // 读取excel
  await $excel.read_excel({ file: `${path}/${file.file}` });
  let inExcel = await $excel.table({ header: 1 });
  inExcel = _.map(inExcel, "报关单号");
  let orderDetailList = [];
  let goodDetailList = [];
  let processRecordList = [];
  let delList = new Array(18).fill("1");
  for (const orderNumber of inExcel) {
    // 进入搜索iframe
    await $to_frame({
      by: "tag name",
      value: "iframe",
      array: 0,
    });
    for (const del of delList) {
      await $send_keys({
        by: "id",
        value: "entryId",
        keys: "BACKSPACE",
      });
    }
    // 输入单号
    await $send_keys({
      by: "id",
      value: "entryId",
      txt: orderNumber,
    });

    // 点击查询
    await $click({
      by: "tag name",
      value: "button",
      array: 0,
    });
    await $timeout(1);
    let flag = await $find_elements({ by: "class name", value: "el-icon-error" });
    if (flag) {
      continue;
    }
    // 进入报关单详情iframe
    await $to_frame({
      by: "tag name",
      value: "iframe",
      array: 0,
    });
    await $wait({
      condition: 6,
      by: "xpath",
      value: "/html/body/div/div/div/div/div/div[1]/div[1]/div[2]/div",
      text: orderNumber,
    });
    // 报关单详情

    let orderDetailNode = await $find_elements({ by: "class name", value: "info-content" });
    let orderDetail1Node = await $find_elements({ by: "class name", value: "grid-content" });

    orderDetailList.push({
      报关单号: new DOMParser().parseFromString(orderDetailNode[0].html, "text/html").children[0].innerText,
      统一编号: new DOMParser().parseFromString(orderDetailNode[1].html, "text/html").children[0].innerText,
      报关单类型: new DOMParser().parseFromString(orderDetailNode[2].html, "text/html").children[0].innerText,
      进出口标记: new DOMParser().parseFromString(orderDetailNode[3].html, "text/html").children[0].innerText,
      合同协议: new DOMParser().parseFromString(orderDetailNode[4].html, "text/html").children[0].innerText,
      许可证号: new DOMParser().parseFromString(orderDetailNode[5].html, "text/html").children[0].innerText,
      申报日期: new DOMParser().parseFromString(orderDetailNode[6].html, "text/html").children[0].innerText,
      进口日期: new DOMParser().parseFromString(orderDetailNode[7].html, "text/html").children[0].innerText,
      启运日期: new DOMParser().parseFromString(orderDetailNode[8].html, "text/html").children[0].innerText,
      备案号: new DOMParser().parseFromString(orderDetailNode[9].html, "text/html").children[0].innerText,
      关联备案: new DOMParser().parseFromString(orderDetailNode[10].html, "text/html").children[0].innerText,
      关联报关单号: new DOMParser().parseFromString(orderDetailNode[11].html, "text/html").children[0].innerText,
      申报单位: new DOMParser().parseFromString(orderDetailNode[12].html, "text/html").children[0].innerText,
      境内收发货人: new DOMParser().parseFromString(orderDetailNode[13].html, "text/html").children[0].innerText,
      消费使用单位: new DOMParser().parseFromString(orderDetailNode[14].html, "text/html").children[0].innerText,
      境外收发货人: new DOMParser().parseFromString(orderDetailNode[15].html, "text/html").children[0].innerText,
      申报地海关: new DOMParser().parseFromString(orderDetailNode[16].html, "text/html").children[0].innerText,
      进境关别: new DOMParser().parseFromString(orderDetailNode[17].html, "text/html").children[0].innerText,
      入境口岸: new DOMParser().parseFromString(orderDetailNode[18].html, "text/html").children[0].innerText,
      启运国: new DOMParser().parseFromString(orderDetailNode[19].html, "text/html").children[0].innerText,
      启运港: new DOMParser().parseFromString(orderDetailNode[20].html, "text/html").children[0].innerText,
      经停港: new DOMParser().parseFromString(orderDetailNode[21].html, "text/html").children[0].innerText,
      领证机关: new DOMParser().parseFromString(orderDetailNode[22].html, "text/html").children[0].innerText,
      贸易国别: new DOMParser().parseFromString(orderDetailNode[23].html, "text/html").children[0].innerText,
      货物存放地点: new DOMParser().parseFromString(orderDetailNode[24].html, "text/html").children[0].innerText,
      "保税/监管场所": new DOMParser().parseFromString(orderDetailNode[25].html, "text/html").children[0].innerText,
      包装种类: new DOMParser().parseFromString(orderDetailNode[26].html, "text/html").children[0].innerText,
      原箱运输: new DOMParser().parseFromString(orderDetailNode[27].html, "text/html").children[0].innerText,
      口岸检验检疫机关: new DOMParser().parseFromString(orderDetailNode[28].html, "text/html").children[0].innerText,
      运输方式: new DOMParser().parseFromString(orderDetailNode[29].html, "text/html").children[0].innerText,
      运输工具名称: new DOMParser().parseFromString(orderDetailNode[30].html, "text/html").children[0].innerText,
      航次号: new DOMParser().parseFromString(orderDetailNode[31].html, "text/html").children[0].innerText,
      提运单号: new DOMParser().parseFromString(orderDetailNode[32].html, "text/html").children[0].innerText,
      "B/L号": new DOMParser().parseFromString(orderDetailNode[33].html, "text/html").children[0].innerText,
      目的地检验检疫机关: new DOMParser().parseFromString(orderDetailNode[34].html, "text/html").children[0].innerText,
      监管方式: new DOMParser().parseFromString(orderDetailNode[35].html, "text/html").children[0].innerText,
      征免性质: new DOMParser().parseFromString(orderDetailNode[36].html, "text/html").children[0].innerText,
      运费总价: new DOMParser().parseFromString(orderDetailNode[37].html, "text/html").children[0].innerText,
      保费总价: new DOMParser().parseFromString(orderDetailNode[38].html, "text/html").children[0].innerText,
      杂费总价: new DOMParser().parseFromString(orderDetailNode[39].html, "text/html").children[0].innerText,
      检验检疫受理机关: new DOMParser().parseFromString(orderDetailNode[40].html, "text/html").children[0].innerText,
      成交方式: new DOMParser().parseFromString(orderDetailNode[41].html, "text/html").children[0].innerText,
      件数: new DOMParser().parseFromString(orderDetailNode[42].html, "text/html").children[0].innerText,
      毛重: new DOMParser().parseFromString(orderDetailNode[43].html, "text/html").children[0].innerText,
      净重: new DOMParser().parseFromString(orderDetailNode[44].html, "text/html").children[0].innerText,
      // 价格说明: new DOMParser().parseFromString(orderDetailNode[45].html, "text/html").children[0].innerText,
      // 随附单证: new DOMParser().parseFromString(orderDetailNode[46].html, "text/html").children[0].innerText,
      // 集装箱数: new DOMParser().parseFromString(orderDetailNode[47].html, "text/html").children[0].innerText,
      // 特殊业务标: new DOMParser().parseFromString(orderDetailNode[48].html, "text/html").children[0].innerText,
      // 关联号码及理由: new DOMParser().parseFromString(orderDetailNode[49].html, "text/html").children[0].innerText,
      // 标记唛码: new DOMParser().parseFromString(orderDetailNode[50].html, "text/html").children[0].innerText,
      // 随附单据: new DOMParser().parseFromString(orderDetail1Node[51].html, "text/html").children[0].innerText,
      // 企业资质: new DOMParser().parseFromString(orderDetail1Node[54].html, "text/html").children[0].innerText,
      // 其他包装: new DOMParser().parseFromString(orderDetail1Node[56].html, "text/html").children[0].innerText,
      备注: new DOMParser().parseFromString(orderDetailNode[51].html, "text/html").children[0].innerText,
    });

    // 商品详情
    let rowsNode = await $find_elements({ by: "class name", value: "el-table__row" });
    if (rowsNode?.el) {
      rowsNode = [rowsNode];
    }
    for (const row of rowsNode) {
      await $click({
        element: row.el,
      });
      await $timeout(2);
      let goodNode = await $find_elements({ by: "class name", value: "info-content" });
      goodDetailList.push({
        报关单号: orderNumber,
        项号: new DOMParser().parseFromString(goodNode[52].html, "text/html").children[0].innerText,
        备案序号: new DOMParser().parseFromString(goodNode[53].html, "text/html").children[0].innerText,
        境内目的地: new DOMParser().parseFromString(goodNode[54].html, "text/html").children[0].innerText,
        "目的国(地区)": new DOMParser().parseFromString(goodNode[55].html, "text/html").children[0].innerText,
        "原产国(地区)": new DOMParser().parseFromString(goodNode[56].html, "text/html").children[0].innerText,
        原产地区: new DOMParser().parseFromString(goodNode[57].html, "text/html").children[0].innerText,
        商品编码: new DOMParser().parseFromString(goodNode[58].html, "text/html").children[0].innerText,
        商品名称: new DOMParser().parseFromString(goodNode[59].html, "text/html").children[0].innerText,
        规格型号: new DOMParser().parseFromString(goodNode[60].html, "text/html").children[0].innerText,
        检验检疫名称: new DOMParser().parseFromString(goodNode[61].html, "text/html").children[0].innerText,
        检验检疫货物规格: new DOMParser().parseFromString(goodNode[62].html, "text/html").children[0].innerText,
        商品单据: new DOMParser().parseFromString(goodNode[63].html, "text/html").children[0].innerText,
        产品资质: new DOMParser().parseFromString(goodNode[64].html, "text/html").children[0].innerText,
        货物属性: new DOMParser().parseFromString(goodNode[65].html, "text/html").children[0].innerText,
        危险货物信息: new DOMParser().parseFromString(goodNode[66].html, "text/html").children[0].innerText,
        用途: new DOMParser().parseFromString(goodNode[67].html, "text/html").children[0].innerText,
        申报数量: new DOMParser().parseFromString(goodNode[68].html, "text/html").children[0].innerText,
        申报单位: new DOMParser().parseFromString(goodNode[69].html, "text/html").children[0].innerText,
        申报单价: new DOMParser().parseFromString(goodNode[70].html, "text/html").children[0].innerText,
        申报总价: new DOMParser().parseFromString(goodNode[71].html, "text/html").children[0].innerText,
        海关单价: new DOMParser().parseFromString(goodNode[72].html, "text/html").children[0].innerText,
        海关总价: new DOMParser().parseFromString(goodNode[73].html, "text/html").children[0].innerText,
        币制: new DOMParser().parseFromString(goodNode[74].html, "text/html").children[0].innerText,
        法定第一数量: new DOMParser().parseFromString(goodNode[75].html, "text/html").children[0].innerText,
        法定第一单位: new DOMParser().parseFromString(goodNode[76].html, "text/html").children[0].innerText,
        法定第二数量: new DOMParser().parseFromString(goodNode[77].html, "text/html").children[0].innerText,
        法定第二单位: new DOMParser().parseFromString(goodNode[78].html, "text/html").children[0].innerText,
        征免方式: new DOMParser().parseFromString(goodNode[79].html, "text/html").children[0].innerText,
        加工成品单耗版本号: new DOMParser().parseFromString(goodNode[80].html, "text/html").children[0].innerText,
        货号: new DOMParser().parseFromString(goodNode[81].html, "text/html").children[0].innerText,
      });
    }
    // 返回最上层iframe
    await $to_default_content();
    // 辅助信息
    await $to_frame({
      by: "tag name",
      value: "iframe",
      array: 0,
    });
    await $click({
      by: "tag name",
      value: "button",
      array: 1,
    });
    await $timeout(2);
    let processRecordNode = await $find_elements({ by: "class name", value: "el-tree", array: 0 });
    for (const node of processRecordNode.html?.children) {
      processRecordList.push({
        报关单号: orderNumber,
        流转步骤: node?.children?.[0]?.innerText,
        流转内容: node?.children?.[1]?.innerText,
      });
      // if (node?.children?.[0]?.innerText === "电子申报") {
      //   processRecordList.push({
      //     报关单号: orderNumber,
      //     流转步骤: "电子申报",
      //     流转内容: node.children[1].innerText,
      //   });
      // }
      // if (node?.children?.[0]?.innerText === "电脑审单") {
      //   processRecordList.push({
      //     报关单号: orderNumber,
      //     流转步骤: "电脑审单",
      //     流转内容: node.children[1].innerText,
      //   });
      // }
      // if (node?.children?.[0]?.innerText === "现场接单") {
      //   processRecordList.push({
      //     报关单号: orderNumber,
      //     流转步骤: "电脑审单",
      //     流转内容: node.children[1].innerText,
      //   });
      // }
    }
    await $click({
      by: "class name",
      value: "el-icon-close",
    });
    await $to_default_content();
    await $timeout(1);
  }
  let baoguanPath = "C:/hyzx/模板/out报关单.xlsx";
  let huowuPath = "C:/hyzx/模板/out货物详情.xlsx";
  let liuzhuanPath = "C:/hyzx/模板/out流转信息.xlsx";
  let baoguansave = `C:/hyzx/dist/out/declaration/${dayjs().format("YYYYMMDD")}/${file.file}`;
  let huowusave = `C:/hyzx/dist/out/details/${dayjs().format("YYYYMMDD")}/${file.file}`;
  let liuzhuansave = `C:/hyzx/dist/out/operation/${dayjs().format("YYYYMMDD")}/${file.file}`;

  if (orderDetailList.length !== 0) {
    // 生成报关单excel
    await $excel.read_excel({
      file: baoguanPath,
      header: 1,
    });
    await $excel.twrite({
      value: orderDetailList,
    });
    await $excel.save({
      file: baoguansave,
    });
  }
  if (goodDetailList.length !== 0) {
    // 生成货物excel
    await $excel.read_excel({
      file: huowuPath,
      header: 1,
    });
    await $excel.twrite({
      value: goodDetailList,
    });
    await $excel.save({
      file: huowusave,
    });
  }

  if (processRecordList.length !== 0) {
    // 生成流转excel
    await $excel.read_excel({
      file: liuzhuanPath,
      header: 1,
    });
    await $excel.twrite({
      value: processRecordList,
    });
    await $excel.save({
      file: liuzhuansave,
    });
  }

  await $pool.set({ name: "currentfile", value: file.file });
  await $pet.talk({ txt: `工作结束`, timeout: 20 });
  return;
};

const main = async () => {
  await $to_default_content();
  let currentfile = await $pool.get({ name: "currentfile" });
  let filePath = `C:/hyzx/dist/in/${dayjs().format("YYYYMMDD")}`;
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
  } else if (dayjs().format("mm:ss") == "00:00" || dayjs().format("mm:ss") == "30:00") {
    await $refresh();
  }
  $finish();
};

main();
