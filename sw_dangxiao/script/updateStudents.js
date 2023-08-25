// 1.输入身份证号 id = idNumber
// 2. 点击搜索按钮 class = stdbtn.btn_orange [0]
// 3. 暂停1秒
// 4. 寻找tr 遍历tr 再遍历tr下面children innerText == 在校
/**
 * tr节点示例
 * <tr>
                            <td>3</td>
                            <td>邱海</td>
                            <td>男</td>
                            <td>
                                
                                    中共党员
                                </td>
                            <td>
                                汉族</td>
                            <td>市人大办公厅</td>
                            <td>
                                
                                    副县
                                </td>
                            <td>贵阳市人大常委会研究室副主任</td>
                            <td>13885096622</td>
                            <td width="12%">
                                2022-09-01 16:18</td>

                            <td>
                                
                                    在校
                                </td>
                            <td class="center">
                                <a href="http://10.100.101.1:6698/admin/jiaowu/user/detailOfUser.json?id=8970" class="stdbtn" title="详细信息">详细信息</a>
                                <!--如果是组织部，则不显示-->
                                <a href="http://10.100.101.1:6698/admin/jiaowu/user/toUpdateUserPerId.json?userId=8970" class="stdbtn" title="修改一卡通编号">修改一卡通编号</a>
                                <a href="http://10.100.101.1:6698/admin/jiaowu//user/toUpdateUser.json?id=8970" class="stdbtn.btn_orange" title="修改学员信息">修改学员信息</a>
                                <a href="javascript:void(0)" class="stdbtn" onclick="deleteUser(8970,'13885096622')">删除</a>
                            </td>
                        </tr>
 */
// 点击修改学员信息
// 暂停1秒
/**
 * 姓名 id = name
 * 民族 id = nationality
 * 身份证号 ID = idNumber
 * 联系电话 ID = mobile
 * 点击提交 ID = submitButton
 */
const main = async () => {
  const obj = await window.py("view.values");
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
  for (const data of datas) {
    await window.py("send_keys", {
      by: "id",
      value: "idNumber",
      txt: data?.["身份证号码"],
    });
    await window.py("click", {
      by: "class name",
      value: "stdbtn.btn_orange",
      array: 0,
    });
    console.log(`----${dayjs().format("MM:ss")}`);
    await window.py.$timeout(5);
    console.log(`----${dayjs().format("MM:ss")}`);
    const nodes = document.getElementsByTagName("tr");
    for (const node of nodes) {
      node?.children?.[11]?.children?.[2]?.click();
      await window.py.$timeout(2);
      await window.py("send_keys", {
        by: "id",
        value: "name",
        txt: data?.["姓名"],
      });
      await window.py("send_keys", {
        by: "id",
        value: "nationality",
        txt: data?.["民族"],
      });
      await window.py("send_keys", {
        by: "id",
        value: "idNumber",
        txt: data?.["身份证号码"],
      });
      await window.py("send_keys", {
        by: "id",
        value: "mobile",
        txt: data?.["联系电话"],
      });
      await window.py("send_keys", {
        by: "id",
        value: "submittedName",
        txt: "李丹丹",
      });
      await window.py("send_keys", {
        by: "id",
        value: "submittedMobile",
        txt: "13027824111",
      });
      await window.py("click", {
        by: "id",
        value: "submitButton",
      });
      await window.py.$timeout(2);
      await window.py("click", {
        by: "id",
        value: "popup_ok",
      });
      await window.py.$timeout(2);
      await window.py("send_keys", {
        by: "id",
        value: "idNumber",
        txt: data?.["身份证号码"],
      });
      await window.py("click", {
        by: "class name",
        value: "stdbtn.btn_orange",
        array: 0,
      });
      await window.py.$timeout(2);
    }
  }
  console.log("----end");
};

main();
