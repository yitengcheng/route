const main = async () => {
  const obj = await window.py("view.values");
  const { primaryFile, primaryFileNumber, groupNumber, sortord, templateFile, className, templateFileNumber } = obj;
  await window.py("excel.read_excel", {
    file: primaryFile?.trim(),
    header: primaryFileNumber?.trim() * 1,
  });
  let excelData = await window.py("excel.get_table");
  const number = groupNumber?.trim() * 1;
  let result = [];
  let index = 1;
  let totalIndex = 0;
  let group = 1;
  if (sortord?.label === "单位排序") {
    await window.py("excel.read_excel", {
      file: "/Users/fanzehua/workspace/jiaoben/shiweidangxiao/route/单位列表.xlsx",
      header: 1,
    });
    const unitExcel = _.map(await window.py("excel.get_table"), "单位名称");
    let dataTmp = [];
    _.map(unitExcel, (unit) => {
      const res = _.filter(excelData, (o) => {
        return o?.["单位"] === unit;
      });
      if (res?.length > 0) {
        dataTmp.push(...res);
      }
    });
    excelData = _.uniqBy(_.concat(dataTmp, excelData), "身份证号");
  }
  _.map(excelData, (data) => {
    if (totalIndex % (number + 1) === 0) {
      result.push({ 序号: `第${group}组(${number}人)`, merge_cells: { coord: [1, 13] } });
      group++;
    } else {
      result.push({
        序号: index,
        姓名: data?.["姓名"] ?? "暂无",
        性别: data?.["性别"] ?? "暂无",
        年龄: data?.["年龄"] ?? "暂无",
        政治面貌: data?.["政治面貌"] ?? "暂无",
        学历: data?.["学历"] ?? "暂无",
        民族: data?.["民族"] ?? "暂无",
        单位及职务: `${data?.["单位"] ?? "暂无"},${data?.["职务职称"] ?? "暂无"}`,
        身份证号码: data?.["身份证号"] ?? "暂无",
        联系电话: data?.["联系电话"] ?? "暂无",
        班级职务: "",
        签名: "",
        入党年月: "",
      });
      index++;
    }
    totalIndex++;
  });
  await window.py("excel.read_excel", {
    file: templateFile?.trim(),
    header: templateFileNumber?.trim() * 1,
  });
  await window.py("excel.twrite", {
    value: result,
    insert: true,
  });
  await window.py("excel.save", {
    file: `/Users/fanzehua/workspace/jiaoben/shiweidangxiao/dist/${className?.trim()}.xlsx`,
  });
};

main();
