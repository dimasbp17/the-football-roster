'use client';

import { ThemeProvider } from '@material-tailwind/react';

const MaterialProvider = ({ children }) => {
  const customTheme = {
    button: {
      defaultProps: {
        className: 'flex items-center justify-center',
      },
      styles: {
        base: {
          initial: {
            textTransform: 'none',
          },
        },
      },
    },
    dialog: {
      styles: {
        base: {
          backdrop: {
            position: 'fixed overscroll-y-auto overflow-auto',
          },
        },
      },
    },
  };

  return <ThemeProvider value={customTheme}>{children}</ThemeProvider>;
};

export default MaterialProvider;
