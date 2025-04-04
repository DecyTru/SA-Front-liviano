import { useNavigate} from "react-router-dom";
import TrabajoEnEquipo from "../assets/TrabajoEnEquipo.png";

export  function MenuPage() {
    const navigate = useNavigate();

    const handleDownload = () => {
        navigate("/download");
    };

    const handleSearchPage = () => {
        navigate("/search-page");
    }

    const handleUpload = () => {
        navigate("/upload");
    }

    return (
        <>
            <div className=" p-10  flex flex-col justify-center items-center">
                <h1 className={"text-[35px] text-[#0033A0] font-bold mt-5"}>Bienvenido</h1>
                <p className={"text-[16px] mt-5"}> Elija la opción deseada</p>
                <img src={TrabajoEnEquipo} className={"w-[200px] h-[200px] mt-10"} alt="TrabajoEnEquipo"/>
                <div className="flex flex-col mt-10">
                    <button onClick={handleSearchPage} className={"bg-blue-500 text-white p-2 m-2 rounded-[27px] h-[56px] w-[425px] cursor-pointer hover:bg-[#0033A0]"}>Consulta y edición de datos</button>
                    <button onClick={handleDownload} className={"bg-blue-500 text-white p-2 m-2 rounded-[27px] h-[56px] w-[425px] cursor-pointer hover:bg-[#0033A0]"}>Descarga de base de datos</button>
                    <button onClick={handleUpload} className={"bg-blue-500 text-white p-2 m-2 rounded-[27px] h-[56px] w-[425px] cursor-pointer hover:bg-[#0033A0]"}>Carga de datos de pólizas colectivas</button>
                </div>
                <a className=" text-gray-600 hover:text-red-500 hover:cursor-pointer">Tengo inconvenientes con la herramienta</a>
            </div>
        </>
    );
};
