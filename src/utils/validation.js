export const validateForm = (setErrors,signupData) => { 
    const newErrors = {};

    if (!signupData.name?.trim()) {

      newErrors.fullName = "required";
    } else if (signupData.name.length < 3) {
      newErrors.fullName = "Maximum 3 characters long";
    }

    if (!signupData.email?.trim()) {
      newErrors.emailAddress = "required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.emailAddress = "Email Address is not valid";
    }

    if (!signupData.password?.trim()) {
      newErrors.password = "required";
    } else if (signupData.password?.length < 8) {
      newErrors.password = "Minimum 8 characters long";
    } else if (
      !/[A-Z]/.test(signupData.password) ||
      !/\d/.test(signupData.password)
    ) {
      newErrors.password = "Atleast one uppercase and one digit";
    }

    if (!signupData.confirm?.trim()) {
      newErrors.confirmPassword = "required";
    } else if (signupData.confirm !== signupData.password) {
      newErrors.confirmPassword = "Password mismatch";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};


export const validateSigninForm = (setErrors,signupData) => {
    const newErrors = {};

    if (!signupData.email?.trim()) {
      newErrors.emailAddress = "required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.emailAddress = "Email Address is not valid";
    }
    
    if (!signupData.password?.trim()) {
        newErrors.password = "required";
    } else if (signupData.password?.length < 8) {
        newErrors.password = "Minimum 8 characters long";
    } else if (
        !/[A-Z]/.test(signupData.password) ||
        !/\d/.test(signupData.password)
    ) {
        newErrors.password = "Atleast one uppercase and one digit";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
}


export const validateProfileForm = (setErrors,formData) => {
  const Errors = []
  if (!formData.name?.trim()) {

    Errors.fullName = "required";
  } else if (formData.name.length < 3) {
    Errors.fullName = "Maximum 3 characters long";
  }

  if (!formData.email?.trim()) {
    Errors.emailAddress = "required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    Errors.emailAddress = "Email Address is not valid";
  }

  setErrors(Errors);
  return Object.keys(Errors).length === 0;
}

export const validateSecurityForm = (setErrors,formData) => { 
  const Errors = {};

  if (!formData.password?.trim()) {
    Errors.password = "required";
  }

  if (!formData.confirm?.trim()) {
    Errors.confirmPassword = "required";
  } else if (formData.confirm !== formData.password) {
    Errors.confirmPassword = "Password mismatch";
  }

  if (!formData.newPass?.trim()) {
    Errors.newPass = "required";
  } else if (formData.newPass?.length < 8) {
    Errors.newPass = "Minimum 8 characters long";
  } else if (
    !/[A-Z]/.test(formData.newPass) ||
    !/\d/.test(formData.newPass)
  ) {
    Errors.newPass = "Atleast one uppercase and one digit";
  }

  setErrors(Errors);
  return Object.keys(Errors).length === 0;
};