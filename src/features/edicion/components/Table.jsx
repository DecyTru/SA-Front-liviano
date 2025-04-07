import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import { requestUpdate } from "../../../core/services/requestUpdate"; // Importar la función requestUpdate

// Removed unused import
export default function Table({ data }) {
    const mascotas = data.Asegurado.Mascotas?.flat() || [];
    const pagoAsesor = data.Asegurado.PagoAsesor?.flat() || [];
    const [mascotasData, setMascotasData] = useState(mascotas);
    const [pagoAsesorData, setPagoAsesorData] = useState(pagoAsesor);
    const [showInfo, setShowInfo] = useState({ poliza: false, mascotas: false, pagoAsesor: false });
    const [editable, setEditable] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState("SaludPerros");

    const [aseguradoData, setAseguradoData] = useState({
        NombreAseguradoCompleto: data.Asegurado.NombreAseguradoCompleto,
        NumeroIdAsegurado: data.Asegurado.NumeroIdAsegurado,
        PrimerApellidoAsegurado: data.Asegurado.PrimerApellidoAsegurado,
        SegundoApellidoAsegurado: data.Asegurado.SegundoApellidoAsegurado,
        SexoAsegurado: data.Asegurado.SexoAsegurado,
        Telefono: data.Asegurado.Telefono,
        Email: data.Asegurado.Email,
        Direccion: data.Asegurado.Direccion,
        Ciudad: data.Asegurado.Ciudad
    });
    const [loading, setLoading] = useState(false);

    const today = new Date();
    const currentMonth = today.getMonth() + 1; 
    const currentDay = today.getDate();

   
    const checkAndUpdateMascotaAge = () => {
        const formatSharePointDate = (dateString) => {
            if (!dateString) return "";
            const [datePart] = dateString.split(" "); // Separate date and time
            const parts = datePart.split("/");
            if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
            }
            return dateString; // Return original if format is unexpected
        };
        const updatedMascotas = mascotasData.map(mascota => {
            const birthDate = new Date(mascota.FechaNacimiento); 
            const birthMonth = birthDate.getMonth() + 1;
            const birthDay = birthDate.getDate();

            if (birthMonth === currentMonth && birthDay === currentDay) {
                mascota = { ...mascota, Edad: mascota.Edad + 1 };
            }

            return mascota;
        });
        setMascotasData(updatedMascotas);
    };


    const razasPerros = ["Afgano","Airedale Terrier","Akita","Akita Americano","Alaskan Malamute","American Bully","American Pitt Bull Terrier","American Staffordshire Terrier","American Water Spaniel","Antiguo Pastor Inglés","Australian Labradoodle","Barzoi","Basenji","Basset Azul de Gaseogne","Basset Hound","Basset leonado de Bretaña","Beagle","Bearded Collie","Beauceron","Berger Blanc Suisse","Bernés Boyero de Montaña","Bichón Frisé","Bichón Habanero","Bichón Maltés","Bloodhound","Bobtail","Border Collie","Border Terrier","Borzoi","Boston Terrier","Boxer","Boyero Australiano","Boyero de Flandes","Braco Alemán","Braco de Weimar","Braco Húngaro","Brazilian Shorthair","Briard","Bull Terrier","Bulldog Americano","Bulldog Francés","Bulldog Inglés","Bullmastiff","Ca de Bou","Ca mè mallorquí","Cane Corso","Caniche","Cavalier King Charles Spaniel","Chien de Saint Hubert","Chihuahua","Chino Crestado","Chow Chow","Cirneco del Etna","Cockapoo","Cocker Spaniel Americano","Cocker Spaniel Inglés","Collie","Corgi","Corgi galés","Coton de Tuléar","Criollo","Dachshund","Dálmata","Deutsch Drahthaar","Deutsch Kurzhaar","Dobermann","Dogo Alemán","Dogo Argentino","Dogo Canario","Dogo de Burdeos","Drahthaar","English Springer Spaniel","Epagneul Bretón","Eurasier","Fila Brasileiro","Fox Terrier","Foxhound Americano","Foxhound Inglés","French poodle o caniche","Galgo Afgano","Galgo Español","Galgo Italiano","Galgo Ruso","Gigante de los Pirineos","Golden Retriever","Goldendoodle","Gos d'Atura","Gran Danés","Gran Perro Japonés","Grifón de Bruselas","Husky Siberiano","Irish Wolfhound","Jack Russel","Japanes Chin","Kelpie","Kelpie Australiano","Kerry Blue","Komondor","Kuvasz","Labradoodle","Labrador Retriever","Laika de Siberia Occidental","Laika Ruso-europeo","Lebrel ruso","Leonberger","Lhasa Apso","Magyar Vizsla","Maltés","Maltipoo","Mastín del Alentejo","Mastín del Pirineo","Mastin del Tibet","Mastín Español","Mastín Napolitano","Mucuchies","Norfolk Terrier","Otro","Ovtcharka","Pachón Navarro","Parson Russell Terrier","Pastor Alemán","Pastor americano miniatura","Pastor Australiano","Pastor Australiano Ganadero","Pastor Australiano Ovejero","Pastor Belga","Pastor Blanco Suizo","Pastor Collie","Pastor de Beauce","Pastor de Brie","Pastor de los Pirineos","Pastor de Shetland","Pastor del Cáucaso","Pastor Holandés","Pastor Inglés","Pekinés","Perdiguero Burgos","Perdiguero Chesapeake Bay","Perdiguero de Drentse","Perdiguero de Pelo lido","Perdiguero de pelo rizado","Perdiguero Portugués","Perro Crestado Chino","Perro de Aguas","Perro sin pelo de Mexico","Perro sin pelo del Perú","Pinscher miniatura","Pitbull","Podenco Andaluz","Podenco Ibicenco","Podenco Portugués","Pointer","Pomerania","Pomsky","Poodle Mix","Presa canario","Presa Mallorquin","Pug o Carlino","Rafeiro do Alentejo","Rhodesian Ridgeback","Rottweiler","Rough Collie","Sabueso Español","Sabueso Fino Colombiano","Sabueso Hélenico","Sabueso Italiano","Sabueso Suizo","Saint Hubert","Saluki","Samoyedo","San Bernardo","Schnauzer","Schnoodle","Scottish Terrier","Sealyhalm Terrier","Setter Gordon","Setter Irlandés","Shar Pei","Shiba","Shiba Inu","Shih Tzu","Siberian Husky","Smooth Collie","Spaniel Japonés","Spinone Italiano","Spitz Alemán","Springer Spaniel Inglés","Staffordshire Bull Terrier","Teckel","Teckel o Dachshund","Terranova","Terrier Australiano","Terrier Escocés","Terrier Irlandés","Terrier Japonés","Terrier Negro Ruso","Terrier Norfolk","Terrier Ruso","Tibetan Terrier","Tosa Japonés","Vizsla","Weimaraner","Welhs Terrier","West Highland Terrier","Wolfspitz","Xoloitzquintle","Yorkshire Terrier"];
    const razasGatos = ["Abisinio","Africano doméstico","Angora turco","Azul ruso","Balinés","Bambino","Bengalí","Birmano","Bombay","Bosque de Noruega","Brivon de pelo corto","Brivon de pelo largo","Burmés","Burmilla","California Spangled","Chartreux","Cornish rex","Criollo","Curl Americano","Cymric","Devon rex","Don Sphynx","Dorado africano","Dragon Li","Esfinge o Sphynx","Exótico de pelo corto","Fold Escocés","FoldEx","Gato Carey","Gato común europeo","Gato europeo bicolor","Gato rojo","German Rex","Habana brown","Himalayo","Khao Manee","Kohana","Korat","Maine Coon","Manx","Mau egipcio","Munchkin","Ocicat","Oriental","Oriental de pelo largo","Pelo de alambre americano","Pelocorto americano","Pelocorto brasilero","Pelocorto británico","Pelolargo británico","Persa","Peterbald","Pixie Bob","Rabicorto Bobtail japonés","Ragdoll","Sagrado de Birmania","Savannah","Selkirk rex","Serengeti","Seychellois","Siamés","Siberiano","Snowshoe","Somalí","Tabby","Tonkinés","Toyger","Van Turco"];

    const toggleSection = (section) => {
        setShowInfo((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleMascotaChange = (e, index, key, isProducto = false) => {
        const { value } = e.target;
        setMascotasData((prevMascotas) => {
            const newMascotas = [...prevMascotas];
            
            if (isProducto) {
                newMascotas[index] = { ...newMascotas[index], Producto: value }; // Actualiza solo el producto
            } else {
                newMascotas[index] = { ...newMascotas[index], [key]: value }; // Actualiza otros campos de la mascota
            }  
            return newMascotas;
        });
    };
    

    const handleAseguradoChange = (e, key) => {
        setAseguradoData((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

 
    const handlePagoAsesorChange = (e, index, key) => {
        const { value } = e.target;
    
        setPagoAsesorData((prevPagoAsesor) => {
            const newPagoAsesor = [...prevPagoAsesor];
    
            if (key === "InicioDeVigencia") {
                if (value) {
    
                    const [date, time] = value.split("T"); 
                    if (date && time) {
                        const [year, month, day] = date.split("-");
                        const [hour, minute] = time.split(":");
    
                        const formattedDateTime = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year} ${hour % 12 || 12}:${minute} ${hour >= 12 ? 'p. m.' : 'a. m.'}`;
                        
                        newPagoAsesor[index] = { 
                            ...newPagoAsesor[index], 
                            [key]: formattedDateTime
                        };
                    }
                } else {
                    newPagoAsesor[index] = { 
                        ...newPagoAsesor[index], 
                        [key]: ""
                    };
                }
            } else if (value) {
                newPagoAsesor[index] = { 
                    ...newPagoAsesor[index], 
                    [key]: value
                };
            }
    
            return newPagoAsesor;
        });
    };;
    

    const handleProductoChange = (e) => {
        setProductoSeleccionado(e.target.value);
    };

    const handleUpload = async () => {
        const dataToSend = {
            asegurado: aseguradoData,
            pagoAsesor: pagoAsesorData,
            mascotas: mascotasData,
        };
    
    setLoading(true);

        try {
            const response = await requestUpdate(dataToSend);

            if (!response) {
                throw new Error("No se recibió respuesta de la API.");
            }

            Swal.fire({
                icon: "success",
                title: "Enviado correctamente",
                text: "Los datos han sido enviados con éxito.",
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error("Error al enviar la información:", error);
            Swal.fire({
                icon: "error",
                title: "Error en la solicitud",
                text: error.message || "Ocurrió un error inesperado.",
            });
        }finally {
            setLoading(false);
        }
    };

console.log(mascotasData);
console.log(aseguradoData);
    return (
        <div className="space-y-4 mx-30 py-20">
    <h2 className="text-[#2D6DF6] font-bold text-[18px]">Resultados de búsqueda</h2>
    <p><strong>Cédula:</strong> {aseguradoData.NumeroIdAsegurado}</p>
    <div className="border-1 border-[#81B1FF] rounded-[24px] bg-white py-4 px-6">

        {/* Información de la póliza */}
        <div>
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("poliza")}
            >
                <h2 className="text-[16px] font-bold text-[#0033A0]">
                    Información de la póliza
                </h2>
                <FaChevronDown
                    className={`transition-transform text-[#0033A0] h-9 w-9 ${showInfo.poliza ? "rotate-180" : ""}`}
                />
            </div>

            {showInfo.poliza && (
                <>
                    <div className="flex justify-end absolute right-36 mt-2">
                        <button
                            className="bg-[#F8F8F8] p-3 rounded-[28px] flex items-center justify-center"
                            onClick={() => setEditable(!editable)}
                        >
                            <CiEdit className="text-[#888B8D] w-6 h-6" />
                        </button>
                    </div>

                    <div className="grid justify-start ml-5 gap-y-5 mt-4">
                        {Object.entries(aseguradoData).map(([key, value]) => (
                            key !== "InicioDeVigencia" && key !== "FinDeVigencia" && (
                                <div key={key} className="grid grid-cols-2 items-center">
                                    <span className="font-bold text-[#0033A0] text-right pr-4">
                                        {key.replace(/([A-Z])/g, " $1")}:
                                    </span>
                                    {key === "SexoAsegurado" ? (
                                        <select
                                            value={value}
                                            onChange={(e) => handleAseguradoChange(e, key)}
                                            disabled={!editable}
                                            className={`border p-2 rounded-[20px] px-6 transition-all duration-200 ${
                                                editable ? "bg-white text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            }`}
                                            style={{
                                                height: '50px',
                                                width: '300px' 
                                            }}
                                        >
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            name={key}
                                            value={value || ""}
                                            onChange={(e) => handleAseguradoChange(e, key)}
                                            disabled={!editable}
                                            className={`border p-2 rounded-[20px] px-6 transition-all duration-200 ${
                                                editable ? "bg-white text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            }`}
                                            style={{
                                                height: '50px',
                                                width: '300px' 
                                            }}
                                        />
                                            )}
                                        </div>
                                    )
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Información de la mascota */}
                <div className={'mt-5'}>
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("mascotas")}
                >
                    <h2 className="text-[16px] font-bold text-[#0033A0]">
                        Información de la(s) mascota(s)
                    </h2>
                    <FaChevronDown
                        className={`transition-transform text-[#0033A0] h-9 w-9 ${showInfo.mascotas ? "rotate-180" : ""}`}
                    />
                </div>

                {showInfo.mascotas && (
                    <>
                        <div className="flex justify-end absolute right-36 mt-2">
                            <button
                                className="bg-[#F8F8F8] p-3 rounded-[28px] flex items-center justify-center"
                                onClick={() => setEditable(!editable)}
                            >
                                <CiEdit className="text-[#888B8D] w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid justify-start ml-1 gap-y-10 mt-4">
                            {mascotasData.map((mascota, index) => (
                                <div key={index} className="pt-5">
                                    {Object.entries(mascota).map(([key, value]) => {
                                        const fieldKey = `${index}-${key}`;
                                        if (key === 'Producto') {
                                            return null; 
                                        }
                                        return (
                                            <div key={fieldKey} className="grid grid-cols-2 items-center mb-5">
                                                <span className="font-bold text-[#0033A0] text-right pr-3">
                                                    {key.replace(/([A-Z])/g, " $1")}:
                                                </span>
                                                    {key === "Sexo" ? (
                                                        <select
                                                            value={value}
                                                            onChange={(e) => handleMascotaChange(e, index, key)}
                                                            disabled={!editable}
                                                            className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${
                                                                editable ? "bg-white text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            }`}
                                                            style={{
                                                                height: '50px',  
                                                                width: '300px' 
                                                            }}
                                                        >
                                                            <option value="Hembra">Hembra</option>
                                                            <option value="Macho">Macho</option>
                                                        </select>
                                                    ) : key === "Edad" ? (
                                                        <select
                                                            value={value}
                                                            onChange={(e) => handleMascotaChange(e, index, key)}
                                                            disabled={!editable}
                                                            className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${
                                                                editable ? "bg-white text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            }`}
                                                            style={{
                                                                height: '50px', 
                                                                width: '300px'  
                                                            }}
                                                        >
                                                            <option value="De 4 meses a 1 año">De 4 meses a 1 año</option>
                                                            <option value="1 años">1 año</option>
                                                            <option value="2 años">2 años</option>
                                                            <option value="3 años">3 años</option>
                                                            <option value="4 años">4 años</option>
                                                            <option value="5 años">5 años</option>
                                                            <option value="6 años">6 años</option>
                                                            <option value="7 años">7 años</option>
                                                        </select>
                                                    ) : key === "Raza" ? (
                                                        <select
                                                            value={mascotasData[index]?.Raza || value}
                                                            onChange={(e) => handleMascotaChange(e, index, key)}
                                                            disabled={!editable}
                                                            className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${
                                                                editable ? "bg-white text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            }`}
                                                            style={{
                                                                height: '50px',  
                                                                width: '300px'   
                                                            }}
                                                        >
                                                            {mascotasData[index]?.Producto === "SaludPerros" ? (  // Razas para perros
                                                                razasPerros.map((raza) => <option key={raza} value={raza}>{raza}</option>)
                                                            ) : (  // Razas para gatos
                                                                razasGatos.map((raza) => <option key={raza} value={raza}>{raza}</option>)
                                                            )}
                                                        </select>
                                                    ) : key === "FechaDeNacimientoMascota" ? (
                                                        <input
                                                            type="datetime-local"
                                                            value={
                                                                mascota.FechaDeNacimientoMascota
                                                                    ? new Date(mascota.FechaDeNacimientoMascota).toISOString().slice(0, 16) // Formato correcto
                                                                    : ""
                                                            }
                                                            onChange={(e) => handleMascotaChange(e, index, key)}
                                                            disabled={!editable}
                                                            className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${
                                                                editable ? "bg-white text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            }`}
                                                            style={{
                                                                height: "50px",
                                                                width: "300px",
                                                            }}
                                                        />
                                                    ) : key !== "FechaNacimiento" ? ( // Exclude "FechaNacimiento"
                                                        <input
                                                            type="text"
                                                            value={value}
                                                            onChange={(e) => handleMascotaChange(e, index, key)}
                                                            disabled={!editable}
                                                            className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${
                                                                editable ? "bg-white text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            }`}
                                                            style={{
                                                                height: "50px",
                                                                width: "300px",
                                                            }}
                                                        />
                                                    ) : null}
                                                    
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Información de pago y asesor */}
                <div className={'mt-5'}>
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("pagoAsesor")}>
                        <h2 className="text-[16px] font-bold text-[#0033A0]">Información de pago y asesor</h2>
                        <FaChevronDown
                            className={`transition-transform text-[#0033A0] h-9 w-9 ${showInfo.mascotas ? "rotate-180" : ""}`}
                        />
                    </div>

                    {showInfo.pagoAsesor && (
                        <>
                            <div className="flex justify-end absolute right-36 mt-2">
                                <button
                                    className="bg-[#F8F8F8] p-3 rounded-[28px] flex items-center justify-center"
                                    onClick={() => setEditable(!editable)}
                                >
                                    <CiEdit className="text-[#888B8D] w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid justify-start ml-1 gap-y-15 mt-4">
                                {pagoAsesorData.map((pagoAsesor, index) => (
                                    <div key={index}>
                                        {Object.entries(pagoAsesor).map(([key, value]) => {
                                            const fieldKey = `${index}-${key}`;
                                            return (
                                                <div key={fieldKey} className="grid grid-cols-2 items-center mb-5">
                                                    <span className="font-bold text-[#0033A0] text-right pr-4">
                                                        {key.replace(/([A-Z])/g, " $1")}:
                                                    </span>
                                                    {key === "Estado" ? (
                                                        <select
                                                            value={value}
                                                            onChange={(e) => handlePagoAsesorChange(e, index, key)}
                                                            disabled={!editable}
                                                            className={`border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200 ${
                                                                editable ? "bg-white text-black h-20" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            }`}
                                                            style={{
                                                                height: '50px',  
                                                                width: '300px'   
                                                            }}
                                                        >
                                                            <option value="Vigente">Vigente</option>
                                                            <option value="Cancelado">Cancelado</option>
                                                            <option value="Suspendido">Suspendido</option>
                                                            <option value="En Carencia">En carencia</option>
                                                        </select>
                                                    ) : key === "Plan" ? (
                                                        <select
                                                            value={value}
                                                            onChange={(e) => handlePagoAsesorChange(e, index, key)}
                                                            disabled={!editable}
                                                            className={`border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200 ${
                                                                editable ? "bg-white text-black h-20" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            }`}
                                                            style={{
                                                                height: '50px',  
                                                                width: '300px'   
                                                            }}
                                                        >
                                                            <option value="Clásico">Clásico</option>
                                                            <option value="Global">Global</option>
                                                            <option value="Esencial">Esencial</option>
                                                        </select>
                                                   
                                                    ) : key === "Producto" ? (
                                                        <select
                                                            value={mascotasData[index]?.Producto || "SaludPerros"} // Producto por defecto
                                                            onChange={(e) => handleMascotaChange(e, index, "Producto", true)} // Indicamos que es el cambio del producto
                                                            className={`border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200 ${
                                                                editable ? "bg-white text-black h-20" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            }`}
                                                            style={{
                                                                height: '50px',
                                                                width: '300px'
                                                            }}
                                                        >
                                                            <option value="SaludPerros">Salud para perros</option>
                                                            <option value="SaludGatos">Salud para gatos</option>
                                                        </select>
                                                
                                                    ) : key === "InicioDeVigencia" ? (
                                                        !editable ? (
                                                            <input
                                                                type="text"
                                                                value={pagoAsesor.InicioDeVigencia
                                                                    ? (() => {
                                                                        const rawValue = pagoAsesor.InicioDeVigencia;

                                                                        // Intentamos convertir el dato a un objeto Date
                                                                        const date = new Date(rawValue);
                                                                        if (!isNaN(date.getTime())) {
                                                                            // Si es una fecha válida, formateamos
                                                                            const day = date.getDate();
                                                                            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0 a 11
                                                                            const year = date.getFullYear();
                                                                            let hour = date.getHours();
                                                                            const minute = date.getMinutes().toString().padStart(2, '0');
                                                                            const period = hour >= 12 ? 'p. m.' : 'a. m.';
                                                                            hour = hour % 12 || 12; // Convertir a formato de 12 horas
                                                                            return `${day}/${month}/${year} ${hour}:${minute} ${period}`;
                                                                        }

                                                                        // Si no es una fecha válida, mostramos un mensaje
                                                                        return "Formato inválido";
                                                                    })()
                                                                    : "Sin datos" // Si no hay datos, mostramos "Sin datos"
                                                                }
                                                                disabled
                                                                className={`${editable ? "bg-white text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"} border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200`}
                                                                style={{
                                                                    height: '50px',
                                                                    width: '300px'
                                                                }}
                                                            />
                                                        ) : (
                                                            <input
                                                                type="datetime-local"
                                                                value={pagoAsesor.InicioDeVigencia
                                                                    ? (() => {
                                                                        const date = new Date(pagoAsesor.InicioDeVigencia);
                                                                        if (!isNaN(date.getTime())) {
                                                                            const year = date.getFullYear();
                                                                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                                                            const day = date.getDate().toString().padStart(2, '0');
                                                                            const hours = date.getHours().toString().padStart(2, '0');
                                                                            const minutes = date.getMinutes().toString().padStart(2, '0');
                                                                            return `${year}-${month}-${day}T${hours}:${minutes}`;
                                                                        }
                                                                        return ""; // Si no es una fecha válida, devolvemos vacío
                                                                    })()
                                                                    : ""
                                                                }
                                                                onChange={(e) => {
                                                                    const newValue = e.target.value; // Valor en formato ISO (YYYY-MM-DDTHH:mm)
                                                                    handlePagoAsesorChange({ target: { value: newValue } }, index, "InicioDeVigencia");
                                                                }}
                                                                disabled={!editable}
                                                                className={`${editable ? "bg-white text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"} border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200`}
                                                                style={{
                                                                    height: '50px',
                                                                    width: '300px'
                                                                }}
                                                            />
                                                        )
                                                    ) : key === "FinDeVigencia" ? (
                                                        !editable ? (
                                                            <input
                                                                type="text"
                                                                value={pagoAsesor.FinDeVigencia
                                                                    ? (() => {
                                                                        const rawValue = pagoAsesor.FinDeVigencia;
                                                    
                                                                        // Intentamos convertir el dato a un objeto Date
                                                                        const date = new Date(rawValue);
                                                                        if (!isNaN(date.getTime())) {
                                                                            // Si es una fecha válida, formateamos
                                                                            const day = date.getDate();
                                                                            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0 a 11
                                                                            const year = date.getFullYear();
                                                                            let hour = date.getHours();
                                                                            const minute = date.getMinutes().toString().padStart(2, '0');
                                                                            const period = hour >= 12 ? 'p. m.' : 'a. m.';
                                                                            hour = hour % 12 || 12; // Convertir a formato de 12 horas
                                                                            return `${day}/${month}/${year} ${hour}:${minute} ${period}`;
                                                                        }
                                                    
                                                                        // Si no es una fecha válida, mostramos un mensaje
                                                                        return "Formato inválido";
                                                                    })()
                                                                    : "Sin datos" // Si no hay datos, mostramos "Sin datos"
                                                                }
                                                                disabled
                                                                className={`${editable ? "bg-white text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"} border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200`}
                                                                style={{
                                                                    height: '50px',
                                                                    width: '300px'
                                                                }}
                                                            />
                                                        ) : (
                                                            <input
                                                                type="datetime-local"
                                                                value={pagoAsesor.FinDeVigencia
                                                                    ? (() => {
                                                                        const date = new Date(pagoAsesor.FinDeVigencia);
                                                                        if (!isNaN(date.getTime())) {
                                                                            const year = date.getFullYear();
                                                                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                                                            const day = date.getDate().toString().padStart(2, '0');
                                                                            const hours = date.getHours().toString().padStart(2, '0');
                                                                            const minutes = date.getMinutes().toString().padStart(2, '0');
                                                                            return `${year}-${month}-${day}T${hours}:${minutes}`;
                                                                        }
                                                                        return ""; // Si no es una fecha válida, devolvemos vacío
                                                                    })()
                                                                    : ""
                                                                }
                                                                onChange={(e) => {
                                                                    const newValue = e.target.value;
                                                                    handlePagoAsesorChange({ target: { value: newValue } }, index, "FinDeVigencia");
                                                                }}
                                                                disabled={!editable}
                                                                className={`${editable ? "bg-white text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"} border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200`}
                                                                style={{
                                                                    height: '50px',
                                                                    width: '300px'
                                                                }}
                                                            />
                                                        )
                                                    ) : (
                                                        <input
                                                        type="text"
                                                        value={value}
                                                        onChange={(e) => handleMascotaChange(e, index, key)}
                                                        disabled={!editable}
                                                        className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${
                                                            editable ? "bg-white text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                        }`}
                                                        style={{
                                                            height: '50px',
                                                            width: '300px'
                                                        }}
                                                    />
                                                )}
                                                    
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            {editable && (
                <div className="flex justify-center mt-5">
                <button 
                    onClick={handleUpload} 
                    className="bg-[#0033A0] text-white py-2 px-4 rounded-full"
                    disabled={loading} 
                >
                    {loading ? (
                        <div style={{border: "4px solid #f3f3f3", borderTop: "4px solid #3498db", borderRadius: "50%", width: "24px", height: "24px", animation: "spin 2s linear infinite"}}></div>
                    ) : (
                        "Guardar"
                    )}
                </button>
            </div>
        )}
        </div>
    );
}
