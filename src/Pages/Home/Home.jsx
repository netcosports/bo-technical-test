import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import useTranslate from '../../utils/hooks/useTranslate';

import MENU_ENTRIES from '../../menuConfig';
import texts from './home.text';
import styles from './home.module.scss';

const useStyles = makeStyles({
  cardAction: {
    height: '35px',
    padding: '5px 0px 5px 10px',
    borderTop: '1px solid rgba(117,117,117,0.4)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardContent: {
    marginTop: '-70px',
  },
});

function Home() {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslate(texts);

  const handleClickRedirect = (path) => {
    history.push(path);
  };

  return (
    <div className={styles.container}>
      <Grid container>
        {MENU_ENTRIES.map(
          ({ name, path, homePage }, i) =>
            !!homePage && (
              <Grid key={`${name}-${i}`} item xs={12} sm="auto">
                <Card style={{ backgroundColor: homePage.buttonColor }} className={styles.card}>
                  <span className={styles.menuIcon}>{homePage.icon}</span>
                  <CardContent className={classes.cardContent}>{t(name)}</CardContent>
                  <CardActionArea
                    className={classes.cardAction}
                    onClick={() => handleClickRedirect(path)}>
                    {t('details')}
                    <ChevronRightIcon fontSize="large" />
                  </CardActionArea>
                </Card>
              </Grid>
            ),
        )}
      </Grid>
    </div>
  );
}

export default Home;
