import React from 'react';
import PropTypes from 'prop-types';
import { useGlobalContext } from 'strapi-helper-plugin';
import CustomLabel from './Label';
import Enumeration from './Enumeration';
import EnumerationWrapper from './EnumerationWrapper';
import Wrapper from './Wrapper';

const BooleanBox = ({ label, name, onChange, onChangeCallback, options, value }) => {
  const { formatMessage } = useGlobalContext();

  const handleChange = e => {
    onChange(e);
    onChangeCallback();
  };

  return (
    <div>
      <CustomLabel htmlFor={name}>{label}</CustomLabel>
      <Wrapper>
        {options.map(option => (
          <Enumeration
            {...option}
            key={option.value}
            id={option.value.toString()}
            className="option-input"
            checked={option.value === value}
            name={name}
            onChange={handleChange}
            type="radio"
            value={option.value}
          />
        ))}
        {options.map(option => (
          <EnumerationWrapper
            className="option"
            key={option.value}
            htmlFor={option.value.toString()}
          >
            <span className="option__indicator" />
            <span className="option__title">{formatMessage({ id: option.headerId })}</span>
            <p>{formatMessage({ id: option.descriptionId })}</p>
          </EnumerationWrapper>
        ))}
      </Wrapper>
    </div>
  );
};

BooleanBox.defaultProps = {
  label: '',
  options: [],
  onChangeCallback: () => {},
};

BooleanBox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeCallback: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

export default BooleanBox;
