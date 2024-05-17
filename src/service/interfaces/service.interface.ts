export interface ServiceInterface {
  namespace: string;
  baseUri?: string;
}

export interface ServiceRequestInterface {
  url?: string;
  method?: string;
  params?: any;
  data?: any;
}