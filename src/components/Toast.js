import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

export const success = (msg) => {
    Toast.fire({
        icon: 'success',
        title: msg,
        position:"center"
        });
}


export const error = (msg) => {      
    Toast.fire({
        icon: 'error',
        title: msg,
        position:"center"
      })
}


export const warning = (msg) => {  
    Toast.fire({
        icon: 'warning',
        title: msg,
        position:"center"
      })
}