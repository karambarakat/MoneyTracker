# Documentation for myPocket

<a name="documentation-for-api-endpoints"></a>

## Documentation for API Endpoints

All URIs are relative to _https://localhost:8811/api/v1_

| Class                   | Method                                                                           | HTTP request                   | Description           |
| ----------------------- | -------------------------------------------------------------------------------- | ------------------------------ | --------------------- |
| _CategoryApi_           | [**categoryGet**](Apis/CategoryApi.md#categoryget)                               | **GET** /category/             | list all categories   |
| _CategoryApi_           | [**categoryIdDelete**](Apis/CategoryApi.md#categoryiddelete)                     | **DELETE** /category/{id}      | delete category       |
| _CategoryApi_           | [**categoryIdGet**](Apis/CategoryApi.md#categoryidget)                           | **GET** /category/{id}         | get category          |
| _CategoryApi_           | [**categoryIdLogsGet**](Apis/CategoryApi.md#categoryidlogsget)                   | **GET** /category/{id}/logs    | get all logs          |
| _CategoryApi_           | [**categoryIdPut**](Apis/CategoryApi.md#categoryidput)                           | **PUT** /category/{id}         | update category       |
| _CategoryApi_           | [**categoryPost**](Apis/CategoryApi.md#categorypost)                             | **POST** /category/            | create new category   |
| _LocalAuthorizationApi_ | [**authLocalLoginPost**](Apis/LocalAuthorizationApi.md#authlocalloginpost)       | **POST** /auth/local/login/    | login                 |
| _LocalAuthorizationApi_ | [**authLocalRegisterPost**](Apis/LocalAuthorizationApi.md#authlocalregisterpost) | **POST** /auth/local/register/ | register              |
| _LogApi_                | [**logGet**](Apis/LogApi.md#logget)                                              | **GET** /log/                  | list all logs         |
| _LogApi_                | [**logIdDelete**](Apis/LogApi.md#logiddelete)                                    | **DELETE** /log/{id}           | delete log            |
| _LogApi_                | [**logIdGet**](Apis/LogApi.md#logidget)                                          | **GET** /log/{id}              | get log               |
| _LogApi_                | [**logIdPut**](Apis/LogApi.md#logidput)                                          | **PUT** /log/{id}              | update log            |
| _LogApi_                | [**logPost**](Apis/LogApi.md#logpost)                                            | **POST** /log/                 | create new log        |
| _ProfileApi_            | [**profileGet**](Apis/ProfileApi.md#profileget)                                  | **GET** /profile/              | get profile           |
| _ProfileApi_            | [**profilePasswordPut**](Apis/ProfileApi.md#profilepasswordput)                  | **PUT** /profile/password/     | (re)set password      |
| _ProfileApi_            | [**profilePut**](Apis/ProfileApi.md#profileput)                                  | **PUT** /profile/              | update profile        |
| _ProfileApi_            | [**profileStatusGet**](Apis/ProfileApi.md#profilestatusget)                      | **GET** /profile/status/       | authentication status |

<a name="documentation-for-models"></a>

## Documentation for Models

- [\_auth_local_login\_\_post_200_response](./Models/_auth_local_login__post_200_response.md)
- [\_auth_local_login\_\_post_200_response_allOf](./Models/_auth_local_login__post_200_response_allOf.md)
- [\_auth_local_login\_\_post_200_response_allOf_1](./Models/_auth_local_login__post_200_response_allOf_1.md)
- [\_auth_local_login\_\_post_200_response_allOf_2](./Models/_auth_local_login__post_200_response_allOf_2.md)
- [\_auth_local_login**post*200_response_allOf***v](./Models/_auth_local_login__post_200_response_allOf___v.md)
- [\_auth_local_login\_\_post_401_response](./Models/_auth_local_login__post_401_response.md)
- [\_auth_local_register\_\_post_400_response](./Models/_auth_local_register__post_400_response.md)
- [\_auth_local_register\_\_post_400_response_details](./Models/_auth_local_register__post_400_response_details.md)
- [\_auth_local_register\_\_post_409_response](./Models/_auth_local_register__post_409_response.md)
- [\_auth_local_register\_\_post_request](./Models/_auth_local_register__post_request.md)
- [\_category\_\_get_200_response_inner](./Models/_category__get_200_response_inner.md)
- [\_category\_\_get_200_response_inner_allOf](./Models/_category__get_200_response_inner_allOf.md)
- [\_category\_\_get_401_response](./Models/_category__get_401_response.md)
- [\_category\_\_get_401_response_details](./Models/_category__get_401_response_details.md)
- [\_category**id**get_404_response](./Models/_category__id__get_404_response.md)
- [\_category**id**logs_get_200_response_inner](./Models/_category__id__logs_get_200_response_inner.md)
- [\_category**id**logs_get_200_response_inner_allOf](./Models/_category__id__logs_get_200_response_inner_allOf.md)
- [\_category**id**logs_get_200_response_inner_allOf_category](./Models/_category__id__logs_get_200_response_inner_allOf_category.md)
- [\_category**id**put_request](./Models/_category__id__put_request.md)
- [\_category\_\_post_request](./Models/_category__post_request.md)
- [\_log**id**put_request](./Models/_log__id__put_request.md)
- [\_log\_\_post_request](./Models/_log__post_request.md)
- [\_profile\_\_put_request](./Models/_profile__put_request.md)
- [\_profile_password\_\_put_request](./Models/_profile_password__put_request.md)
- [\_profile_status\_\_get_request](./Models/_profile_status__get_request.md)
- [category](./Models/category.md)
- [categoryPopulated](./Models/categoryPopulated.md)
- [category_allOf](./Models/category_allOf.md)
- [category_allOf_1](./Models/category_allOf_1.md)
- [log](./Models/log.md)
- [log_allOf](./Models/log_allOf.md)
- [log_allOf_1](./Models/log_allOf_1.md)
- [log_allOf_1_category](./Models/log_allOf_1_category.md)
- [mongoDoc](./Models/mongoDoc.md)
- [mongoTime](./Models/mongoTime.md)
- [profile](./Models/profile.md)
- [profile_allOf](./Models/profile_allOf.md)

<a name="documentation-for-authorization"></a>

## Documentation for Authorization

<a name="BasicToken"></a>

### BasicToken

- **Type**: HTTP basic authentication

<a name="BearerToken"></a>

### BearerToken

- **Type**: HTTP basic authentication
