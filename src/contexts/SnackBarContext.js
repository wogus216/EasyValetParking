const { createContext, useState, useMemo } = require('react');

const SnackContext = createContext();

const SnackProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const actions = useMemo(
    () => ({
      handleOpen() {
        setOpen(true);

        setTimeout(() => {
          setOpen(false);
        }, 2000);
      },
      handleClose() {
        setOpen(false);
      },
    }),
    []
  );

  const value = useMemo(() => [open, actions], [open, actions]);

  return <SnackContext.Provider value={value}>{children}</SnackContext.Provider>;
};

export { SnackContext, SnackProvider };
