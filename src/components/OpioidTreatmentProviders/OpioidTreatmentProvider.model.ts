export interface OpioidTreatmentProvider {
  id?:                        string;
  npi?:                       string;
  provider_name?:             string;
  address_line_1?:            string;
  address_line_2?:            string | null;
  city?:                      string;
  state?:                     string;
  zip?:                       string;
  medicare_id_effective_date?:  Date | null;
  phone?:                     string | null;
}