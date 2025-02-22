import { ObjectId } from 'mongoose';

export class RegisterDTO {
  email: string;
  password: string;
  userName: string;

  constructor(data: Partial<RegisterDTO>) {
    this.email = data.email?.trim().toLowerCase() || '';
    this.password = data.password || '';
    this.userName = data.userName?.trim() || '';
  }
}

export class VerifyOtpDTO {
  email: string;
  otp: string;

  constructor(data: Partial<VerifyOtpDTO>) {
    this.email = data.email?.trim().toLowerCase() || '';
    this.otp = data.otp || '';
  }
}

export class ResendOtpDTO {
  email: string;

  constructor(data: Partial<ResendOtpDTO>) {
    this.email = data.email?.trim().toLowerCase() || '';
  }
}

export class LoginDTO {
  email: string;
  password: string;

  constructor(data: Partial<LoginDTO>) {
    this.email = data.email?.trim().toLowerCase() || '';
    this.password = data.password || '';
  }
}

export class ForgetPasswordDTO {
  email: string;

  constructor(data: Partial<ForgetPasswordDTO>) {
    this.email = data.email?.trim().toLowerCase() || '';
  }
}

export class ResetPasswordDTO {
  token: string;
  password: string;

  constructor(data: Partial<ResetPasswordDTO>) {
    this.token = data.token || '';
    this.password = data.password || '';
  }
}

export class GoogleAuthDTO {
  token: string;

  constructor(data: Partial<GoogleAuthDTO>) {
    this.token = data.token || '';
  }
}

export class NotificationUpdateStatusDTO {
  status: boolean;

  constructor(data: Partial<NotificationUpdateStatusDTO>) {
    this.status = data.status || false;
  }
}

export class SendNotificationMailDTO {
  userId: ObjectId | string;
  message: string;

  constructor(data: Partial<SendNotificationMailDTO>) {
    this.userId = data.userId || '';
    this.message = data.message || '';
  }
}

export class UserDetailsImageDTO {
  userId: ObjectId | string;

  constructor(data: Partial<UserDetailsImageDTO>) {
    this.userId = data.userId || '';
  }
}

export class UpdateUserDTO {
  userName: string;
  phone: string;

  constructor(data: Partial<UpdateUserDTO>) {
    this.userName = data.userName || '';
    this.phone = data.phone || '';
  }
}

export class ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;

  constructor(data: Partial<ChangePasswordDTO>) {
    this.currentPassword = data.currentPassword || '';
    this.newPassword = data.newPassword || '';
  }
}

export class InstructoInfoDTO {
  userName: string;
  phone: string;
  country: string;
  state: string;
  qualification: string;
  workExperience: string;
  lastWorkingPlace: string;
  specialization: string;

  constructor(data: Partial<InstructoInfoDTO>) {
    this.userName = data.userName || '';
    this.phone = data.phone || '';
    this.country = data.country || '';
    this.state = data.state || '';
    this.qualification = data.qualification || '';
    this.workExperience = data.qualification || '';
    this.lastWorkingPlace = data.lastWorkingPlace || '';
    this.specialization = data.specialization || '';
  }
}
