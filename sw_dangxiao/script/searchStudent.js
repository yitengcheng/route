const main = async () => {
  let data = $items$;
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
  await window.py.$timeout(3);
};
main();
