const main = async () => {
  const obj = await window.py("view.values");
  const { excelPath } = obj;
  await window.py("excel.read_excel", {
    file: excelPath[0]?.trim(),
  });
  let sheets = await $excel.sheet_names();
  await window.py("view.add_combox", {
    id: `sheet`,
    name: "工作表",
    value: sheets,
  });
  $finish();
};

main();
