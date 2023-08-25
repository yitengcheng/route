// // 排位函数
const rankSeat = async (coordList, skipNumber, studentList, rankType) => {
  switch (rankType?.value) {
    case 1: // 从左到右
      await leftToRight(coordList, skipNumber, studentList);
      break;
    case 2: // 蛇形排位
      await snakeLike(coordList, skipNumber, studentList);
      break;
    case 3: // 纵列排位
      await wale(coordList, skipNumber, studentList);
      break;
    case 4: // 靠近中间
      await nearTheCenter(coordList, skipNumber, studentList);
      break;
    case 5: // 左尊右卑
      await alternateRank(coordList, skipNumber, studentList);
      break;
    default:
      break;
  }
};
// 写入座位
const writeStudent = async (list, skipNumber, studentList) => {
  let studentIndex = 0;
  let index = 0;
  let currentRow = list?.[0]?.row;
  for (const coord of list) {
    if (currentRow !== coord?.row) {
      currentRow = coord?.row;
      index = 0;
    }
    if (coord?.reset) {
      index = 0;
    } else {
      if (index % (skipNumber + 1) === 0) {
        await window.py("excel.iwrite", {
          row: coord?.row,
          column: coord?.column,
          value: studentList?.[studentIndex] ?? "",
        });
        studentIndex++;
      }
      index++;
    }
  }
};
// 整合座位
const integratedSeating = async (coordList) => {
  const corridors = await window.py("pool.get", { name: "corridors" });
  let tmp = [];
  _.map(coordList, (coord) => {
    const res = _.find(corridors, (corridor) => {
      if (coord?.row === corridor?.row && coord?.column - 1 === corridor?.column) {
        return corridor;
      }
    });
    if (res) {
      tmp.push({ reset: true, ...res });
    }
  });
  return _.sortBy(_.concat(coordList, tmp), ["row", "column"]);
};
// 从左到右排位
const leftToRight = async (coordList, skipNumber, studentList) => {
  const list = await integratedSeating(coordList);
  await writeStudent(list, skipNumber, studentList);
};
// 蛇形排位
const snakeLike = async (coordList, skipNumber, studentList) => {
  const listTmp = await integratedSeating(coordList);
  const listTmpObj = _.groupBy(listTmp, "row");
  let list = [];
  let flag = true; // 正反排序开关
  _.map(listTmpObj, (item) => {
    if (flag) {
      //正序
      list.push(...item);
    } else {
      // 倒序
      let tmp = _.reverse(item);
      list.push(...tmp);
    }
    flag = !flag;
  });
  await writeStudent(list, skipNumber, studentList);
};
// 纵行排位
const wale = async (coordList, skipNumber, studentList) => {
  const listTmp = await integratedSeating(coordList);
  const listTmpObj = _.groupBy(listTmp, "column");
  let studentIndex = 0;
  let index = 0;
  let list = [];
  _.map(listTmpObj, (obj) => {
    if (obj?.[0]?.reset) {
      index = 0;
    } else {
      if (index % (skipNumber + 1) === 0) {
        list.push(...obj);
      }
      index++;
    }
  });
  for (const item of list) {
    await window.py("excel.iwrite", { row: item?.row, column: item?.column, value: studentList?.[studentIndex] });
    studentIndex++;
  }
};
// 靠近中间排列
const nearTheCenter = async (coordList, skipNumber, studentList) => {
  const totalRC = await window.py("pool.get", { name: "totalRC" });
  const centerColumn = Math.round(totalRC?.column / 2);
  const listTmp = await integratedSeating(coordList);
  const listTmpObj = _.groupBy(listTmp, "row");
  let list = [];
  _.map(listTmpObj, (item) => {
    if (item?.[0]?.column <= centerColumn) {
      let tmp = _.reverse(item);
      list.push(...tmp);
    } else {
      list.push(...item);
    }
  });
  await writeStudent(list, skipNumber, studentList);
};
// 左尊右卑
const alternateRank = async (coordList, skipNumber, studentList) => {
  const listTmp = await integratedSeating(coordList);
  const totalRC = await window.py("pool.get", { name: "totalRC" });
  const centerColumn = Math.round(totalRC?.column / 2);
  const listTmpObj = _.groupBy(listTmp, "row");
  let list = [];
  _.map(listTmpObj, (listRow) => {
    let tmp = [];
    const first = _.find(listRow, (obj) => obj.column === centerColumn);
    tmp.push(first);
    let leftIndex = 1;
    let rightIndex = 1;
    let index = 1;
    listRow.forEach((obj) => {
      const left = _.find(listRow, (obj) => obj.column === centerColumn - index);
      const right = _.find(listRow, (obj) => obj.column === centerColumn + index);
      if (leftIndex % (skipNumber + 1) === 0) {
        if (!left?.reset) {
          tmp.push(left);
          leftIndex++;
        } else {
          leftIndex = skipNumber + 1;
        }
      } else {
        leftIndex++;
      }
      if (rightIndex % (skipNumber + 1) === 0) {
        if (!right?.reset) {
          tmp.push(right);
          rightIndex++;
        } else {
          rightIndex = skipNumber + 1;
        }
      } else {
        rightIndex++;
      }
      index++;
    });
    list.push(...tmp);
  });
  let studentIndex = 0;
  for (const item of list) {
    if (item) {
      await window.py("excel.iwrite", {
        row: item?.row,
        column: item?.column,
        value: studentList?.[studentIndex] ?? "",
      });
      studentIndex++;
    }
  }
};

const main = async () => {
  const obj = await window.py("view.values");
  const coordinatesGather = await window.py("pool.get", { name: "coordinatesGather" });
  const colorObjs = await window.py("pool.get", { name: "colorObjs" });
  let index = 0;
  let lastObj = [];
  for (const colorObj of colorObjs) {
    await window.py("excel.read_excel", {
      file: obj?.[`class_${index}`]?.trim(),
      header: obj?.[`classNumber_${index}`]?.trim() * 1,
    });
    const excelData = await window.py("excel.get_table");
    const studentName = _.map(
      _.filter(excelData, (o) => {
        return o?.["姓名"];
      }),
      "姓名"
    );
    lastObj.push({
      coordList: coordinatesGather?.[colorObjs?.[obj?.[`color_${index}`]?.index]?.value],
      rankType: window._rankType?.[obj?.[`rankType_${index}`]?.index],
      skipNumber: obj?.[`skipNumber_${index}`]?.trim() * 1,
      studentList: studentName,
    });
    index++;
  }
  await window.py("excel.read_excel", {
    file: obj?.locationMapFile?.trim(),
    header: 1,
  });
  for (const last of lastObj) {
    await rankSeat(last.coordList, last.skipNumber, last.studentList, last?.rankType);
  }
  await window.py("excel.save", {
    file: `/Users/fanzehua/workspace/jiaoben/shiweidangxiao/dist/座位图${dayjs().format("YYYYMMDDHHmmss")}.xlsx`,
  });
};

main();
