const report = async () => {
  let trNode = document.getElementsByTagName("tr");
  for (const tr of trNode) {
    if (tr?.cells[15]?.innerText === "是") {
      let endTime = new Date(tr.cells[8].innerText);
      let person = {
        endTime: `${endTime.getFullYear()}年${endTime.getMonth() + 1}月${endTime.getDate()}日`,
        sourceCountry: tr.cells[24].innerText,
        name: tr.cells[4].children[0].children[0].innerHTML,
        sex: tr.cells[5].innerText,
        age: tr.cells[23].innerText,
        nationality: tr.cells[6].innerText,
        passportNumber: tr.cells[7].innerText,
        occupation: "", // 在详情页中
        address: tr.cells[36].innerText,
        phone: tr.cells[19].innerText,
        startingTime: "", // 在详情页
        endAddress: tr.cells[24].innerText,
        flight: tr.cells[20].innerText,
        animalHeat: tr.cells[10].innerText,
        currentTime: `${new Date().getFullYear()}年${new Date().getMonth() + 1}月${new Date().getDate()}日`,
      };

      tr.cells[4].children[0].children[0].click();
      await $timeout(5);
      let tableNode = document.getElementsByTagName("table");
      let uNode = document.getElementsByTagName("u");
      let startingTime = new Date(uNode[12].innerText);
      person.occupation = tableNode[0].children[1].children[5].innerText;
      person.startingTime = `${startingTime.getFullYear()}年${
        startingTime.getMonth() + 1
      }月${startingTime.getDate()}日`;
      document.getElementsByClassName("el-icon-close")[1].click();
      let template1Path = "C:/自动化报表生成/模板/模板1.docx";
      let template2Path = "C:/自动化报表生成/模板/模板2.docx";
      let save1Path = `C:/自动化报表生成/dist/${person.currentTime}${person.name}1.docx`;
      let save2Path = `C:/自动化报表生成/dist/${person.currentTime}${person.name}2.docx`;
      /*let flag = $pool.get({ name: "$DEBUGGER" });
        if (flag) {
          template1Path = "/Users/fanzehua/workspace/jiaoben/jiqiren_mac_dev/route/haiguan/模板/模板1.docx";
          template2Path = "/Users/fanzehua/workspace/jiaoben/jiqiren_mac_dev/route/haiguan/模板/模板2.docx";
          save1Path = `/Users/fanzehua/workspace/jiaoben/jiqiren_mac_dev/route/haiguan/dist/${person.currentTime}${person.name}1.docx`;
          save2Path = `/Users/fanzehua/workspace/jiaoben/jiqiren_mac_dev/route/haiguan/dist/${person.currentTime}${person.name}2.docx`;
        }*/
      await $word.read({ file: template1Path });
      await $word.replace({ set: person });
      await $word.save({ file: save1Path });
      await $word.read({ file: template2Path });
      await $word.replace({ set: person });
      await $word.save({ file: save2Path });
    }
  }
  $finish();
};

const main = async () => {
  await report();
};

main();
