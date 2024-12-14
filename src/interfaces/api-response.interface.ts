export interface UserUpdateSuccessResponse {
    data: {
      success: true;
      message: string;
      data: {
        _id: string;
        firstName: string;
        lastName: string;
        phone: string;
        phoneNumberVerified: boolean;
        email: string;
        emailVerified: boolean;
        profileImage: string;
        role: string;
        status: string;
        id: string;
      };
    };
  }