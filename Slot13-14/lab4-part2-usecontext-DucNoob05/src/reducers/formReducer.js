import { validateField } from '../utils/validators';

export const initialState = {
  values: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  errors: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  touched: {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  status: 'idle', // 'idle' | 'submitting' | 'success' | 'error'
};

export function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE': {
      const nextValues = {
        ...state.values,
        [action.field]: action.value,
      };

      const nextErrors = { ...state.errors };

      // Re-validate this field if it has already been touched
      if (state.touched[action.field]) {
        nextErrors[action.field] = validateField(
          action.field,
          action.value,
          nextValues
        );
      }

      // If password changes and confirmPassword has been touched, re-validate confirmPassword
      if (action.field === 'password' && state.touched.confirmPassword) {
        nextErrors.confirmPassword = validateField(
          'confirmPassword',
          nextValues.confirmPassword,
          nextValues
        );
      }

      return {
        ...state,
        values: nextValues,
        errors: nextErrors,
      };
    }

    case 'BLUR': {
      const nextTouched = {
        ...state.touched,
        [action.field]: true,
      };

      const nextErrors = {
        ...state.errors,
        [action.field]: validateField(
          action.field,
          state.values[action.field],
          state.values
        ),
      };

      return {
        ...state,
        touched: nextTouched,
        errors: nextErrors,
      };
    }

    case 'VALIDATE_ALL': {
      const nextTouched = {
        fullName: true,
        email: true,
        password: true,
        confirmPassword: true,
      };

      const nextErrors = {
        fullName: validateField('fullName', state.values.fullName, state.values),
        email: validateField('email', state.values.email, state.values),
        password: validateField('password', state.values.password, state.values),
        confirmPassword: validateField(
          'confirmPassword',
          state.values.confirmPassword,
          state.values
        ),
      };

      const hasError = Object.values(nextErrors).some((err) => err !== '');

      return {
        ...state,
        touched: nextTouched,
        errors: nextErrors,
        status: hasError ? 'error' : state.status,
      };
    }

    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status,
      };
    }

    case 'RESET': {
      return initialState;
    }

    default:
      return state;
  }
}

export default formReducer;
