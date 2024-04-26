export const handleClose = (
  setter: React.Dispatch<React.SetStateAction<boolean>>
) => setter(false);

export const handleListen = (artistId: string | undefined) => {
  if (artistId) {
    window.open(`https://open.spotify.com/artist/${artistId}`, "_blank");
  }
};

export const handleMenuClose = (
  setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>
) => setter(null);

export const handleOpen = (
  setter: React.Dispatch<React.SetStateAction<boolean>>
) => setter(true);
