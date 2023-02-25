# LogApi

All URIs are relative to *https://localhost:8811/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**logGet**](LogApi.md#logGet) | **GET** /log/ | list all logs |
| [**logIdDelete**](LogApi.md#logIdDelete) | **DELETE** /log/{id} | delete log |
| [**logIdGet**](LogApi.md#logIdGet) | **GET** /log/{id} | get log |
| [**logIdPut**](LogApi.md#logIdPut) | **PUT** /log/{id} | update log |
| [**logPost**](LogApi.md#logPost) | **POST** /log/ | create new log |


<a name="logGet"></a>
# **logGet**
> List logGet(Authorization)

list all logs

    list all logs for the current user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **Authorization** | **String**| can be obtained by &#x60;auth/*/*&#x60;, in form of eyxxx.xxx.xxx | [default to null] |

### Return type

[**List**](../Models/_category__id__logs_get_200_response_inner.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="logIdDelete"></a>
# **logIdDelete**
> oas_any_type_not_mapped logIdDelete(id, Authorization)

delete log

    delete log by id

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

<a name="logIdGet"></a>
# **logIdGet**
> _category__id__logs_get_200_response_inner logIdGet(id, Authorization)

get log

    create new log for the current user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| grap entry by its id, should be place in path as in &#x60;to/path/:id/etc&#x60; | [default to null] |
| **Authorization** | **String**| can be obtained by &#x60;auth/*/*&#x60;, in form of eyxxx.xxx.xxx | [default to null] |

### Return type

[**_category__id__logs_get_200_response_inner**](../Models/_category__id__logs_get_200_response_inner.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="logIdPut"></a>
# **logIdPut**
> _category__id__logs_get_200_response_inner logIdPut(id, Authorization, \_log\_\_id\_\_put\_request)

update log

    update log by id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| grap entry by its id, should be place in path as in &#x60;to/path/:id/etc&#x60; | [default to null] |
| **Authorization** | **String**| can be obtained by &#x60;auth/*/*&#x60;, in form of eyxxx.xxx.xxx | [default to null] |
| **\_log\_\_id\_\_put\_request** | [**_log__id__put_request**](../Models/_log__id__put_request.md)| properties like title, amount, category and note | |

### Return type

[**_category__id__logs_get_200_response_inner**](../Models/_category__id__logs_get_200_response_inner.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="logPost"></a>
# **logPost**
> _category__id__logs_get_200_response_inner logPost(Authorization, \_log\_\_post\_request)

create new log

    create new log for the current user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **Authorization** | **String**| can be obtained by &#x60;auth/*/*&#x60;, in form of eyxxx.xxx.xxx | [default to null] |
| **\_log\_\_post\_request** | [**_log__post_request**](../Models/_log__post_request.md)| properties like title, amount, category and note | |

### Return type

[**_category__id__logs_get_200_response_inner**](../Models/_category__id__logs_get_200_response_inner.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

