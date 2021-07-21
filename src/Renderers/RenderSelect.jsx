import OutlinedSelect from '../widgets/OutlinedSelect/OutlinedSelect';

function RenderSelect({ className, input, isLoading, options, meta, ...rest }) {
  const { onBlur } = input;
  const { error, touched } = meta;

  return (
    <OutlinedSelect
      {...input}
      {...rest}
      onBlur={(event) => onBlur(event)}
      options={options}
      className={className}
      error={touched && !!error}
      errorText={error}
      isLoading={isLoading}
    />
  );
}

export default RenderSelect;
