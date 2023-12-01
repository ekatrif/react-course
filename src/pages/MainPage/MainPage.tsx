import { useLocation } from 'react-router-dom';
import { FormNames } from '../../store/reducers/types';
import FormsList from '../../components/FormsList/FormsList';

function MainPage() {
  const { state } = useLocation();
  const formType = state?.formType as FormNames;

  return (
    <div className="container">
      <h1>Main Page</h1>
      <div className="forms-container">
        <div>
          <h2>Simple Form</h2>
          <FormsList formType={FormNames.simpleForm} lastFormType={formType} />
        </div>
        <div>
          <h2>React Hook Form</h2>
          <FormsList formType={FormNames.hookForm} lastFormType={formType} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
