# LocalAuthorizationApi

All URIs are relative to _https://localhost:8811/api/v1_

| Method                                                                      | HTTP request                   | Description |
| --------------------------------------------------------------------------- | ------------------------------ | ----------- |
| [**authLocalLoginPost**](LocalAuthorizationApi.md#authLocalLoginPost)       | **POST** /auth/local/login/    | login       |
| [**authLocalRegisterPost**](LocalAuthorizationApi.md#authLocalRegisterPost) | **POST** /auth/local/register/ | register    |

<a name="authLocalLoginPost"></a>

# **authLocalLoginPost**

> \_auth_local_login\_\_post_200_response authLocalLoginPost(Authorization)

login

    login using email and password using Basic Token Http Authorization

### Parameters

| Name              | Type       | Description                                            | Notes             |
| ----------------- | ---------- | ------------------------------------------------------ | ----------------- |
| **Authorization** | **String** | base64 email and password pair with colon as separator | [default to null] |

### Return type

[**\_auth_local_login\_\_post_200_response**](../Models/_auth_local_login__post_200_response.md)

### Authorization

[BasicToken](../README.md#BasicToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="authLocalRegisterPost"></a>

# **authLocalRegisterPost**

> \_auth_local_login\_\_post_200_response authLocalRegisterPost(Authorization, \_auth_local_register\_\_post_request)

register

    make new account with a displayName

### Parameters

| Name                                      | Type                                                                                         | Description                                            | Notes             |
| ----------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------- |
| **Authorization**                         | **String**                                                                                   | base64 email and password pair with colon as separator | [default to null] |
| **\_auth_local_register\_\_post_request** | [**\_auth_local_register\_\_post_request**](../Models/_auth_local_register__post_request.md) |                                                        | [optional]        |

### Return type

[**\_auth_local_login\_\_post_200_response**](../Models/_auth_local_login__post_200_response.md)

### Authorization

[BasicToken](../README.md#BasicToken)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json
