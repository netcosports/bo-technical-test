import { colors } from './muiColors';

const palette = {
  primary: {
    main: colors.darkGray2,
    light: colors.darkGray1,
    dark: colors.black2,
    contrastText: colors.white,
    disabled: colors.lightGray5,
  },
  secondary: {
    main: colors.white,
    light: colors.white,
    dark: colors.lightGray1,
    contrastText: colors.lightGray5,
  },
  blue: {
    main: colors.blue,
    dark: colors.blue2,
  },

  primary1Color: colors.blue,
  primary2Color: colors.blue2,
  accent1Color: colors.lightGray5,
  textColor: colors.white,
  secondaryTextColor: colors.lightGray1,
  borderColor: colors.lightGray2,
  disabled1Color: colors.lightGray5,
  disabled2Color: colors.lightGray3,
};
const theme = {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
    textColor: {
      main: colors.blue,
      light: colors.blue,
      dark: colors.blue2,
      contrastText: '#6a5327',
    },

    h2: {
      fontSize: '25px',
    },
  },

  palette,

  topBar: {
    flexContainerVertical: {
      textColor: colors.white,
      backgroundColor: colors.darkGray2,
    },
  },

  sideBar: {
    textColor: colors.lightGray1,
    textColorHover: colors.lightGray2,
    backgroundColor: colors.darkGray1,
  },

  icon: {
    iconColor: colors.lightGray1,
    iconColorHover: colors.lightGray2,
  },

  tabs: {
    indicator: {
      color: '#fff',
    },
  },
  overrides: {
    MuiButton: {
      startIcon: {
        marginLeft: '8px',
      },
      containedPrimary: {
        color: colors.white,
        backgroundColor: colors.blue,
        '&:hover': {
          backgroundColor: colors.blue2,
        },
        '&:disabled': {
          backgroundColor: colors.lightGray5,
        },
      },
      contained: {
        color: colors.black,
        backgroundColor: colors.lightGray1,
        '&:hover': {
          backgroundColor: colors.lightGray2,
        },
        '&:disabled': {
          backgroundColor: colors.lightGray5,
        },
      },

      outlinedPrimary: {
        color: colors.blue,
        backgroundColor: colors.white,
        borderColor: colors.blue,
        '&:hover': {
          backgroundColor: colors.blue2,
          color: colors.white,
          borderColor: colors.blue,
        },
        '&:disabled': {
          backgroundColor: colors.lightGray5,
        },
      },

      containedSecondary: {
        color: colors.white,
        backgroundColor: colors.red,
        '&:hover': {
          backgroundColor: colors.darkRed,
        },
        '&:disabled': {
          backgroundColor: colors.lightGray5,
        },
      },
    },
    MuiIconButton: {
      colorPrimary: {
        color: colors.black,
        '&:hover': {
          backgroundColor: colors.lightGray3,
        },
      },
      colorSecondary: {
        color: colors.white,
        '&:hover': {
          backgroundColor: colors.white,
          color: colors.darkGray2,
        },
        '&$disabled': {
          color: colors.lightGray3,
          backgroundColor: colors.lightGray3,
          border: `2px solid ${colors.lightGray5}`,
        },
      },
    },
    MuiSelect: {
      select: {
        minWidth: '195px',
        margin: '5px',
        textTransform: 'upperCase',
        '&:focus': {
          height: '20px',
          padding: '10px 14px',
        },
      },
    },

    MuiMenu: {
      list: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: colors.darkGray2,
        color: colors.white,
      },
    },
    MuiListItem: {
      root: {
        backgroundColor: palette.primary.main,
        textTransform: 'upperCase',
      },
      button: {
        '&:hover': {
          backgroundColor: colors.lightGray5,
          color: '#343a40',
        },
        '&$selected': {
          color: 'white',
          background: 'rgba(255,255,255,0.2)',
          '&:hover': {
            background: colors.lightGray5,
            color: colors.darkGray2,
          },
        },
      },
    },
    MuiTableCell: {
      head: {
        color: colors.white,
        backgroundColor: colors.darkGray2,
      },
      stickyHeader: {
        color: colors.white,
        backgroundColor: colors.darkGray2,
      },
    },
    MuiFormControl: {
      root: {
        minHeight: '63px',
      },
    },
    MuiOutlinedInput: {
      root: {
        height: '40px',
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: colors.darkGray2,
        minWidth: '50px',
        textAlign: 'center',
      },
    },
  },
};

export default theme;
export { palette };
