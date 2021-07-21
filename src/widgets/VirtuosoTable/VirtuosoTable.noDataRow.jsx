import React from 'react';

import useTranslate from '../../utils/hooks/useTranslate';
import './styles.scss';

const text = {
  namespace: 'VirtuosoTableNoDataRow',
  resources: {
    fr: {
      noData: 'Pas de données pour cette sélection',
    },
    en: {
      noData: 'No data available for this query',
    },
    it: {
      noData: 'Nessun dato per questa selezione',
    },
  },
};

function VirtuosoTableNoDataRow() {
  const { t } = useTranslate(text);

  return <div className="noData">{t('noData')}</div>;
}

export default VirtuosoTableNoDataRow;
