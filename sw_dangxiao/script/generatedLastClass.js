const main = async () => {
  const obj = await window.py("view.values");
  const { ultimatelyFile, ultimatelyFileNumber, classFile, classFileNumber } = obj;
  await window.py("excel.read_excel", {
    file: ultimatelyFile?.trim(),
    header: ultimatelyFileNumber?.trim() * 1,
  });
  const excelData = await window.py("excel.get_table");
  await window.py("excel.read_excel", {
    file: classFile?.trim(),
    header: classFileNumber?.trim() * 1,
  });
  const classData = await window.py("excel.get_table");
  let result = [];
  let index = 1;
  await window.py("excel.tclear", {});
  _.map(excelData, (data) => {
    if (data?.["姓名"]) {
      const item = _.find(classData, (cData) => {
        return data?.["姓名"]?.replaceAll(" ", "") === cData?.["姓名"];
      });
      result.push({
        序号: index,
        姓名: item?.["姓名"] ?? "",
        性别: item?.["性别"] ?? "",
        年龄: item?.["年龄"] ?? "",
        政治面貌: item?.["政治面貌"] ?? "",
        学历: item?.["学历"] ?? "",
        民族: item?.["民族"] ?? "",
        单位及职务: item?.["单位及职务"] ?? "",
        身份证号码: item?.["身份证号码"] ?? "",
        联系电话: item?.["联系电话"] ?? "",
        班级职务: item?.["班级职务"] ?? "",
        签名: "",
        入党年月: item?.["入党年月"] ?? "",
      });
      index++;
    } else {
      result.push({ 序号: data?.["序号"], merge_cells: { coord: [1, 13] } });
    }
  });
  window.py("excel.twrite", {
    value: result,
    insert: true,
  });
  await window.py("excel.save", {
    file: `/Users/fanzehua/workspace/jiaoben/shiweidangxiao/dist/最终名单${dayjs().format("YYYYMMDDHHmmss")}.xlsx`,
  });
};

main();
