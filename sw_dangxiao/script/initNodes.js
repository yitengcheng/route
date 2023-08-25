const main = async () => {
  console.log("-----initNode");
  const nodes = document.getElementsByTagName("tr");
  await window.py("pool.set", { name: "nodes", value: nodes });
  console.log("-----initNode end");
};

main();
