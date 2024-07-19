import axios from 'axios';

const getScraperURL = (): string => {
  const scraperURL = process.env.SCRAPER_URL;
  if (scraperURL === undefined) {
    throw new Error('SCRAPER_URL is not defined');
  }
  return scraperURL;
};

type SantanderRequestBody = {
  rut: string;
  password: string;
};

type CommonWealthRequestBody = {
  client_number: string;
  password: string;
};

type CommonWealthMovements = {
  date: string;
  value_date: string;
  description: string;
  ammount: number;
};

export type CommonWealthReturnData = {
  pending: {
    total: number;
    movements: (CommonWealthMovements & { balance: null })[];
  };
  non_pending: (CommonWealthMovements & { balance: number })[];
};

type SantanderReturnData = {
  movements: string[];
};

export const requestSantanderScrap = async (
  body: SantanderRequestBody
): Promise<SantanderReturnData> => {
  const url = `${getScraperURL()}/santander`;
  const response = await axios.post<SantanderReturnData>(url, body);
  return response.data;
};

export const requestCommonWealthScrap = async (
  body: CommonWealthRequestBody
): Promise<CommonWealthReturnData> => {
  const url = `${getScraperURL()}/common-wealth`;
  const response = await axios.post<CommonWealthReturnData>(url, body);
  return response.data;
};
