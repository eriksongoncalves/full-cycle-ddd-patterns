import ValidatorInterface from '../../@shared/validator/validator.interface';
import Customer from '../entity/customer';
import * as yup from 'yup';

export default class CustomerYupValidator
  implements ValidatorInterface<Customer>
{
  validate(customer: Customer) {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required')
        })
        .validateSync(
          {
            id: customer.id,
            name: customer.name
          },
          {
            abortEarly: false
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;

      e.errors.forEach(error => {
        customer.notification.addError({
          context: 'customer',
          message: error
        });
      });
    }
  }
}
