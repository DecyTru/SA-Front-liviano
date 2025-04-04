import {CiLogout} from "react-icons/ci";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import * as XLSX from "xlsx";
import {handleDownloadTemplate} from "../shared/utils/index.js";
import {MdOutlineFileDownload} from "react-icons/md";
import {IoIosAttach} from "react-icons/io";
import Swal from "sweetalert2";


export  function UpdatePage() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState([]);
    const fileInputRef = useRef(null);

    const handleMenuPage = () => {
        navigate("/");
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setFile(file);
            readExcel(file);
        }
    };

    const readExcel = (file) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);

            if (parsedData.length > 51) {
                Swal.fire({
                    icon: "error",
                    title: "Archivo demasiado grande",
                    text: "El archivo supera los 50 registros permitidos. Selecciona otro archivo.",
                });

                setJsonData([]);
                setFile(null);

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } else {
                setJsonData(parsedData);
            }
        };
    };

    const handleUpload = async () => {
        if (jsonData.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Sin datos",
                text: "No hay datos para enviar.",
            });
            return;
        }

        try {
            const response = await fetch("https://prod-25.westus.logic.azure.com:443/workflows/f01db118906d487b8ccd091489afb308/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9dPnFqhvInfrIGrNwd6KY8is555wZ33KrIGGqcPqWp4", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({data: jsonData}),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Enviado correctamente",
                    text: "Los datos han sido enviados con éxito.",
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error al enviar",
                    text: "Hubo un problema al enviar los datos.",
                });
            }
        } catch (error) {
            console.error("Error en la solicitud", error);
            Swal.fire({
                icon: "error",
                title: "Error inesperado",
                text: "Ocurrió un error al enviar la solicitud.",
            });
        }
    };

    return <>
        <div className="p-10 relative">
            <button
                onClick={handleMenuPage}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-500 cursor-pointer"
            >
                <CiLogout className="w-6 h-6"/> Salir
            </button>

            <h1 className="text-3xl text-[#0033A0] font-bold mt-5 ">

                Carga de datos para Pólizas Colectivas
            </h1>
            <p className="text-[16px] mt-5">
                Aquí podrás importar máximo 50 datos de una póliza colectiva
            </p>

            <div className="flex flex-col mt-5">
                <div className="flex gap-3">
                    <label
                        className="bg-blue-500 text-white px-4 py-2 rounded-[27px] cursor-pointer hover:bg-[#0033A0] text-center w-[391px] flex justify-center gap-5">
                        <IoIosAttach className="w-6 h-6 inline-block"/>
                        Seleccionar Archivo
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {file && (
                        <p className="mt-2 text-gray-700 text-sm font-medium italic">
                            Archivo seleccionado: {file.name}
                        </p>
                    )}
                </div>

                <button
                    onClick={handleDownloadTemplate}
                    className="bg-blue-500 text-white p-2 mt-5 rounded-[27px] h-[39px] w-[391px] cursor-pointer hover:bg-[#0033A0] flex gap-5 items-center justify-center">
                    <MdOutlineFileDownload className="w-6 h-6 inline-block "/>
                    Descarga plantilla de base de datos
                </button>
            </div>


            {jsonData.length > 0 && (
                <>
                    <div className="mt-10 overflow-x-auto max-h-[500px]">

                        <table className="w-full min-w-max min-h-max border-collapse border border-gray-300 shadow-md ">
                            <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="border border-gray-300 px-4 py-2">N° Póliza</th>
                                <th className="border border-gray-300 px-4 py-2">ID Mascota</th>
                                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                                <th className="border border-gray-300 px-4 py-2">Raza</th>
                                <th className="border border-gray-300 px-4 py-2">Edad</th>
                                <th className="border border-gray-300 px-4 py-2">Sexo</th>
                                <th className="border border-gray-300 px-4 py-2">Producto</th>
                                <th className="border border-gray-300 px-4 py-2">Plan</th>
                                <th className="border border-gray-300 px-4 py-2">Estado</th>
                                <th className="border border-gray-300 px-4 py-2">Inicio de vigencia</th>
                                <th className="border border-gray-300 px-4 py-2">Fin de vigencia</th>
                                <th className="border border-gray-300 px-4 py-2">Saldos Gastos Veterinarios</th>
                                <th className="border border-gray-300 px-4 py-2">RC</th>
                                <th className="border border-gray-300 px-4 py-2">Saldo RC</th>
                                <th className="border border-gray-300 px-4 py-2">Tipo ID</th>
                                <th className="border border-gray-300 px-4 py-2">Numero ID Asegurado</th>
                                <th className="border border-gray-300 px-4 py-2">Asegurado Nombre Completo</th>
                                <th className="border border-gray-300 px-4 py-2">Asegurado Primer Apellido</th>
                                <th className="border border-gray-300 px-4 py-2">Asegurado Segundo Apellido</th>
                                <th className="border border-gray-300 px-4 py-2">Asegurado Sexo</th>
                                <th className="border border-gray-300 px-4 py-2">Asesor</th>
                            </tr>
                            </thead>
                            <tbody>
                            {jsonData.map((item, index) => (
                                <tr key={index} className="odd:bg-gray-100 even:bg-white">
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.NumeroPoliza}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.IdMascota}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.NombreMascota}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Raza}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.EdadMascota}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.SexoMascota}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Producto}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Plan}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Estado}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.InicioVigencia}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.FinVigencia}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.SaldosGastosVeterinarios}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.RC}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.SaldoRC}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.TipoID}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.NumeroIdAsegurado}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.AseguradoNombreCompleto}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.AseguradoPrimerApellido}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.AseguradoSegundoApellido}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.AseguradoSexo}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Asesor}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>


                    </div>
                    <button
                        onClick={handleUpload}
                        className="bg-blue-500 text-white p-2 mt-5 rounded-[27px] h-[39px] w-[391px] cursor-pointer hover:bg-[#0033A0]"
                    >
                        Enviar a base de datos
                    </button>
                </>
            )}
        </div>
    </>;
}