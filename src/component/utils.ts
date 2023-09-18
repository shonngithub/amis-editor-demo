/*
 * @name: autoConvertPX
 * @description: 自动补全 px
 * @param {*} value
 * @use:   // 示例用法
  // console.log(autoConvertPX('50%'));  // 输出：50%
  // console.log(autoConvertPX('200px'));  // 输出：200px
  // console.log(autoConvertPX('80vw'));  // 输出：80vw
  // console.log(autoConvertPX('300'));  // 输出：300px
 */
function autoConvertPX (value: string): string {
  // 检查是否以 % 结尾，如果是则返回原始值
  if (/%$/.test(value)) {
    return value;
  }
  // 检查是否以 px 结尾，如果是则返回原始值
  if (/px$/.test(value)) {
    return value;
  }
  // 检查是否以 vw 结尾，如果是则返回原始值
  if (/vw$/.test(value)) {
    return value;
  }
  if(value==='auto'){
    return value
  }
  // 如果没有单位，则默认补上 px，并返回结果
  return value + 'px';
}


export {
  autoConvertPX
}
