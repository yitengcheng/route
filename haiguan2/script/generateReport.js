const report = async () => {
  await $timeout(0.1);
  const obj = await window.py("view.values");
  const { searchTime } = obj;
  let searchDates = [dayjs(searchTime[0])];
  let i = 1;
  while (dayjs(searchTime[0]).add(i, "day").isBefore(dayjs(searchTime[1]))) {
    searchDates.push(dayjs(searchTime[0]).add(i, "day"));
    i++;
  }
  await $pool.set({ name: "searchDates", value: searchDates });

  $finish();
};

const main = async () => {
  await report();
};

main();
