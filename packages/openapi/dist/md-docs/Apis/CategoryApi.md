# CategoryApi

All URIs are relative to *https://localhost:8811/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**categoryGet**](CategoryApi.md#categoryGet) | **GET** /category/ | list all categories |
| [**categoryIdDelete**](CategoryApi.md#categoryIdDelete) | **DELETE** /category/{id} | delete category |
| [**categoryIdGet**](CategoryApi.md#categoryIdGet) | **GET** /category/{id} | get category |
| [**categoryIdLogsGet**](CategoryApi.md#categoryIdLogsGet) | **GET** /category/{id}/logs | get all logs |
| [**categoryIdPut**](CategoryApi.md#categoryIdPut) | **PUT** /category/{id} | update category |
| [**categoryPost**](CategoryApi.md#categoryPost) | **POST** /category/ | create new category |


<a name="categoryGet"></a>
# **categoryGet**
> List categoryGet(Authorization)

list all categories

    list all categories for the current user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **Authorization** | **String**| can be obtained by &#x60;auth/*/*&#x60;, in form of eyxxx.xxx.xxx | [default to null] |

### Return type

[**List**](../Models/_category__get_200_response_inner.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="categoryIdDelete"></a>
# **categoryIdDelete**
> oas_any_type_not_mapped categoryIdDelete(id, Authorization)

delete category

    delete category by id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| grap entry by its id, should be place in path as in &#x60;to/path/:id/etc&#x60; | [default to null] |
| **Authorization** | **String**| can be obtained by &#x60;auth/*/*&#x60;, in form of eyxxx.xxx.xxx | [default to null] |

### Return type

[**oas_any_type_not_mapped**](../Models/AnyType.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="categoryIdGet"></a>
# **categoryIdGet**
> _category__get_200_response_inner categoryIdGet(id, Authorization)

get category

    create new category for the current user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| grap entry by its id, should be place in path as in &#x60;to/path/:id/etc&#x60; | [default to null] |
| **Authorization** | **String**| can be obtained by &#x60;auth/*/*&#x60;, in form of eyxxx.xxx.xxx | [default to null] |

### Return type

[**_category__get_200_response_inner**](../Models/_category__get_200_response_inner.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="categoryIdLogsGet"></a>
# **categoryIdLogsGet**
> List categoryIdLogsGet(id, Authorization)

get all logs

    get all logs associated by this category for the current user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| grap entry by its id, should be place in path as in &#x60;to/path/:id/etc&#x60; | [default to null] |
| **Authorization** | **String**| can be obtained by &#x60;auth/*/*&#x60;, in form of eyxxx.xxx.xxx | [default to null] |

### Return type

[**List**](../Models/_category__id__logs_get_200_response_inner.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="categoryIdPut"></a>
# **categoryIdPut**
> _category__get_200_response_inner categoryIdPut(id, Authorization, \_category\_\_id\_\_put\_request)

update category

    update category by id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| grap entry by its id, should be place in path as in &#x60;to/path/:id/etc&#x60; | [default to null] |
| **Authorization** | **String**| can be obtained by &#x60;auth/*/*&#x60;, in form of eyxxx.xxx.xxx | [default to null] |
| **\_category\_\_id\_\_put\_request** | [**_category__id__put_request**](../Models/_category__id__put_request.md)| properties like title, color and icon | |

### Return type

[**_category__get_200_response_inner**](../Models/_category__get_200_response_inner.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="categoryPost"></a>
# **categoryPost**
> _category__get_200_response_inner categoryPost(Authorization, \_category\_\_post\_request)

create new category

    create new category for the current user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **Authorization** | **String**| can be obtained by &#x60;auth/*/*&#x60;, in form of eyxxx.xxx.xxx | [default to null] |
| **\_category\_\_post\_request** | [**_category__post_request**](../Models/_category__post_request.md)| properties like title, color and icon | |

### Return type

[**_category__get_200_response_inner**](../Models/_category__get_200_response_inner.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

