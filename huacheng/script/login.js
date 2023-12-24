const main = async () => {
  // 判断是否登录
  let flagNode = document.getElementById("username");
  if (flagNode) {
    await login();
  }
  // let flagLi = document.getElementsByTagName("li") ?? [];
  // while (flagLi.length === 0) {
  //   document.getElementsByTagName("img")[1].click();
  //   await sendCode();
  //   await $timeout(3);
  // }
  $finish();
};

const login = async () => {
  // 输入账号密码
  await $send_keys({
    by: "id",
    value: "username",
    txt: "test",
  });
  await $send_keys({
    by: "id",
    value: "password",
    txt: "test@123",
  });
  // 输入验证码
  await sendCode();
};

const sendCode = async () => {
  // 输入验证码
  let img = document.getElementsByTagName("img")[1].src;
  let verificationCode = await $baidu.ocring({ image: img });
  verificationCode = JSON.parse(verificationCode);
  verificationCode = verificationCode?.["words_result"]?.[0]?.["words"];
  let reg = /[\t\r\f\n\s]*/g;
  verificationCode = verificationCode.replace(reg, "");
  await $send_keys({
    by: "id",
    value: "inputCode",
    txt: verificationCode,
  });
  document.getElementsByClassName("login-button ant-btn ant-btn-primary ant-btn-lg")[0].click();
};

main();
