const main = async () => {
  let currentfile = await $pool.get({ name: "currentfile" });
  let filePath = `C:/hyzx/dist/in/${dayjs().format("YYYYMMDD")}`;
  let fileInfos = await $sys.file_info({ path: filePath });
  if (fileInfos.length > 0) {
    fileInfos = _.orderBy(
      fileInfos,
      (o) => {
        return new Date(o.ctime);
      },
      "desc"
    );
    if (fileInfos?.[0].file !== currentfile) {
      await $refresh();
    }
  }
  $finish();
};

main();
