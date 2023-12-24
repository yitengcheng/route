const report = async () => {
  //登录
  document.getElementById("domain_sel").value = "gy.intra.customs.gov.cn";
  await $send_keys({ by: "id", value: "F_email", txt: "gyhgkjc" });
  document.getElementById("F_password").style = "display:flex;";
  await $send_keys({ by: "id", value: "F_password", txt: "1qaz2wsx!@" });
  $finish();
  await $click({ by: "id", value: "action" });
};

const main = async () => {
  await report();
};

main();
