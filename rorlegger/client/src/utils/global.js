import toastr from 'toastr';

export function successToaster(message) {
  toastr.success(message);
}

export function errorToaster(message) {
  toastr.error(message);
}
