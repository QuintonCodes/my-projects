type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export const useSendEmail = (
  formData: FormData,
  onSuccess: (response: any) => void,
  onError: (error: Error) => void
) => {
  const token = "d33c8587-24d4-49d9-abf3-8e803b5bf9ca";

  const sendEmail = () => {
    const emailBody = `
      <b> First Name: </b> ${formData.firstName}
      <br/>
      <b> Last Name: </b> ${formData.lastName}
      <br/>
      <b> Email: </b> ${formData.email}
      <br/>
      <b> Phone Number: </b> ${formData.phoneNumber}
      <br/>
      <b> Message: </b> ${formData.message}
    `;

    try {
      window.Email.send({
        SecureToken: token,
        To: "kickflip01.store@gmail.com",
        From: "kagisojiyane28@gmail.com",
        Subject: "Contact Us Submission",
        Body: emailBody,
      }).then(onSuccess);
    } catch (error: any) {
      onError(error);
    }
  };

  return sendEmail;
};
