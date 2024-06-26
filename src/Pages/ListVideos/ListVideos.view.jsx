import { loginImagePath, legalText } from '../../config';
import { palette } from '../../muiTheme';

import { Form, Field } from 'react-final-form';
import { PrimaryButton, DangerButton } from '../../widgets/Buttons/Buttons';
import RenderTextInput from '../../Renderers/RenderTextInput';
import { Link } from 'react-router-dom';

import styles from './listvideos.module.scss';
import samplevideos from './samplevideos';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

function ListVideosView() {
  return (
    <div className={styles.list}>
      <h1 className={styles.title}>Video List</h1>
      <List className={styles.list_div}>
        {samplevideos.map((video) => (
          <div className={styles.list_div}>
            <ListItem
              sx={{ bgcolor: 'white', flexDirection: 'column', alignItems: 'flex-start' }}
              key={video.id}
              secondaryAction={<PrimaryButton label="edit" />}>
              <ListItemText primary={`${video.title}`} secondary={`${video.description}`} />
              <ListItemText primary={`${video.duration}`} />
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </div>
        ))}
      </List>
    </div>
  );
}
export default ListVideosView;
