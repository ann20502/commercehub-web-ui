
const REGION_CODE_TIMEZONE = {
  "SG": "Asia/Kuala_Lumpur",
  "MY": "Asia/Kuala_Lumpur",
  "VN": "Asia/Bangkok",
  "TW": "Asia/Taipei",
  "PH": "Asia/Manila",
  "TH": "Asia/Bangkok",
  "ID": "Asia/Jakarta",
  "BR": "",
  "MX": "",
  "CO": "",
  "CL": "",
  "PL": "",
  "ES": "",
  "FR": "",
  "IN": "Asia/Kolkata"
};

export const getTimeZoneByRegion = (region) => {

  return REGION_CODE_TIMEZONE[region];

}
