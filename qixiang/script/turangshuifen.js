﻿const report = async () => {

  let iframe = document.getElementsByTagName("iframe")?.[0];
  if (!iframe) {
      await $refresh();
    }
  let node = iframe.contentWindow.document.getElementsByClassName("uy-table-tbody")[3];
  let defaultValue = node.rows[0].cells[5].children[0].children[0].innerText * 1;
  if (defaultValue > 0) {
    node.rows[0].cells[5].children[0].children[0].click();
    await $timeout(5);
    let tbody = iframe.contentWindow.document.getElementsByClassName("uy-table-tbody")[8];
    let data = [];
    for (row of tbody.rows) {
      data.push({
        站号: row.cells[1].innerText,
        站名: row.cells[2].innerText,
        省: row.cells[3].innerText,
        市: row.cells[4].innerText,
        区县: row.cells[5].innerText,
      });
    }
    await window.py("excel.read_excel", {
      file: `C:/Users/jiqi/Desktop/模板/汇总模板.xlsx`,
      header: 2,
    });
    await window.py("excel.twrite", {
      value: data,
    });
    await window.py("excel.save", {
      file: `C:/Users/jiqi/Desktop/dist/${new Date().getFullYear()}年${
        new Date().getMonth() + 1
      }月${new Date().getDate()}日${new Date().getHours()}时${new Date().getMinutes()}分 土壤水分缺省汇总.xlsx`,
    });
    iframe.contentWindow.document.getElementsByClassName("uy-modal-close-x")[0].click();
  }
  await $timeout(1);
  $finish();
};

const main = async () => {
  let currentDate = new Date();
  if (
    currentDate.getMinutes() == 30 &&
    currentDate.getSeconds() == 0
  ) {
    await report();
  }
  $finish();
};

main();