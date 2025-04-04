import * as XLSX from "xlsx";

export function handleDownloadTemplate() {
    const headers = [
        ["N° Póliza", "ID Mascota", "Nombre", "Raza", "Edad", "Sexo", "Producto", "Plan", "Estado",
            "Inicio de vigencia", "Fin de vigencia", "Saldos Gastos Veterinarios", "RC", "Saldo RC",
            "Tipo ID", "Número ID Asegurado", "Asegurado Nombre Completo", "Asegurado Primer Apellido",
            "Asegurado Segundo Apellido", "Asegurado Sexo", "Asesor"]
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(headers);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Plantilla");
    XLSX.writeFile(workbook, "plantilla.xlsx");
}