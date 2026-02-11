import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Unesite ispravan email")
    .required("Email je obavezan"),
  password: yup
    .string()
    .min(6, "Lozinka mora imati najmanje 6 karaktera")
    .required("Lozinka je obavezna"),
});

export const registerSchema = yup.object({
  username: yup
    .string()
    .min(3, "Korisničko ime mora imati najmanje 3 karaktera")
    .required("Korisničko ime je obavezno"),
  email: yup
    .string()
    .email("Unesite ispravan email")
    .required("Email je obavezan"),
  password: yup
    .string()
    .min(6, "Lozinka mora imati najmanje 6 karaktera")
    .required("Lozinka je obavezna"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Lozinke se ne poklapaju")
    .required("Potvrda lozinke je obavezna"),
});

export const postSchema = yup.object({
  title: yup
    .string()
    .min(5, "Naslov mora imati najmanje 5 karaktera")
    .required("Naslov je obavezan"),
  content: yup
    .string()
    .min(20, "Sadržaj mora imati najmanje 20 karaktera")
    .required("Sadržaj je obavezan"),
  category: yup
    .string()
    .required("Kategorija je obavezna"),
});