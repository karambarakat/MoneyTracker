

use proc_macro::TokenStream;

use quote::quote;
use syn;

#[proc_macro_derive(HttpError, attributes(http_error))]
pub fn http_error_macro_derive(input: TokenStream) -> TokenStream {
    let ast = syn::parse(input).unwrap();

    impl_http_error(&ast)
}

fn impl_http_error(ast: &syn::DeriveInput) -> TokenStream {
    let _ident = &ast.ident;

    let d_enum = match &ast.data {
        syn::Data::Enum(x) => x,
        _ => panic!("HttpError can only derived from enums"),
    };

    let variants = d_enum
        .variants
        .iter()
        .map(|x| {
            let fields = x.clone().fields;
            let fields = match fields {
                syn::Fields::Unit => quote! {},
                syn::Fields::Named(_) => quote! { {..} },
                syn::Fields::Unnamed(_) => quote! { (..) },
            };

            let name = &x.ident;

            (fields, name)
        })
        .map(|(fields, name)| {
            quote! {
                Self::#name #fields => stringify!(#name).to_string(),
            }
        })
        .reduce(|a, b| quote! { #a #b });

    // variates have attribute like #[http_error(status_code = 400)]
    let status_code_from_attribute = d_enum
        .variants
        .iter()
        .map(|x| {
            let name = &x.ident;

            let fields = match &x.fields {
                syn::Fields::Unit => quote! {},
                syn::Fields::Named(_) => quote! { {..} },
                syn::Fields::Unnamed(_) => quote! { (..) },
            };

            let status_code = &x
                .attrs
                .iter()
                .filter(|x| x.meta.path().is_ident("http_error"))
                .next()
                .expect("some fields don't have http_error attribute")
                .meta;

            // token streams in form of `status = "400", other_attribute`
            let _status_code = match &status_code {
                syn::Meta::List(x) => x.tokens.clone(),
                _ => panic!("http_error attribute must be list"),
            };

            // shortcut
            let status_code = 401_u16;

            (fields, name, status_code)
        })
        .map(|(fields, name, status_code)| {
            quote! {
                Self::#name #fields => #status_code,
            }
        })
        .reduce(|a, b| quote! { #a #b });

    let name = &ast.ident;

    let gen = quote! {
        impl HttpError for #name {
            fn error_code(&self) -> String {
                match self {
                    #variants
                }
            }

            fn error_status_u16(&self) -> u16 {
                match self {
                    #status_code_from_attribute

                }
            }
        }
    };
    gen.into()
}
