const main = async () => {
  if (new Date().getMinutes() == 0) {
    await window.py("pool.set", { name: "xiaoshibufr1", value: true });
    await window.py("pool.set", { name: "turangshuifen", value: true });
    $finish();
    location.reload();
  }
};

main();
