# ProfileApi

All URIs are relative to *https://localhost:8811/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**profileGet**](ProfileApi.md#profileGet) | **GET** /profile/ | get profile |
| [**profilePasswordPut**](ProfileApi.md#profilePasswordPut) | **PUT** /profile/password/ | (re)set password |
| [**profilePut**](ProfileApi.md#profilePut) | **PUT** /profile/ | update profile |
| [**profileStatusGet**](ProfileApi.md#profileStatusGet) | **GET** /profile/status/ | authentication status |


<a name="profileGet"></a>
# **profileGet**
> _auth_local_login__post_200_response profileGet(Authorization)

get profile

    retrieve profile info

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **Authorization** | **String**| can be obtained by &#x60;auth/*/*&#x60;, in form of eyxxx.xxx.xxx | [default to null] |

### Return type

[**_auth_local_login__post_200_response**](../Models/_auth_local_login__post_200_response.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="profilePasswordPut"></a>
# **profilePasswordPut**
> _auth_local_login__post_200_response profilePasswordPut(Authorization, \_profile\_password\_\_put\_request)

(re)set password

    update users password

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **Authorization** | **String**| can be obtained by &#x60;auth/*/*&#x60;, in form of eyxxx.xxx.xxx | [default to null] |
| **\_profile\_password\_\_put\_request** | [**_profile_password__put_request**](../Models/_profile_password__put_request.md)| update the password | [optional] |

### Return type

[**_auth_local_login__post_200_response**](../Models/_auth_local_login__post_200_response.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="profilePut"></a>
# **profilePut**
> _auth_local_login__post_200_response profilePut(Authorization, \_profile\_\_get\_request)

update profile

    update profile information

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **Authorization** | **String**| can be obtained by &#x60;auth/*/*&#x60;, in form of eyxxx.xxx.xxx | [default to null] |
| **\_profile\_\_get\_request** | [**_profile__get_request**](../Models/_profile__get_request.md)| fields to update | [optional] |

### Return type

[**_auth_local_login__post_200_response**](../Models/_auth_local_login__post_200_response.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="profileStatusGet"></a>
# **profileStatusGet**
> List profileStatusGet(\_profile\_status\_\_get\_request)

authentication status

    when provided with email, this will resolve to all available authentication methods for given email 

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **\_profile\_status\_\_get\_request** | [**_profile_status__get_request**](../Models/_profile_status__get_request.md)|  | [optional] |

### Return type

**List**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

