# Backend

* Successful endpoints return a JSON object with the raw data requested or an empty body
* Each endpoint fails by throwing a [Chalice exception](http://chalice.readthedocs.io/en/latest/quickstart.html#tutorial-error-messages). The output message results in:

```json
{
  "Code": "exception_thrown",
  "Message": "error_message"
}
```

 An example:

```json
{ "Code": "ChaliceViewError", "Message": "can't pickle _thread.lock objects" }
```

* When posting a configuration, if it's JSON it will be the raw JSON string. If it's yaml, will be a JSON object: `{"yaml": "YAML_FILE_CONTENT"}`