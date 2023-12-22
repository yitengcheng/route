const main = async () => {
  let obj = await window.py("view.values");
  const { classFile, classFileNumber } = obj;
  await window.py("excel.read_excel", {
    file: classFile
      ? classFile?.trim()
      : "/Users/fanzehua/workspace/jiaoben/shiweidangxiao/dist/最终名单20221212211557.xlsx",
    header: classFileNumber ? classFileNumber?.trim() * 1 : 7,
  });
  const excelData = await window.py("excel.bgColor_value_line");
  let datas = [];
  _.map(excelData, (item) => {
    datas.push(...item);
  });
  await window.py("pool.set", { name: "studentDatas", value: datas });
  $finish();
};

main();
