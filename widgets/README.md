---
sidebar: auto
---

# Widgets
A widget is an HTML document which can be added to a VisualBox dashboard to visualize data that is provided by [integrations](/integrations/). The widget will be notified when data becomes available or is changed, and can react accordingly.

## Sandbox
The HTML document will be put inside of an [&lt;iframe&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) with the [sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) attribute applied. The sandbox attribute applies restrictions on what a widget can do, such as running scrips and allow popups.

The following restrictions are lifted:


| Restriction          | Description                          |
| :------------------- | :----------------------------------- |
| `allow-forms`        | Allows the resource to submit forms. |
| `allow-modals`       | Lets the resource open [modal windows](https://html.spec.whatwg.org/multipage/origin.html#sandboxed-modals-flag). |
| <code style="white-space:nowrap;">allow-pointer-lock</code> | Lets the resource use the Pointer [Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API). |
| `allow-popups`       | Allows popups (such as `window.open()`, `target="_blank"`, or `showModalDialog()`). |
| `allow-scripts`      | Lets the resource run scripts. |

## Writing a Widget
When you create a new widget you have the option to choose a pre-defined [HTML template](https://github.com/visualbox/visualbox-templates/tree/master/widget-html). The template provides a starting point for an HTML document and example code that shows how to read and react to data changes.

The HTML code must be written in an `index.html` file located in the widget root folder.

## Reacting to Events
There are two events that a widget can react to:

  * Change of the [configuration model](/configmodel/)
  * Change of the data provided by an integration

You must implement an event handler for each of these events in order to take appropriate actions in your widget code.

### Configuration Changes
Register an event handler by calling `visualbox.onConfigChanged(callback)`. The `callback` parameter will be invoked by the VisualBox system whenever the [configuration model](/configmodel/) is changed. The parameter passed to the `callback` is a key-value map of the new [configuration model](/configmodel/).

Example on how to change the font color:
``` js
visualbox.onConfigChanged(function (config) {
  document.getElementsByTagName('BODY')[0].style.color = config.color;
});
```

### Data Changes
Register an event handler by calling `visualbox.onDataChanged(callback)`. The `callback` parameter will be invoked by the VisualBox system whenever the connected data source provides new data to be visualized. The parameter passed to the `callback` contains the new value.

Example on how to show the new data in a `<pre>` tag:
``` js
visualbox.onDataChanged(function (data) {
  document.getElementsByTagName('BODY')[0].innerHTML = '<pre>' + data + '</pre>';
});
```

## API
Every widget will have access to the global `visualbox` object.

### Properties
| Property | Type | Description |
| - | :- | :- |
| `config` | `object` | A key-value map of the most recent [configuration model](/configmodel/). |
| `data` | `any` | The most recently published value of the connected data source. Initially `undefined` if no value has been received. |

### Methods
#### onConfigChanged
<code>visualbox.onConfigChanged( <span style="color: #cc99cd;">function</span> callback )</code>

Register an event handler for reacting to [configuration changes](#configuration-changes).

| Parameter | Type | Description |
| - | :- | :- |
| `callback` | `function` | An event handler to be called whenever the [configuration model](/configmodel/) changes. VisualBox will invoke `callback` and pass the new [configuration model](/configmodel/) as the first parameter. |

#### onDataChanged
<code>visualbox.onDataChanged( <span style="color: #cc99cd;">function</span> callback )</code>

Register an event handler for reacting to [data changes](#data-changes).

| Parameter | Type | Description |
| - | :- | :- |
| `callback` | `function` | An event handler to be called whenever the connected data source produces a new value. VisualBox will invoke `callback` and pass the new value as the first parameter. |
