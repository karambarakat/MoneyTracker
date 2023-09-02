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

    let variants = d_enum.variants.iter().map(|x| {
        let fields = x.clone().fields;
        let fields = match fields {
            syn::Fields::Unit => quote! {},
            syn::Fields::Named(_) => quote! { {..} },
            syn::Fields::Unnamed(_) => quote! { (..) },
        };

        let name = &x.ident;

        let status_code = &x
            .attrs
            .iter()
            .filter(|x| x.meta.path().is_ident("http_error"))
            .next()
            .expect("some fields don't have http_error attribute")
            .meta;

        let status_code = match status_code {
            syn::Meta::List(x) => x,
            _ => panic!("http_error attribute must be a list"),
        };

        let mut status_code = status_code.tokens.clone().into_iter();

        let first = status_code
            .next()
            .expect("http_error attribute must have at least one item");

        match first {
            proc_macro2::TokenTree::Ident(x) => {
                if x.to_string() != "status" {
                    panic!("first item of http_error attribute must be status")
                }
            }
            _ => panic!("first item of http_error attribute must be status"),
        }

        let punct = status_code
            .next()
            .expect("http_error attribute must have at least two items");

        match punct {
            proc_macro2::TokenTree::Punct(x) => {
                if x.as_char() != '=' {
                    panic!("second item of http_error attribute must be =")
                }
            }
            _ => panic!("second item of http_error attribute must be ="),
        }

        let status_code = status_code
            .next()
            .expect("http_error attribute must have at least three items");

        let status_code = match status_code {
            proc_macro2::TokenTree::Literal(x) => x,
            _ => panic!("third item of http_error attribute must be a literal"),
        };

        (name, fields, status_code)
    });

    let error_code_body = variants
        .clone()
        .map(|(name, fields, _)| {
            quote! {
                Self::#name #fields => stringify!(#name).to_string(),
            }
        })
        .reduce(|a, b| quote! { #a #b });

    let status_code_body = variants
        .clone()
        .map(|(name, fields, status_code)| {
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
                    #error_code_body
                }
            }

            fn error_status_u16(&self) -> u16 {
                match self {
                    #status_code_body
                }
            }
        }
    };
    gen.into()
}
