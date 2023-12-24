const main = async () => {
  const obj = await window.py("view.values");
  const { locationMapFile } = obj;
  await window.py("excel.read_excel", {
    file: locationMapFile?.trim(),
    header: 1,
  });
  const coordinatesGather = await window.py("excel.bgColor_coordinate_line");
  const colorObjs = _.filter(window._colors, (o) => {
    return _.includes(_.keys(coordinatesGather), o.value) && o;
  });
  const corridors = await window.py("excel.get_merge_cells_each", { query: "过道" });
  const totalRC = await window.py("excel.totalRC");
  await window.py("pool.set", { name: "colorObjs", value: colorObjs });
  await window.py("pool.set", { name: "coordinatesGather", value: coordinatesGather });
  await window.py("pool.set", { name: "corridors", value: corridors });
  await window.py("pool.set", { name: "totalRC", value: totalRC });
  const colors = _.map(colorObjs, "label");
  let index = 0;
  for (const color of colors) {
    await window.py("view.add_combox", {
      id: `color_${index}`,
      name: "颜色",
      value: colors,
    });
    await window.py("view.add_input", {
      id: `skipNumber_${index}`,
      name: "间隔数",
    });
    await window.py("view.add_file", {
      id: `class_${index}`,
      name: "班级excel",
    });
    await window.py("view.add_input", {
      id: `classNumber_${index}`,
      name: "班级excel起始行",
    });
    await window.py("view.add_combox", {
      id: `rankType_${index}`,
      name: "排位方式",
      value: _.map(window._rankType, "label"),
    });
    index++;
  }
};

main();
