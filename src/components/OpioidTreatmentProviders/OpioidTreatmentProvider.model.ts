export interface OpioidTreatmentProvider {
    id?:                        string | undefined;
    npi?:                       string | undefined;
    provider_name?:             string | undefined;
    address_line_1?:            string | undefined;
    address_line_2?:            string | null | undefined;
    city?:                      string | undefined;
    state?:                     string | undefined;
    zip?:                       string | undefined;
    medicare_id_effective_date?:  Date | null | undefined;
    phone?:                     string | null | undefined;
  }

//   const data: {
//     state?: string | undefined;
//     id?: string | undefined;
//     city?: string | undefined;
//     npi?: string | undefined;
//     provider_name?: string | undefined;
//     address_line_1?: string | undefined;
//     address_line_2?: string | ... 1 more ... | undefined;
//     zip?: string | undefined;
//     medicare_id_effective_date?: Date | ... 1 more ... | undefined;
//     phone?: string | ... 1 more ... | undefined;
// } | undefined