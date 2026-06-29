export interface UserData {
  usr_id: number;
  usr_fname: string;
  usr_lname: string;
  usr_username: string;
  usr_email: string;
  usr_profile: string;
  usr_email_ver_token: string;
  usr_reset_pass_token: string;
  usr_email_verified_at: string;
  usr_provider_id: string | null;
  usr_login_type: string | null;
  usr_status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  role: string;
  usr_profile_img: string;
}

export interface LoginResponseData {
  user: UserData;
  token: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: LoginResponseData;
  token?: string;
  error?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
