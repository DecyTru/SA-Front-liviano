import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function convertirAExcel (data)  {
    if (!data || data.length === 0) {
        console.error("No hay datos para exportar.");
        return;
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const dataBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const fileName = new Date().toISOString().replace(/[:.]/g, "-") + ".xlsx";
    saveAs(dataBlob, fileName);

};
