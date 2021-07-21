import DatePickers from '../widgets/DatePickers/DatePickers';

function RenderDatePickers({ input, isLoading, ...rest }) {
  const { value, onChange } = input;

  return <DatePickers value={value} onChange={onChange} {...rest} isLoading={isLoading} />;
}

export default RenderDatePickers;
