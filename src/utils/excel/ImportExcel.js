import * as XLSX from 'xlsx'
/**
 *
 * @param {File} file 文件
 * 使用：import { readExcel } from "@/utils/excel/ImportExcel.js";
 *       const A = await readExcel(filedata.value);
 */
export function readExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = ev.target.result
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        console.log(workbook)
        let length = workbook.SheetNames.length
        const wxname = []
        const ws = []
        for (let i = 0; i < length; i++) {
          wxname.push(workbook.SheetNames[i])
          // 生成json表格内容 还可以生成html
          ws.push(XLSX.utils.sheet_to_json(workbook.Sheets[wxname[i]], { header: 1 })) // 这种生成的是二维数组
          // ws.push(XLSX.utils.sheet_to_json(workbook.Sheets[wxname[i]])); // 这种生成的是对象数组
        }
        console.log(ws)
        resolve({ wxname, ws })
      } catch (e) {
        reject(e)
      }
    }
    reader.readAsBinaryString(file.raw)
  })
}
