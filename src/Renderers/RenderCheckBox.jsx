import CheckBox from '../widgets/CheckBox/CheckBox';

function RenderCheckBox({ input, isLoading, ...rest }) {
  return <CheckBox {...rest} {...input} isLoading={isLoading} />;
}

export default RenderCheckBox;
