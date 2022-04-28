/**
 * Performs basic login.  If using the the SDK, use the init() function instead.  This is mostly used for testing.
 * @param tsurl The URL for the ThoughtSpot cluster.
 * @param username The username to log into the system.
 * @param password The password for the user.
 * @param rememberme Causes the login to be remembered if true. Defaults to false.
 * @returns {Promise<void>} A promise for the login.  Await to make sure the user is logged in.
 */
export const tsLogin = async (tsurl, username, password, rememberme=false) => {
  console.log(`Logging into ThoughtSpot as ${username}`);
  const loginURL = cleanURL(tsurl) + "/callosum/v1/tspublic/v1/session/login";

  // TODO this is common.  Extract as a helper function.
  const apiData = {
    "username": username,
    "password": password
  };

  let formBody = [];
  for (const k of Object.keys(apiData)) {
    const key = encodeURIComponent(k);
    const value = encodeURIComponent(apiData[k]);
    formBody.push(`${k}=${value}`);
  }
  formBody = formBody.join("&");

  await fetch(loginURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'X-Requested-By': 'ThoughtSpot'
    },
    credentials: 'include',
    body: formBody
  })
    .then(response => console.log("Logged into ThoughtSpot"))
    .catch(error => console.error(error));
}
/**
 * Calls the search data API and returns a promise that can be used to get the search data JSON object.
 * Example:
      getSearchData(tsurl, worksheetId, search).then((response) => {
          const searchData = SearchData.createFromJSON(response);
          const html = tabularDataToHTML(searchData);
          // display the table in the application.
      });
 * @param tsurl The URL for the ThoughtSpot cluster.
 * @param worksheetId The GUID for the worksheet to search against.
 * @param search The search using the proper format (see TS documentation).
 * @returns {Promise<any|void>} A promise that will return the data in JSON form.
 */
export const getSearchData = async (tsurl, worksheetId, search) => {
  console.log(`Getting data from the SearchAPI from worksheet ${worksheetId} with search ${search}`);
  let getSearchDataURL = `${cleanURL(tsurl)}/callosum/v1/tspublic/v1/searchdata?`;
  getSearchDataURL += `"batchSize=-1&data_source_guid=${worksheetId}&query_string=${search}`;

  return await fetch(
    encodeURI(getSearchDataURL), {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "X-Requested-By": "ThoughtSpot"
      },
      credentials: "include",
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(`Error getting search data ${error}`));
}

/**
 * Calls the ThoughtSpot logout service.
 * @param tsurl The URL for the ThoughtSpot cluster.
 * @returns {Promise<void>} The call to complete the logout.  Can usually be ignored.
 */
export const tsLogout = async (tsurl) => {
  console.log("Logging out from ThoughtSpot");
  const logoutURL = cleanURL(tsurl) + "/callosum/v1/tspublic/v1/session/logout";

  await fetch(logoutURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-By': 'ThoughtSpot'
    },
    credentials: 'include'
  })
    .then(response => console.log("Logged out from ThoughtSpot"))
    .catch(error => console.error(error));
}

/**
 * Returns the session info, which includes information about the user and the cluster.
 * @param tsurl The URL for the TS cluster.
 * @returns {Promise<any>}  A promise with JSON that has the info.
 */
export const getSessionInfo = async (tsurl) => {
  //const sessionInfoURL = cleanURL(tsurl) + "/callosum/v1/tspublic/v1/session/info";  // this will be in oct.cl
  const sessionInfoURL = cleanURL(tsurl) + "/callosum/v1/session/info";

  return await fetch(
    sessionInfoURL, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "X-Requested-By": "ThoughtSpot"
      },
      credentials: "include"
    })
    .then(response =>  response.json())
    .catch(error => {
      console.error("Unable to get the session info: " + error)
    });

}

/**
 * Cleans up the URL for the API.
 * @param url The url to clean.
 * @returns {string|*}  The cleaned URL.
 */
const cleanURL = (url) => {
  return (url.endsWith("/")) ? url.substr(0, url.length - 1) : url
}