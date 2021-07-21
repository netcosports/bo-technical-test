import OutlinedTextField from '../widgets/OutlinedTextField/OutlinedTextField';

const RenderTextInput = ({
  input: { type, onChange, onBlur, value },
  isLoading,
  meta,
  ...rest
}) => {
  const { error, touched } = meta;
  return (
    <OutlinedTextField
      value={value}
      type={type}
      onChange={onChange}
      error={touched && error}
      {...rest}
      onBlur={(event) => onBlur(event)}
      isLoading={isLoading}
    />
  );
};

export default RenderTextInput;
