import FormProvider from '../context/FormContext';
import RegistrationForm from '../components/form/RegistrationForm';

export default function Ex03ValidationPage() {
  return (
    <FormProvider>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
