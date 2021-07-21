import { useContext, useState } from 'react';
import Evaporate from 'evaporate';
import AWS from 'aws-sdk';

import config, { awsPrefix } from '../../config';
import Session from '../Session';
import AdminPayloadContext from '../../context/adminPayloadContext';
import slugify from '../slugify';

const useS3Upload = () => {
  const [progress, setProgress] = useState({});

  const { adminPayload } = useContext(AdminPayloadContext);
  const awsBucketName = adminPayload?.aws?.buckets?.assets;
  const { assetsUrl } = adminPayload;

  const evaporateCfg = {
    signerUrl: `${config.apiEndpoint}/utils/sign-s3-request`,
    aws_key: process.env.REACT_APP_AWS_KEY,
    bucket: awsBucketName,
    aws_url: 'https://s3-eu-west-1.amazonaws.com',
    awsRegion: 'eu-west-1',
    maxConcurrentParts: 2,
    logging: false,
    computeContentMd5: true,
    cryptoMd5Method: (data) => {
      return AWS.util.crypto.md5(data, 'base64');
    },
    cryptoHexEncodedHash256: (data) => {
      return AWS.util.crypto.sha256(data, 'hex');
    },
    signHeaders: {
      Authorization: `Bearer ${Session.user.token}`,
    },
  };

  const normalizeFileName = (name) => {
    const now = Date.now();
    const splittedName = name.split('.');
    const ext = splittedName[splittedName.length - 1];
    const trimedName = slugify(splittedName[0]).replaceAll(' ', '_');

    return `${trimedName}-${now}.${ext}`;
  };

  const uploadFile = async (file, config) => {
    const awsFileName = `${awsPrefix}${config.awsPath}${normalizeFileName(file.name)}`;
    const addConfig = {
      name: awsFileName,
      file,
      contentType: file.type,
      progress: (progress, stats) => {
        setProgress({ progress, ...stats });
      },
    };
    try {
      const evaporate = await Evaporate.create(evaporateCfg);
      const awsKey = await evaporate.add(addConfig);
      return `${assetsUrl}/${awsKey}`;
    } catch (error) {
      return { error };
    }
  };

  return { uploadFile, progress };
};

export default useS3Upload;
