const main = async () => {
  if (new Date().getMinutes() == 59 && new Date().getSeconds() == 0) {
    await window.py("pool.set", { name: "xiaoshibufr1", value: true });
    await window.py("pool.set", { name: "turangshuifen", value: true });
    // await $refresh();
    await $reopen();
  }

  $finish();
};

main();
