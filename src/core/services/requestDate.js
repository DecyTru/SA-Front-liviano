import axios from 'axios';

export const requestDate = async (date) => {

    const URL =  "https://prod-81.westus.logic.azure.com:443/workflows/cfb22f980e804cae86ad4b7faa794050/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Q9J1pmxHdX44r4GHlBU2dgPUI-tKy0tl2Nl86BSdHaE";
    const response = await axios.post(URL, { date });

    return response.data;
};