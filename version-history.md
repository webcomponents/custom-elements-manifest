## Version history

### Version 1.1

Currently implemented in VS Code. See the details for [vscode-html-languageservice](https://github.com/microsoft/vscode-html-languageservice/blob/master/docs/customData.md#custom-data-for-html-language-service).

```json
{
  "version": 1,
  "tags": [
    {
      "name": "demo-wc-card",
      "description": "This is a container looking like a card with a back and front side you can switch",
      "attributes": [
        {
          "name": "current-side",
          "description": "Defines which side of the card to show. Possible values are A or B",
          "values": [
            {
              "name": "A"
            },
            {
              "name": "B"
            }
          ]
        }
      ]
    }
  ]
}
```
