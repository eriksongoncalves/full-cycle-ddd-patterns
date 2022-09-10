import * as yup from 'yup';
import ValidatorInterface from '../../@shared/validator/validator.interface';
import Product from '../entity/product';

export default class CustomerYupValidator
  implements ValidatorInterface<Product>
{
  validate(product: Product) {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          price: yup.number().min(1, 'Price must be greater than zero')
        })
        .validateSync(
          {
            id: product.id,
            name: product.name,
            price: product.price
          },
          {
            abortEarly: false
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;

      e.errors.forEach(error => {
        product.notification.addError({
          context: 'product',
          message: error
        });
      });
    }
  }
}
