export interface SignUp {
    email: string
    Mobile: string
    first_name: string
    last_name: string,
    password: string,
    password_confirmation: string
}

export interface Login {
    email: string,
    password: string
}

export interface User {
    id: number,
    email: string
    permissions: string | null,
    last_login: string,
    first_name: string,
    last_name: string,
    location: string | null,
    created_at: string,
    updated_at: string,
    status: number
}

export interface SignUpAndLoginResponse {
    status: number,
    error: string | null,
    message: string,
    User: User
}

export interface ChangePasswordPayload {
  email: string;
  old_password: string;
  new_password: string;
};

export type ChangePasswordResponse = {
  success: boolean;
  message: string;
};


// types.ts (or wherever you keep your types)
export interface UserData {
  id: number;
  email: string;
  permissions: string | null;
  last_login: string;
  first_name: string;
  last_name: string;
  location: string | null;
  created_at: string;
  updated_at: string;
  status: number;
}

export interface RegisterData {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  Mobile: string | null;
  Address: string | null;
  City: string | null;
  State: string | null;
  Country: string | null;
  PinCode: string | null;
  Landmark: string | null;
  Shipping_Address: string | null;
  Shipping_City: string | null;
  Shipping_State: string | null;
  Shipping_Country: string | null;
  Shipping_Landmark: string | null;
  Shipping_PinCode: string | null;
  Gender: string | null;
  Day: string | null;
  Month: string | null;
  Year: string | null;
  term: string | null;
  v_email: string | null;
  company_name: string | null;
  gst_no: string | null;
  pan_no: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface UserDetailsResponse {
  status: number;
  error: string | null;
  message: string;
  Userdata: UserData;
  Registerdata: RegisterData;
}


export interface UpdateProfilePayload {
  email?: string;
  first_name?: string;
  last_name?: string;
  Gender?: string;
  Day?: string;
  Month?: string;
  Year?: string;
  Address?: string;
  City?: string;
  State?: string;
  Landmark?: string;
  PinCode?: string;
  Country?: string;
  Shipping_Address?: string;
  Shipping_City?: string;
  Shipping_State?: string;
  Shipping_Landmark?: string;
  Shipping_PinCode?: string;
  Shipping_Country?: string;
  company_name?: string;
  gst_no?: string;
  pan_no?: string;
}
