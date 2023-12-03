import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICountriesState, Country } from '../../store/reducers/types';
import { setCurrentCountry } from '../../store/reducers/countriesSlice';

type Option = {
  value: Country;
  label: Country;
};

function CustomSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();

  const { countries } = useSelector(
    (state: { countriesReducer: ICountriesState }) => state.countriesReducer
  );

  const options = countries.map((country) => {
    return {
      value: country,
      label: country,
    };
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option.value);
    setIsOpen(false);
    dispatch(setCurrentCountry(option.value));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div onClick={handleToggle}>
        <input
          type="text"
          value={selectedOption || ''}
          readOnly
          placeholder="Select an option"
        />
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search options"
          />
          <ul className="select-list">
            {filteredOptions.map((option) => (
              <li key={option.value} onClick={() => handleOptionSelect(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
