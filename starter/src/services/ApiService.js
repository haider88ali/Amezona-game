import { API_BASE_URL } from 'configs/AppConfig';

const Api = (url, method, formdata, query, params = {}) => {
  const formData = new FormData();
  Object.entries(formdata).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Constructing query parameters
  let queryParams = '';
  if (query) {
    const queryArr = [];
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        queryArr.push(`${key}=${query[key]}`);
      }
    }
    queryParams = `?${queryArr.join('&')}`;
  }

  // Constructing final URL
  const finalUrl = `${API_BASE_URL}${url}${queryParams}`;

  // Fetch options
  const options = {
    method: method.toUpperCase(),
    headers: {
      // Add headers here if needed
    },
    // Body for POST requests
    body: method.toUpperCase() === 'POST' ? formData : undefined,
  };

  // Return the fetch promise
  return new Promise((resolve, reject) => {
    fetch(finalUrl, options)
      .then(response => {
        // Handle HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse JSON response
        return response.json();
      })
      .then(data => {
        // Resolve with data
        resolve(data);
      })
      .catch(error => {
        // Reject with error
        reject(error);
      });
  });
};

export default Api;
