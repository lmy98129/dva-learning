export default function search(list, text) {
  let result = [];
  for (let item of list) {
    let tmpObj;
    for (let key in item) {
      if (key === "id") continue;
      let tmpStr = (typeof item[key] !== "string") ? 
          String(item[key]) : item[key];
      if (tmpStr.match(text)) {
        if (tmpObj === undefined) {
          tmpObj = {...item, keyFound: [key]}
        } else {
          tmpObj.keyFound.push(key);
        }
      }
    }
    if (tmpObj !== undefined) {
      result.push(tmpObj);
    }
  }
  result.sort((a, b) => {
    return b.keyFound.length - a.keyFound.length;
  })
  return result;
}