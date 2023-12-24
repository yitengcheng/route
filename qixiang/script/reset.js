const main = async () => {
  let date = new Date();
  if ((date.getMinutes() == 59 || date.getMinutes() == 28) && date.getSeconds() == 0) {
    await $reopen();
  }
  if (date.getSeconds() == 30 || date.getSeconds() == 15 || date.getSeconds() == 45) {
    let iframe = document.getElementsByTagName("iframe")?.[0];
    if (!iframe) {
      await $refresh();
    }
  }

  $finish();
};

main();
