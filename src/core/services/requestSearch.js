import axios from 'axios';

export const requestSearch = async (searchData) => {

    const URL =  "https://prod-96.westus.logic.azure.com:443/workflows/785288beb63545e280a2f0d89adccc1a/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=O-li5msPKKrFQEZU-pJyT6v3LZlmGr6HiSuiZtcL00g";
    const response = await axios.post(URL, {searchData});

    return response.data;
};