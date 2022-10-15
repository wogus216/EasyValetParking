const { createContext, useState, useMemo } = require('react');

const SnackContext = createContext();

const SnackProvider = ({ children }) => {
  const [snackOpen, setSnackOpen] = useState(false);

  const actions = useMemo(
    () => ({
      handleOpen() {
        setSnackOpen(true);

        setTimeout(() => {
          setSnackOpen(false);
        }, 2000);
      },
      handleClose() {
        setSnackOpen(false);
      },
    }),
    []
  );

  const value = useMemo(() => [snackOpen, actions], [snackOpen, actions]);

  return <SnackContext.Provider value={value}>{children}</SnackContext.Provider>;
};

export { SnackContext, SnackProvider };
