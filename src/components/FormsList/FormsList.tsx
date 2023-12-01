import { useSelector } from 'react-redux';
import { IFormState, FormNames } from '../../store/reducers/types';

function FormsList({
  formType,
  lastFormType,
}: {
  formType: FormNames;
  lastFormType: FormNames;
}) {
  const forms = useSelector(
    (state: { formReducer: IFormState[] }) => state.formReducer
  );

  return forms.filter((anyForm: IFormState) => anyForm.formType === formType)
    .length ? (
    <ul className="list">
      {forms
        .filter((anyForm: IFormState) => anyForm.formType === formType)
        .reverse()
        .map((form: IFormState, index: number) => (
          <li
            key={`${form.name}-${form.email}`}
            className={
              formType === lastFormType && index === 0
                ? 'item, item-active'
                : 'item'
            }
          >
            <ul>
              {Object.keys(form).map((key: string) => {
                return key === 'pictureBase64' ? (
                  <li key={key}>
                    <span>Preview:</span>
                    <img
                      src={form.pictureBase64 || ''}
                      alt="Preview"
                      style={{ width: '100px', height: '100px' }}
                    />
                  </li>
                ) : (
                  <li key={key}>
                    <span>{key}:</span> {form[key]}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
    </ul>
  ) : (
    <p>No data</p>
  );
}

export default FormsList;
