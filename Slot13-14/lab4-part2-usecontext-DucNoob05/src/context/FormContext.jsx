import { createContext, useReducer, useContext } from 'react';
import { formReducer, initialState } from '../reducers/formReducer';

// TODO 1: Tạo FormContext bằng createContext()
export const FormContext = createContext(null);

// TODO 2: Tạo FormProvider component
export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

// TODO 3: Tạo custom hook useFormContext()
export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined || context === null) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}

export default FormProvider;
