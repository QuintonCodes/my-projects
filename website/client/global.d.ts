export {};

declare global {
  interface Window {
    Email: {
      send: (options: {
        SecureToken: string;
        To: string;
        From: string;
        Subject: string;
        Body: string;
      }) => Promise<any>;
    };
  }
}

declare module "*.(jpg|jpeg|png|gif|webp|svg)" {
  const content: string;
  export default content;
}
