export interface ISubsType {
    subs_type_id: number;  // Use the same name as in the database
    type: string;
    description: string;
    price: number;
    features: string[];
    is_recomend: boolean;

}

export interface SubstypeResponse {
    status: string;
    msg: string;
    subscriptionstypeAll: ISubsType[];
  }
  
export interface IApiResponse {
    substypes: SubstypeResponse | null;
    ok: boolean;
  }