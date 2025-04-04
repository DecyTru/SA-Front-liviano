import axios from 'axios';

export const requestUpdate = async (dataUpdate) => {

    const URL = "https://prod-129.westus.logic.azure.com:443/workflows/f791e05ec7ee4382a7b966c0e61ad04b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VU2pimd17aNaubHBxYcwrobd_YA7oXRLBH8qfUe30QQ";
    const response = await axios.post(URL, {dataUpdate});

    return response.data;
};