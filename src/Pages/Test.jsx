import React, { useState } from 'react';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import OutlinedTextField from '../widgets/OutlinedTextField/OutlinedTextField';
import OutlinedSelect from '../widgets/OutlinedSelect/OutlinedSelect';
import CheckBox from '../widgets/CheckBox/CheckBox';
import DatePickers from '../widgets/DatePickers/DatePickers';
import {
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  PrimaryIconBtn,
  SecondaryIconBtn,
} from '../widgets/Buttons/Buttons';
import FaIcon from '../widgets/icons/FaIcons';
import UploadButtonContainer from '../widgets/UploadButton/UploadButton.container';
import Switch from '../widgets/Switch';
import Section from '../widgets/Section';
import SubSection from '../widgets/SubSection';

const OPTIONS = [
  { label: 'groupama', value: 'groupama' },
  { label: 'janet', value: 'janet' },
];

function Test() {
  const [switchValue, setswitchValue] = useState(false);

  return (
    <div style={{ padding: '0px 10px', marginBottom: '40px' }}>
      <Section label="Test Page">
        <SubSection label="Inputs">
          <div>
            <OutlinedTextField />
          </div>
          <div>
            <OutlinedSelect options={OPTIONS} defaultValue={OPTIONS[0].value} />
          </div>
          <div>
            <CheckBox value="BlackListed" label="Black Listed" />
          </div>
          <div>
            <DatePickers label="Date de diffusion" />
          </div>
        </SubSection>
        <SubSection label="Buttons">
          <div>
            <PrimaryButton label="Primary" upperCase={true} />
            <PrimaryButton label="Primary disabled" upperCase={true} disabled />
          </div>
          <div>
            <SecondaryButton label="Secondary" />
            <SecondaryButton label="Secondary disabled" disabled />
          </div>
          <div>
            <DangerButton label="Danger" />
            <DangerButton label="Danger disabled" disabled />
          </div>
          <div>
            Primary Icon Button (normal/disabled)
            <br />
            <PrimaryIconBtn icon={<FaIcon name={faNewspaper} />} label="News" />
            <PrimaryIconBtn icon={<FaIcon name={faNewspaper} />} disabled />
          </div>
          <div>
            Secondary Icon Button (normal/disabled)
            <br />
            <SecondaryIconBtn icon={<FaIcon name={faNewspaper} />} />
            <SecondaryIconBtn icon={<FaIcon name={faNewspaper} />} disabled />
          </div>
        </SubSection>
        <SubSection label="CSV input">
          <div>
            <UploadButtonContainer label="upload" />
          </div>
        </SubSection>
        <SubSection label="Switch">
          <div>
            <Switch value={switchValue} onChange={() => setswitchValue(!switchValue)} />
            <Switch value={switchValue} onChange={() => setswitchValue(!switchValue)} disabled />
          </div>
        </SubSection>
      </Section>
    </div>
  );
}

export default Test;
