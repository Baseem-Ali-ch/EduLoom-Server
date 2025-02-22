import {
  ChangePasswordDTO,
  ForgetPasswordDTO,
  GoogleAuthDTO,
  InstructoInfoDTO,
  LoginDTO,
  NotificationUpdateStatusDTO,
  RegisterDTO,
  ResendOtpDTO,
  ResetPasswordDTO,
  SendNotificationMailDTO,
  UpdateUserDTO,
  UserDetailsImageDTO,
  VerifyOtpDTO,
} from '../dtos/dto';
import { IUser } from '../interfaces/IUser';

export function MapRegister(dto: RegisterDTO): IUser {
  return {
    email: dto.email,
    password: dto.password,
    userName: dto.userName,
  };
}

export function MapVerifyOtp(dto: VerifyOtpDTO) {
  return {
    email: dto.email,
    otp: dto.otp,
  };
}

export function MapResendOtp(dto: ResendOtpDTO) {
  return {
    email: dto.email,
  };
}

export function MapLogin(dto: LoginDTO) {
  return {
    email: dto.email,
    password: dto.password,
  };
}

export function MapForgetPassword(dto: ForgetPasswordDTO) {
  return {
    email: dto.email,
  };
}

export function MapResetPassword(dto: ResetPasswordDTO) {
  return {
    token: dto.token,
    password: dto.password,
  };
}

export function MapGoogleAuth(dto: GoogleAuthDTO) {
  return {
    token: dto.token,
  };
}

export function MapNotificationUpdateStatus(dto: NotificationUpdateStatusDTO) {
  return {
    status: dto.status,
  };
}

export function MapSendNotificationMail(dto: SendNotificationMailDTO) {
  return {
    userId: dto.userId,
    message: dto.message,
  };
}

export function MapUserDetailsImage(dto: UserDetailsImageDTO) {
  return {
    userId: dto.userId,
  };
}

export function MapUpdateUser(dto: UpdateUserDTO) {
  return {
    userName: dto.userName,
    phone: dto.phone,
  };
}

export function MapChangePassword(dto: ChangePasswordDTO) {
  return {
    currentPassword: dto.currentPassword,
    newPassword: dto.newPassword,
  };
}

export function MapInstructorRequest(dto: InstructoInfoDTO) {
  return {
    userName: dto.userName,
    phone: dto.phone,
    country: dto.country,
    state: dto.state,
    qualification: dto.qualification,
    workExperience: dto.workExperience,
    lastWorkingPlace: dto.lastWorkingPlace,
    specialization: dto.specialization,
  };
}
