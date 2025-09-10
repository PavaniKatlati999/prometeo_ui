import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs, { Dayjs } from 'dayjs';
import classNames from 'classnames';
import "./styles.scss"

/**
 * A DatePicker component for selecting dates (single or range) with optional formatting,
 * min/max dates, and disabled states. Suitable for forms, scheduling, or calendar inputs.
 */
const DatePicker: React.FC<DatePickerProps> =({
  value,
  defaultValue,
  onChange,
  format = 'YYYY-MM-DD',
  placeholder = 'Select date',
  disabled = false,
  allowClear = true,
  onOpenChange,
  disabledDate,
  showTime = false,
  className,
  ...restProps
}) => {
  const [selectedDate, setSelectedDate] = useState(defaultValue || null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    value ? dayjs(value).format(format) : ''
  );

  useEffect(() => {
    if (value) {
      setInputValue(dayjs(value).format(format));
    } else {
      setInputValue('');
    }
  }, [value, format]);

  const handleInputChange = (e) => {
    const dateStr = e.target.value;
    setInputValue(dateStr);
    const date = dayjs(dateStr, format);
    if (date.isValid()) {
      setSelectedDate(date);
      onChange && onChange(date, date.format(format));
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setInputValue(date.format(format));
    onChange && onChange(date, date.format(format));
    setIsOpen(false);
    onOpenChange && onOpenChange(false);
  };

  const toggleCalendar = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      onOpenChange && onOpenChange(!isOpen);
    }
  };

  const clearDate = (e) => {
    e.stopPropagation();
    setSelectedDate(null);
    setInputValue('');
    onChange && onChange(null, '');
  };

  const renderCalendar = () => {
    const today = dayjs();
    const dates = Array.from({ length: 31 }, (_, index) =>
      today.date(index + 1)
    );

    return (
      <div className="calendar">
        {dates.map((date) => {
          const isDisabled = disabledDate && disabledDate(date);
          return (
            <div
              key={date.format('YYYY-MM-DD')}
              className={classNames('calendar-date', {
                'calendar-date-disabled': isDisabled,
                'calendar-date-selected':
                  selectedDate && selectedDate.isSame(date, 'date'),
              })}
              onClick={() => !isDisabled && handleDateClick(date)}
            >
              {date.format('DD')}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={classNames('datepicker', className)} {...restProps}>
      <input
        type="text"
        className="datepicker-input"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={toggleCalendar}
        readOnly={!showTime}
        disabled={disabled}
      />
      {allowClear && inputValue && (
        <span className="datepicker-clear" onClick={clearDate}>
          &times;
        </span>
      )}
      {isOpen && <div className="datepicker-calendar">{renderCalendar()}</div>}
    </div>
  );
};

DatePicker.propTypes = {
  value: PropTypes.instanceOf(Dayjs),
  defaultValue: PropTypes.instanceOf(Dayjs),
  onChange: PropTypes.func,
  format: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  allowClear: PropTypes.bool,
  onOpenChange: PropTypes.func,
  disabledDate: PropTypes.func,
  showTime: PropTypes.bool,
  className: PropTypes.string,
};

export default DatePicker;
