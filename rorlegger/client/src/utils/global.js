import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export function successToaster(message) {
  toastr.success(message);
}

export function errorToaster(message) {
  toastr.error(message);
}

export function commonErrorHandler(e) {
  if (e.status === 401) {
    errorToaster(
      'Sesjonen din har gått ut, du er nødt til å logge inn på nytt!'
    );
    return true;
  }
  return false;
}
