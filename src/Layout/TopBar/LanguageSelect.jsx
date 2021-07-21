import React, { useContext, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { LanguageContext } from '../../context/languageContext';
import UserContext from '../../context/userContext';

import config from '../../config';
import { colors } from '../../muiColors';
import styles from './languageSelect.module.scss';
import { UsersAPI } from '../../utils/api/api';

function LanguageSelect() {
  const [anchorEl, setAnchorEl] = useState(null);

  const { language, toggleLanguage } = useContext(LanguageContext);
  const { user, setUser } = useContext(UserContext);

  const { availableLanguages } = config;

  // menu mui style
  const useStyles = makeStyles({
    menu: {
      background: colors.darkGray2,
      border: '1px solid white',
      borderRadius: 3,
      color: 'white',
      width: '100px',
    },
    menuList: {
      width: '100%',
    },
    item: {
      width: '100%',
      justifyContent: 'center',
      '&:hover': {
        background: colors.lightGray5,
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
    selected: {},
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleLanguage = async (newLanguage) => {
    toggleLanguage(newLanguage);
    handleClose();
    const updatedMeta = { ...user.meta, language: newLanguage };
    const updatedUser = { ...user, meta: updatedMeta };
    setUser(updatedUser);
    await UsersAPI.updateSelf(updatedUser);
  };

  const classes = useStyles();

  return (
    <div className={styles.languageWrapper}>
      <Button aria-haspopup="true" onClick={handleClick} className={styles.menuBtn}>
        {language}
        <ExpandMoreIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{ paper: classes.menu, list: classes.menuList }}>
        {availableLanguages?.map((lang, i) => (
          <MenuItem
            value={lang}
            key={i}
            onClick={() => handleToggleLanguage(lang)}
            classes={{ root: classes.item, selected: classes.selected }}
            selected={lang === language}>
            {lang.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default LanguageSelect;
