import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { requestDate } from "../core/services/requestDate.js";
import { useState } from "react";
import {convertirAExcel} from "../shared/utils/index.js";

export function DownloadPage() {
    const navigate = useNavigate();
    const [startMonth, setStartMonth] = useState(0);
    const [startYear, setStartYear] = useState(2022);
    const [endMonth, setEndMonth] = useState(0);
    const [endYear, setEndYear] = useState(2024);
    const [loading, setLoading] = useState(false);

    const handleMenuPage = () => {
        navigate("/");
    };

    const formatDateToOData = (month, year, isEndDate) => {
        let adjustedMonth = month + 1;
        const day = isEndDate ? "31" : "01";
        return `${year}-${String(adjustedMonth).padStart(2, "0")}-${day}T00:00:00Z`;
    };


    const handleDownload = async () => {
        const startDate = formatDateToOData(startMonth, startYear);
        const endDate = formatDateToOData(endMonth, endYear, true);

        setLoading(true);

        try {
            const response = await requestDate({ startDate, endDate });

            if (!response) {
                throw new Error("No se recibió respuesta de la API.");
            }

            const data = response.data ?? response;

            console.log("Datos procesados:", data);

            if (!Array.isArray(data)) {
                throw new Error("La respuesta no es un array válido.");
            }
            convertirAExcel(data);
        } catch (error) {
            console.error("Error al descargar los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStartYearChange = (e) => {
        const newStartYear = Number(e.target.value);
        setStartYear(newStartYear);

        if (newStartYear > endYear) {
            setEndYear(newStartYear);
        }
    };

    return (
        <>
            <div className=" p-10 relative">
                <button onClick={handleMenuPage} className="absolute top-3 right-3 text-gray-600 hover:text-red-500 cursor-pointer">
                    <CiLogout className="w-6 h-6" /> Salir
                </button>

                <h1 className="text-3xl text-[#0033A0] font-bold mt-5">Descarga de la Base de datos</h1>
                <p className="text-[16px] mt-5">Para iniciar, seleccione los datos para descarga</p>

                <div className="flex flex-col mt-10 gap-4">
                    {/* Selección Desde */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <h2 className="text-black font-bold">Desde</h2>
                        <select
                            className="p-2 rounded-[12px] border-2 w-[160px] h-[40px]"
                            value={startMonth}
                            onChange={(e) => setStartMonth(Number(e.target.value))}
                        >
                            {Array.from({ length: 12 }, (_, i) => {
                                const monthName = new Date(2024, i).toLocaleString("es-ES", { month: "long" });
                                const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
                                return (
                                    <option key={i} value={i}>
                                        {capitalizedMonth}
                                    </option>
                                );
                            })}
                        </select>
                        <select
                            className="p-2 rounded-[12px] border-2 w-[100px] h-[40px]"
                            value={startYear}
                            onChange={handleStartYearChange}
                        >
                            {Array.from({ length: 5 }, (_, i) => {
                                const year = 2023 + i;
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Selección Hasta */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <h2 className="text-black font-bold">Hasta</h2>
                        <select
                            className="p-2 rounded-[12px] border-2 w-[160px] h-[40px]"
                            value={endMonth}
                            onChange={(e) => setEndMonth(Number(e.target.value))}
                        >
                            {Array.from({ length: 12 }, (_, i) => {
                                const monthName = new Date(2024, i).toLocaleString("es-ES", { month: "long" });
                                const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
                                return (
                                    <option key={i} value={i}>
                                        {capitalizedMonth}
                                    </option>
                                );
                            })}
                        </select>
                        <select
                            className="p-2 rounded-[12px] border-2 w-[100px] h-[40px]"
                            value={endYear}
                            onChange={(e) => setEndYear(Number(e.target.value))}
                        >
                            {Array.from({ length: 5 }, (_, i) => {
                                const year = 2023 + i;
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <button
                        disabled={loading}
                        className="bg-blue-500 flex items-center justify-center gap-5  text-white mt-5 p-2 w-[302px] h-[39px] rounded-[27px] cursor-pointer hover:bg-[#0033A0]"
                        onClick={handleDownload}
                    >
                        {loading && (
                            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin "></div>
                        )}
                        Descargar Datos
                    </button>
                </div>
            </div>
        </>
    );
}
