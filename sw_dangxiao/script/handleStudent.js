const main = async () => {
  console.log("-----handleStudent");
  let node = $items$;
  let data = await window.py("pool.get", { name: "data" });
  node?.children?.[11]?.children?.[2]?.click();
  window.py.$timeout(2);
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

  console.log("-----handleStudent end");
};

main();
